<script lang="ts">
	import type { VideoLecture } from "../server/content/_lecture";

    let { lecture }: {lecture: VideoLecture} = $props();
	import Youtube from "svelte-youtube-embed";
</script>

<div class="video-lecture flex justify-center items-center">
    {#each lecture.sources as { src }}
        <Youtube id={src.split('/').pop()} />
    {/each}
</div>
