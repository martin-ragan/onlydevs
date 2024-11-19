<script lang="ts">
	import type { Lecture } from '../../models/types';
    import LectureContent from './LectureContent.svelte';
    let { lecture }: {lecture: Lecture} = $props();
</script>

<LectureContent content={lecture.content} />