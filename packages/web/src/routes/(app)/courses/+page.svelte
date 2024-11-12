<script lang="ts">
    import {Card, TabPanel} from "@onlydevs/ui";
    import SearchIcon from "$lib/icon/search.svg?component";

    let { data } = $props();
    const courses  = data.courses;
    console.log(courses);
    const tabs = data.tabs;

    let activeTabId = $state('browse');
    let searchQuery = $state('');
    let filteredCourses = $derived(courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())));

    function setActiveTabIdFn(id: string) {
        activeTabId = id;
    }
</script>

<TabPanel setActiveTabIdFn={setActiveTabIdFn} tabs={tabs}/>
<div class="p-6">
    <label class="input input-bordered border border-primary bg-transparent flex items-center gap-2 mb-8 focus-within:border-primary">
        <SearchIcon class="w-4 h-4"/>
        <input type="text" bind:value={searchQuery} class="grow text-white placeholder-white" placeholder="Search" />
    </label>

    {#if activeTabId === 'browse' && searchQuery === ''}
        <div class="mb-8">
            <h2 class="text-white font-bold text-xl mb-4">New addition</h2>
            <a href="/courses/{courses[0].slug}">
                <Card
                    title={courses[0].title}
                    description={courses[0].description}
                    image={courses[0].cover}
                    price={199}
                    badges={[]}
                />
            </a>
        </div>
    {/if}

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each filteredCourses as course}
            <a href="/courses/{course.slug}">
                <Card
                    class="card--smaller"
                    title={course.title}
                    description={course.description}
                    image={course.cover}
                    price={199}
                    badges={[]}
                />
            </a>
        {/each}
    </div>
</div>