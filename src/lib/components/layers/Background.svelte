<script lang="ts">
	import type { Map } from 'maplibre-gl';

	import { onDestroy, onMount } from 'svelte';

	export let map: Map;
	export let color = '#FF0000';
	export let opacity = 0.5;

	const uniqueId = crypto.randomUUID();

	onMount(() => {
		map.addSource(uniqueId, {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[-180, 90],
									[-180, -90],
									[180, -90],
									[180, 90],
									[-180, 90]
								]
							]
						}
					}
				]
			}
		});

		map.addLayer({
			id: uniqueId,
			type: 'fill',
			source: uniqueId,
			layout: {},
			paint: {
				'fill-color': color,
				'fill-opacity': opacity
			}
		});
	});

	onDestroy(() => {
		map.removeLayer(uniqueId);
		map.removeSource(uniqueId);
	});
</script>
