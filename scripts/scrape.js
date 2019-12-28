const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const download = require("image-downloader");

const PITCHFORK_URL =
  "https://pitchfork.com/features/lists-and-guides/best-songs-2019/";

function relativeFile(dir) {
  return path.join(__dirname, dir);
}

function tmpFile(name) {
  return path.join(relativeFile("tmp"), name);
}

function imageFile(name) {
  return path.join(relativeFile("images"), name);
}

function pullSrcFromText(txt) {
  const first = txt.substring(txt.indexOf('src="') + 5, txt.length);
  return first.substring(0, first.indexOf('"'));
}

function scrapeData(htmlString) {
  const $ = cheerio.load(htmlString);

  const callouts = $(".callout");

  const songs = [];

  $(callouts).each((idx, el) => {
    songs.push({
      imageUrl: pullSrcFromText(
        $(el)
          .find("picture")
          .text()
      ),
      name: $(el)
        .nextAll("h2")
        .eq(0)
        .text(),
      number: 100 - idx
    });
  });

  return Promise.resolve(songs);
}

function downloadImages(songs) {
  const newSongs = [];
  return new Promise((resolve, reject) => {
    const runner = idx => {
      if (idx >= songs.length) {
        resolve(newSongs);
        return;
      }

      const currentImage = songs[idx].imageUrl;
      const currentImageFile = currentImage.split("/").pop();

      newSongs.push({
        ...songs[idx],
        image: currentImageFile
      });

      if (fs.existsSync(imageFile(currentImageFile))) {
        runner(idx + 1);
        return;
      }

      const options = {
        url: currentImage,
        dest: imageFile(currentImageFile)
      };

      console.log("Downloading image: ", currentImageFile);
      download
        .image(options)
        .then(() => runner(idx + 1))
        .catch(err => console.error(err));
    };

    runner(0);
  });
}

function attachVideo(songs, youtubeJSON) {
  return songs.map((s, idx) => {
    const thumb = Object.keys(youtubeJSON.items[idx].snippet.thumbnails).pop();
    return {
      ...s,
      youtube: {
        id: youtubeJSON.items[idx].snippet.resourceId.videoId,
        title: youtubeJSON.items[idx].snippet.title,
        image: youtubeJSON.items[idx].snippet.thumbnails[thumb]
      }
    };
  });
}

function splitNames(songs) {
  return songs.map(s => {
    const [artist, song] = s.name.split(": ");
    return {
      ...s,
      song: {
        artist,
        title: song.trim().substring(1, song.length - 1)
      }
    };
  });
}

function getPage() {
  if (fs.existsSync(tmpFile("body.html"))) {
    return Promise.resolve(fs.readFileSync(tmpFile("body.html"), "utf8"));
  }

  return axios.get(PITCHFORK_URL).then(resp => {
    fs.writeFileSync(tmpFile("body.html"), resp.data);
    return resp.data;
  });
}

getPage()
  .then(data => scrapeData(data))
  .then(songs => downloadImages(songs))
  .then(songs => splitNames(songs))
  .then(songs =>
    attachVideo(
      songs,
      JSON.parse(fs.readFileSync(relativeFile("youtube.json", "utf8")))
    )
  )
  .then(songs => {
    fs.writeFileSync(relativeFile("data.json"), JSON.stringify(songs));

    console.log("done");
  });
