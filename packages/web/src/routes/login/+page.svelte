<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	
	
	let errors: Record<string, string> = $state({});
	let genericError: string | null = $state(null);
	let submitting = $state(false);
</script>

<div class="min-h-full flex items-center justify-center">
	<div class="max-w-md w-full space-y-8 p-8 border border-primary rounded-lg shadow-lg">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-100">Login</h1>
		</div>

		<form class="mt-8 space-y-6" method="post" use:enhance={(...args) => {
			submitting = true;
			return async ({ result, update }) => {
				submitting = false;
				errors = {};
				genericError = null;
				
				if (result.type === 'failure' && result.data) {
					if ('message' in result.data) {
						genericError = result.data.message as string;
					} else {
						errors = result.data.errors as Record<string, string>;
					}
				}
				await update({reset: true});
			};
		}}>
			{#if genericError}
				<p class="text-sm text-red-500 text-center" transition:fly={{ y: -20, duration: 300 }}>
					{genericError}
				</p>
			{/if}
			
			<div class="space-y-4">
				<div>
					{#if errors.username}
						<p class="mt-2 text-sm text-red-500" transition:fly={{ y: -20, duration: 300 }}>
							{errors.username}
						</p>
					{/if}
					<label for="username" class="block text-sm font-light text-white">Username</label>
					<input
						id="username"
						type="text"
						name="username"
						class={errors.username ? 'mt-1 block w-full px-3 py-2 bg-transparent border border-red-500 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'mt-1 block w-full px-3 py-2 bg-transparent border border-primary rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-primary-green focus:border-primary-green'}
						required
					/>
				</div>

				<div>
					{#if errors.password}
						<p class="mt-2 text-sm text-red-500" transition:fly={{ y: -20, duration: 300 }}>
							{errors.password}
						</p>
					{/if}
					<label for="password" class="block text-sm font-light text-white">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						class={errors.password ? 'mt-1 block w-full px-3 py-2 bg-transparent border border-red-500 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'mt-1 block w-full px-3 py-2 bg-transparent border border-primary rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-primary-green focus:border-primary-green'}
						required
					/>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Login
				</button>
				<a
					href="/register"
					class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Register
				</a>
			</div>
		</form>
	</div>
</div>
