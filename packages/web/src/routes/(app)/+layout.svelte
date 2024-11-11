<script lang="ts">
	import '../../app.css';
	import SideBar from '$lib/side-bar/SideBar.svelte';

	let { children } = $props();
</script>

<div class="flex items-stretch h-full bg-secondary">
    <SideBar />
    <div class="overflow-y-auto flex-1">
    	{@render children()}
    </div>
</div>

