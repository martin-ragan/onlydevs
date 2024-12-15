<script lang="ts">
	import { applyAction, deserialize } from "$app/forms";
	import { invalidate, invalidateAll } from "$app/navigation";

    let { completed }:{completed: boolean} = $props();

    const handleCompleteLecture = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

        const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			invalidate('courses:lectureMarkedComplete');
		}

        applyAction(result);
    }
</script>
<div class="mt-8 flex justify-end">
    {#if !completed}
        <form 
            method="POST" 
            action="?/completeLecture" 
            on:submit|preventDefault={handleCompleteLecture}
        >
            <button 
                type="submit" 
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Mark as Complete
            </button>
        </form>
    {:else}
        <form 
            method="POST" 
            action="?/uncompleteLecture" 
            on:submit|preventDefault={handleCompleteLecture}
        >
            <button 
                type="submit" 
                class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Mark as Incomplete
            </button>
        </form>
    {/if}
</div>