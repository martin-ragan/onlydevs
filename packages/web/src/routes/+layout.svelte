<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/nav-bar/NavBar.svelte';
	
	let { children, data } = $props();
</script>


<div class="flex flex-col h-screen max-h-screen">
	<div class="grow-0">
		<NavBar user={data.user} />
	</div>
	<div class="basis-full shrink grow-0 bg-secondary">
		{@render children()}
	</div>
</div>

