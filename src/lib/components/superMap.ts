import * as number from '$lib/utils/number';
import maplibregl from 'maplibre-gl';
import { get, writable } from 'svelte/store';

export default function superMap() {
	const map$ = writable<maplibregl.Map | undefined>(undefined);
	const markers$ = writable<maplibregl.Marker[]>([]);

	function useMap(node: HTMLElement, options: Partial<maplibregl.MapOptions>) {
		const map = new maplibregl.Map({
			container: node,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: options.center || [-122, 37],
			zoom: options.zoom || 1
		});

		map$.set(map);

		return {
			destroy: () => {
				map.remove();
			}
		};
	}

	function addMarker() {
		const map = get(map$);
		if (!map) return;
		const [lng, lat] = [number.randomBetween(1, 9), number.randomBetween(45, 55)];
		const marker = new maplibregl.Marker().setLngLat([lng, lat]);
		markers$.update((markers) => [...markers, marker]);
		marker.addTo(map);
	}

	function removeMarker(marker: maplibregl.Marker) {
		markers$.update((markers) => markers.filter((m) => m !== marker));
		marker.remove();
	}

	return {
		markers: markers$,
		addMarker,
		removeMarker,
		useMap,
		map: map$
	};
}
