<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import Background from './layers/Background.svelte';
	import NavigationControl from './NavigationControl.svelte';
	import superMap from './superMap';
	import ui from './ui/$ui';
	import Menu from './ui/Menu.svelte';

	const { useMap, addMarker, removeMarker, markers, map } = superMap();
</script>

<div class="min-h-screen" use:useMap={{ center: [5, 50], zoom: 4 }}>
	{#if $map}
		{#if $ui.background}
			<Background map={$map} color="#FFF" opacity={0.5} />
		{/if}

		{#if $ui.navigationControl}
			<NavigationControl {map} />
		{/if}
	{/if}
</div>

<Menu {addMarker} {removeMarker} {markers} />
