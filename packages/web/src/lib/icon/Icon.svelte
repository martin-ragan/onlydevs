<script lang="ts">
    let { name, size = "24px", color }: {
        name: string;
        size?: string;
        color?: string;
    } = $props();

    let IconComponent: Component<SvelteComponent> | undefined = $state(undefined);

    import(`./${name}.svg?component`).then((mod) => {
        IconComponent = mod.default;
    });
</script>

{#if IconComponent}
    <IconComponent
        width={size} 
        height={size} 
        fill={color}
    />
{/if}