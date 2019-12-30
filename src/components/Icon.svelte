<script>
  import ExternalLink from "../svg/external-link.svg";
  import HelpCircle from "../svg/help-circle.svg";
  import PlusCircle from "../svg/plus-circle.svg";
  import SkipBack from "../svg/skip-back.svg";
  import SkipForward from "../svg/skip-forward.svg";
  import ThumbsDown from "../svg/thumbs-down.svg";
  import ThumbsUp from "../svg/thumbs-up.svg";
  import Play from "../svg/play.svg";
  import Pause from "../svg/pause.svg";
  import X from "../svg/x.svg";

  export let name = "";
  export let size = "medium";

  const icons = {
    "help-circle": HelpCircle,
    "external-link": ExternalLink,
    "plus-circle": PlusCircle,
    "skip-back": SkipBack,
    "skip-forward": SkipForward,
    "thumbs-down": ThumbsDown,
    "thumbs-up": ThumbsUp,
    play: Play,
    pause: Pause,
    x: X
  };

  function getIcon(name) {
    if (Object.keys(icons).includes(name)) {
      return icons[name];
    }

    return "";
  }
</script>

<style lang="scss">
  .icon {
    display: inline-block;
  }
  .icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .xsmall {
    width: 14px;
    height: 14px;
  }

  .small {
    width: 18px;
    height: 18px;
  }

  .medium {
    width: 24px;
    height: 24px;
  }

  .large {
    width: 36px;
    height: 36px;
  }
</style>

<span class="icon {size}">
  {@html getIcon(name)}
</span>
