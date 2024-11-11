<script lang="ts">
    import './tab-panel.css';

    type Props = {
        tabs: { label: string; id: string }[];
        activeTabId?: string;
        setActiveTabIdFn: (id: string) => void
    };

    let { tabs, activeTabId = tabs[0].id, setActiveTabIdFn }: Props = $props();

</script>

<div role="tablist" class="tab-panel">
    <div class="w-fit flex items-start">
        {#each tabs as tab}
            <input onclick="{() => setActiveTabIdFn(tab.id)}" type="radio" name="my_tabs_1" role="tab" class="tab-panel__tab" checked={activeTabId === tab.id}  aria-label={tab.label} />
        {/each}
    </div>
</div>
