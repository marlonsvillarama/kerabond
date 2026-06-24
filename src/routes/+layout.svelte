<script>
	import '../style/main.css';
    import { navigating } from '$app/state';
    import { getContext, setContext } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/global/app-header.svelte';
	// import CmdHeader from '$lib/components/global/cmd-header.svelte';
    import NavLoading from '$lib/components/ui/nav-loading.svelte';

	let { children } = $props();

    let staffState = $state([
        { id: 1, name: 'John', initials: 'JF', image: '/images/avatars/jf.png' },
        { id: 2, name: 'Apple', initials: 'AV', image: '/images/avatars/av.png' },
        { id: 3, name: 'Marlong2', initials: 'MV', image: 'images/avatars/mv2.png' },
        { id: 4, name: 'Marlong', initials: 'MV' },
    ]);
    setContext('STAFF_STATE', staffState);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating}
    <NavLoading />
{/if}

<div class="fl-wrapper">
    <AppHeader />

	<!-- <CmdHeader /> -->

    <div class="fl-content">
	{@render children()}
        <!-- <Calendar /> -->
    </div>
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
    .fl-content {
        /* border: 2px solid red; */
        position: relative;
        /* * border: 2px solid blue; * */
        /* * height: 100%; * */
        /* overflow-y: auto; */
        /* flex: 1; */
    }
</style>
