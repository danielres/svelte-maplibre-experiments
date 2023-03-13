<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let map: Map;
	let markers: maplibregl.Marker[] = [];

	onMount(() => {
		map = new maplibregl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
			center: [12.550343, 55.665957],
			zoom: 8
		});

		map.on('click', (e) => {
			const marker = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]);
			markers = [...markers, marker];
			// marker.addTo(map);
		});
	});

	onDestroy(() => {
		if (map) map.remove();
	});

	$: {
		markers;
		markers.map((m) => m.addTo(map));
	}
</script>

<div id="map" class="min-h-screen" />
{#if markers.length}
	<div
		class="absolute top-6 left-6 border h-fit bg-sky-600 p-2 text-white rounded-xl grid gap-2 max-w-md"
	>
		<div>
			{#each markers as marker}
				<button
					on:click={() => {
						markers = markers.filter((e) => e !== marker);
						marker.remove();
					}}
					>{JSON.stringify(marker.getLngLat(), null, 2)}
				</button>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	button {
		@apply bg-sky-700 p-4 rounded-lg w-full;
	}
</style>
