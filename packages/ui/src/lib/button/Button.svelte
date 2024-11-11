<script lang="ts">
  import '../app.css';
  import './button.css';
  import type { SvelteComponent } from 'svelte';

  let { children, class: klass }: {
    children?: SvelteComponent | string;
    class?: string;
  } = $props();
</script>

<button
  type="button"
  class={['button button--primary', klass, ].join(' ')}
>
  {#if children}
    {#if typeof children !== 'string'}
      {@render children()}
    {:else}
      {children}
    {/if}
  {/if}
</button>
