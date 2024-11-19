<script lang="ts">
	import type { Lecture } from '../../models/types';
	import CodeLecture from './CodeLecture.svelte';
	import LectureToggleStatus from './LectureToggleStatus.svelte';
	import TextLecture from './TextLecture.svelte';
	import VideoLecture from './VideoLecture.svelte';
	import LectureHeader from './LectureHeader.svelte';
	import CheckpointLecture from './CheckpointLecture.svelte';

    let { lecture }: {lecture: Lecture} = $props();
</script>

<LectureHeader description={lecture.description} title={lecture.title} />

{#if lecture.type === 'checkpoint'}
    <CheckpointLecture {lecture} />
{:else if lecture.type === 'video'}
    <VideoLecture {lecture} />
{:else if lecture.type === 'code'}
    <CodeLecture {lecture} />
{:else}
    <TextLecture {lecture} />
{/if}

<LectureToggleStatus completed={lecture.completed} />