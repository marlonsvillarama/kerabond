<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/app-header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="wrapper">
	<AppHeader />
	<div class="body">
		{@render children()}
	</div>
</div>

<style>
    .wrapper {
        /* border: 4px solid green; */
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
	/* .header {
		padding: 0.25rem 0.75rem;
		border-bottom: 1px solid var(--border-light);
		z-index: 2;
	} */
	.body {
		flex: 1;
		overflow-y: auto;
	}
</style>