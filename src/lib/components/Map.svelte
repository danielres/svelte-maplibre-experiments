<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import Background from './layers/Background.svelte';
	import superMap from './superMap';

	const { useMap, addMarker, removeMarker, markers, map } = superMap();

	let withBackground = false;
</script>

<div class="min-h-screen" use:useMap={{ center: [5, 50], zoom: 4 }}>
	{#if $map}
		{#if withBackground}
			<Background map={$map} color="#FFF" opacity={0.5} />
		{/if}
	{/if}
</div>

<div class="absolute w-[200px] top-8 left-6">
	<div class="bg-sky-600 p-4 rounded-xl grid gap-4">
		<button
			class="bg-sky-500 p-2 rounded-lg text-white w-full"
			on:click={() => (withBackground = !withBackground)}
			type="button"
		>
			Toggle background
		</button>

		<button class="bg-sky-500 p-2 rounded-lg text-white w-full" on:click={addMarker} type="button">
			Add marker
		</button>

		{#if $markers.length}
			<div class="grid gap-2">
				<h3 class="text-lg text-white">Markers</h3>

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
