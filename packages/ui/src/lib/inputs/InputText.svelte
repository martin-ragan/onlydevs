<script lang="ts">
    type Props = {
        value?: string,
        placeholder?: string,
        label?: string,
        class?: string,
        id?: string,
        name?: string,
        error?: string,
        type?: 'text' | 'email' | 'password'
    };

    let { 
        value = $bindable(''), 
        placeholder, 
        label, 
        class: className,
        id = '', 
        name = '',
        error = '',
        type = 'text'
    }: Props = $props();
    
    let inputId = $derived(id || name || 'input');
</script>

<div class={className}>
    {#if label}
        <label for={inputId} class="block text-sm font-light text-white">{label}</label>
    {/if}
    <input 
        id={inputId}
        {name}
        class="mt-1 block w-full px-3 py-2 bg-transparent border rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none
            {error 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-primary focus:ring-primary-green focus:border-primary-green'}"
        type={type}
        bind:value={value}
        placeholder={placeholder}
        aria-label={label || placeholder || 'Text input'}
        aria-invalid={!!error}
    />
    {#if error}
        <p class="mt-1 text-sm text-red-500">{error}</p>
    {/if}
</div>



