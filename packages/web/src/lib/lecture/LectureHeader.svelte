<script lang="ts">
    let { title, description }: {title: string, description: string} = $props();
</script>

<h1 class="text-4xl font-bold text-white mb-4">{title}</h1>
<p class="text-gray-200">{description}</p>
<hr class="my-5">
