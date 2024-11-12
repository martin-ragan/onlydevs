<script lang="ts">
    import './page.css';
	import { TabPanel } from "@onlydevs/ui";
    import Menu from '$lib/menu/Menu.svelte';
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import hljs from 'highlight.js';
    import typescript from 'highlight.js/lib/languages/typescript';
    import css from 'highlight.js/lib/languages/css';
    
    
    let { data } = $props();

    let activeTab = $state('course');
    

    let items = $derived(data.lectures.map((lecture) => {
        return {
            title: lecture.title,
            children: [],
            completed: lecture.completed || false
        }
    }));

    
    const tabs = [
        {
            id: 'course',
            label: 'Course',
        },
    ]

    function setActiveTabIdFn(id: string) {
        activeTab = id;
    }

    let selectedItemIndex = $state(0);

    function selectItem(itemIndex: number) {
        selectedItemIndex = itemIndex;
    }

    function markLectureComplete() {
        data = {
            ...data,
            lectures: data.lectures.map((lecture, index) => 
                index === selectedItemIndex ? { ...lecture, completed: true } : lecture
            )
        };
        
        // Here you would typically make an API call to persist the completion status
        // TODO: Add API call to update lecture completion status
    }

    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('css', css);

    const marked = new Marked(
        markedHighlight({
            highlight(code, lang) {
                const language = hljs.getLanguage('typescript') ? 'typescript' : 'plaintext';
                return hljs.highlightAuto(code, ['typescript', 'css']).value;
            }
        })
    );
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<div class="tabs-container">
    <TabPanel tabs={tabs} setActiveTabIdFn={setActiveTabIdFn} />

    <div>
        {#if activeTab === 'course'}
            <div class="flex">
                <Menu items={items} selectedItemIndex={selectedItemIndex} onSelectItem={selectItem}/>
                <div class="flex-1 p-4 text-white">
                    {#if data.lectures[selectedItemIndex]}
                        {#await marked.parse(data.lectures[selectedItemIndex].content)}
                            <p>Loading...</p>
                        {:then content}
                            <div class="prose prose-invert markdown-area">
                                {@html content}
                            </div>
                        {:catch error}
                            <p class="error">Error loading content: {error.message}</p>
                        {/await}
                        <div class="mt-8 flex justify-end">
                            <button 
                                class="px-4 py-2 bg-primary-green text-white rounded hover:opacity-80 disabled:opacity-50"
                                onclick={markLectureComplete}
                                disabled={items[selectedItemIndex].completed}
                            >
                                {items[selectedItemIndex].completed ? 'Completed' : 'Mark as Complete'}
                            </button>
                        </div>
                    {/if}
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