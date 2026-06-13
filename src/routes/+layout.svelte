<script>
	import '../style/main.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/global/app-header.svelte';
	import CmdHeader from '$lib/components/global/cmd-header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="fl-wrapper">
    <AppHeader />

	<!-- <CmdHeader /> -->

    <!-- <div class="fl-content"> -->
	{@render children()}
        <!-- <Calendar /> -->
    <!-- </div> -->
</div>

<style>
    .fl-wrapper {
        display: flex;
        /* grid-template-rows: auto auto 1fr; */
        flex-direction: column;
        height: 100vh;
    }
    :global(.fl-wrapper > *:not(:last-child)) {
        flex-shrink: 0;
    }
    /* .fl-content {
        * border: 2px solid blue; *
        * height: 100%; *
        overflow-y: auto;
        flex: 1;
    } */
</style>
