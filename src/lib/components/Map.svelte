<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import Background from './layers/Background.svelte';
	import NavigationControl from './NavigationControl.svelte';
	import superMap from './superMap';

	const { useMap, addMarker, removeMarker, markers, map } = superMap();

	let withBackground = false;
	let withNavigationControl = true;
</script>

<div class="min-h-screen" use:useMap={{ center: [5, 50], zoom: 4 }}>
	{#if $map}
		{#if withBackground}
			<Background map={$map} color="#FFF" opacity={0.5} />
		{/if}
		{#if withNavigationControl}
			<NavigationControl {map} />
		{/if}
	{/if}
</div>

<div class="absolute w-[200px] top-8 left-6 text-white">
	<div class="bg-sky-600 p-4 rounded-xl grid gap-4">
		<label class="flex items-center justify-between">
			<span>Navigation control</span>

			<input
				type="checkbox"
				bind:checked={withNavigationControl}
				class="appearance-none border-2 border-sky-500 rounded w-4 h-4 checked:bg-sky-300  focus:outline-none"
			/>
		</label>

		<button
			class="bg-sky-500 p-2 rounded-lg text-white w-full"
			on:click={() => (withBackground = !withBackground)}
			type="button"
		>
			Toggle background
		</button>

		<button class="bg-sky-500 p-2 rounded-lg w-full" on:click={addMarker} type="button">
			Add marker
		</button>

		{#if $markers.length}
			<div class="grid gap-2">
				<h3 class="text-lg">Markers</h3>

				{#each $markers as marker}
					<button
						class="bg-sky-700 w-full text-white rounded-lg hover:bg-sky-800 p-2 text-left"
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
