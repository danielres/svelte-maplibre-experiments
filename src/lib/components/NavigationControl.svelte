<script lang="ts">
	import type { Writable } from 'svelte/store';

	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';

	export let map: Writable<maplibregl.Map | undefined>;

	let control: maplibregl.NavigationControl;

	onMount(() => {
		if (!$map) return;
		control = new maplibregl.NavigationControl({});
		$map.addControl(control, 'top-right');
	});

	onDestroy(() => {
		if (!$map) return;
		$map.removeControl(control);
	});
</script>
