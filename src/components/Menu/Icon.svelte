<script lang="ts">
  import { icons, type IIconName } from "./icons";

  export let icon: IIconName;
</script>

<svg viewBox="0 0 16 16">
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1"
    d={icons[icon].path}
  />
</svg>
