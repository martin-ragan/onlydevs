<script lang="ts">
	import { TabPanel } from '@onlydevs/ui';
	import Menu from '../../../../lib/menu/Menu.svelte';
	import type { Lecture } from '../../../../models/types';
	import { page } from '$app/stores';

    let { children, data } = $props();
    const tabs = [
        {
            id: 'course',
            label: 'Course',
        },
    ];

    let activeTab = $state('course');
    let items = $derived(data.lectures.map((lecture: Lecture) => {
        return {
            title: lecture.title,
            children: [],
            completed: lecture.completed || false,
            slug: lecture.slug
        }
    }));

    let lectureSlug = $derived($page.params.lectureSlug);
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<div class="tabs-container">
    <TabPanel tabs={tabs} activeTabId={activeTab} setActiveTabIdFn={(id) => activeTab = id} />
    
    <div>
        {#if activeTab === 'course'}
            <div class="flex">
                {#if lectureSlug}
                    <Menu
                        items={items}
                    />
                {/if}

                <div class="flex-1 p-4 text-white">
                    {@render children?.()}
                </div>
            </div>
        {:else if activeTab === 'overview'}
            <div class="flex">
            </div>
        {:else if activeTab === 'curriculum'}
            <div class="tab-panel">
                <h2>Course Curriculum</h2>
                <!-- Add curriculum content here -->
            </div>
        {:else if activeTab === 'reviews'}
            <div class="tab-panel">
                <h2>Student Reviews</h2>
                <!-- Add reviews content here -->
            </div>
        {/if}
    </div>
</div>