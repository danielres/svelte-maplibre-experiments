<script lang="ts">
	import type { Marker } from 'maplibre-gl';
	import type { Writable } from 'svelte/store';

	import ui from './$ui';

	export let addMarker: () => void;
	export let removeMarker: (marker: Marker) => void;
	export let markers: Writable<Marker[]>;
</script>

<div class="absolute w-[200px] top-8 left-6 text-white">
	<div class="bg-sky-600 p-4 rounded-xl grid gap-4">
		<label class="flex items-center justify-between">
			<span>Navigation control</span>

			<input
				type="checkbox"
				bind:checked={$ui.navigationControl}
				class="appearance-none border-2 border-sky-500 rounded w-4 h-4 checked:bg-sky-300  focus:outline-none"
			/>
		</label>

		<label class="flex items-center justify-between">
			<span>Background</span>

			<input
				type="checkbox"
				bind:checked={$ui.background}
				class="appearance-none border-2 border-sky-500 rounded w-4 h-4 checked:bg-sky-300  focus:outline-none"
			/>
		</label>

		<button on:click={addMarker} type="button" class="bg-sky-500 text-white">Add marker</button>

		{#if $markers.length}
			<div class="grid gap-2">
				{#each $markers as marker}
					<button
						class="bg-sky-700 hover:bg-sky-800"
						on:click={() => removeMarker(marker)}
						type="button"
					>
						<div>Lng: {marker.getLngLat().lng}</div>
						<div>Lat: {marker.getLngLat().lat}</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	button {
		@apply p-2 rounded-lg w-full;
	}
</style>
