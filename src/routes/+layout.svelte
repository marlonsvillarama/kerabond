<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/global/app-header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="fl-wrapper">
	<AppHeader />
	<div class="fl-body">
		{@render children()}
	</div>
</div>

<style>
    .fl-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
	.fl-body {
		flex: 1;
		overflow-y: auto;
	}
</style>