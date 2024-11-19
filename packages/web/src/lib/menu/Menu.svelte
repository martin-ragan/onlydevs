<script lang="ts">
    import './menu.css';
    import { page } from '$app/stores';

    type Props = {
        items: {
            title: string;
            slug: string;
            completed?: boolean;
        }[];
    }
    let { items }: Props = $props();
    let currentPath = $derived(`${$page.url.pathname.split('/')[2]}/${$page.url.pathname.split('/')[3]}`);
</script>

<ul class="flex flex-col text-white border border-border-gray">
    {#each items as item}
        <li class="flex flex-col w-full last:border-none border-b border-border-gray {currentPath === item.slug ? 'bg-border-gray' : ''}">
            <a 
                data-sveltekit-preload-data="tap"
                href={`/courses/${item.slug}`}
                class="p-4 flex items-center justify-between"
            >
                <div class="flex items-center gap-4">
                    {#if item.completed}
                        <div class="text-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>
                    {:else}
                        <div class="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        </div>
                    {/if}

                    <span class="text-sm">{item.title}</span>
                </div>
            </a>
        </li>
    {/each}
</ul>