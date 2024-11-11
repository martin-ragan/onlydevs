// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {

	declare module '*.svg?component' {
		import type { Component, SvelteComponent } from 'svelte'
		import type { SVGAttributes } from 'svelte/elements'
	  
		const content: Component<
		  SvelteComponent<SVGAttributes<SVGSVGElement> & { title?: string }>
		>
	  
		export default content
	  }
	export {};

	
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}