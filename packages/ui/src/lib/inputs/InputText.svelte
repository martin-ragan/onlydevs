<script lang="ts">
    type Props = {
        value: string,
        placeholder?: string,
        label?: string
    };

    let { value = $bindable(''), placeholder, label }: Props = $props();
    
    // Generate unique ID for input-label association
    const id = `input-${Math.random().toString(36).slice(2)}`;
</script>

{#if label}
    <label for={id} class="input-label block mb-2 text-sm font-light text-white">{label}</label>
{/if}
<input 
    {id}
    class="input w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
    type="text" 
    bind:value={value}
    placeholder={placeholder}
    aria-label={label || placeholder || 'Text input'}
/>


