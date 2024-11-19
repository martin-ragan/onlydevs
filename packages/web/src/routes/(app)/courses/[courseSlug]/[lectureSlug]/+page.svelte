<script lang="ts">
	import Lecture from '$lib/lecture/Lecture.svelte';

    let { data } = $props();

    let lecture = $derived(data.lecture);
</script>

<Lecture {lecture} />