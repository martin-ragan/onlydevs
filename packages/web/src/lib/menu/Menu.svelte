<script lang="ts">
    import './menu.css';

    type Props = {
        items: {
            title: string;
            completed?: boolean;
        }[];
        selectedItemIndex?: number;
        onSelectItem: (itemIndex: number) => void;
    }

    let { items, selectedItemIndex = 0, onSelectItem }: Props = $props();

    function selectItem(itemIndex: number) {
        onSelectItem(itemIndex);
    }
</script>

<ul class="flex flex-col text-white border border-border-gray">
    {#each items as item, itemIndex}
        <li class="flex flex-col p-4 border-b border-border-gray w-full last:border-none {selectedItemIndex === itemIndex ? 'bg-border-gray' : ''}" onclick={() => selectItem(itemIndex)}>
            <div class="cursor-pointer flex items-center justify-between">
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
            </div>
        </li>
    {/each}
  </ul>