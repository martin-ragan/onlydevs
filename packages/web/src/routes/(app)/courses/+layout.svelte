<script lang="ts">
	let { children } = $props();
	import { goto } from '$app/navigation';
	import Icon from '../../../lib/icon/Icon.svelte';
	import { page } from '$app/stores';

	// Get the course slug from the URL
	const courseSlug = $derived($page.params.slug);
</script>

<section class="bg-secondary h-full min-h-screen w-full py-6">
    <div class="px-6 mb-6 text-white flex items-center gap-2">
        {#if courseSlug}
            <button 
                class="flex items-center gap-2 hover:opacity-80" 
                onclick={() => goto('/courses')}
            >
                <Icon name="arrow-left" />
            </button>
        {/if}
        
        <div class="text-sm breadcrumbs">
            <ul>
                <li class={courseSlug ? 'text-gray-400' : ''}>Courses</li>
                {#if courseSlug}
                    <li>{courseSlug}</li>
                {/if}
            </ul>
        </div>
    </div>
    {@render children()}
</section>