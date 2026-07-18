<script>
	import '../style/main.css';
    import { navigating } from '$app/state';
    import { getContext, setContext } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/global/app-header.svelte';
	// import CmdHeader from '$lib/components/global/cmd-header.svelte';
    import BookingForm from "$lib/components/ui/calendar/forms/booking-form.svelte";
    // import Drawer from '$lib/components/ui/drawer.svelte';
    // import Dialog from "$lib/components/ui/dialog.svelte";
    import NavLoading from '$lib/components/ui/nav-loading.svelte';

	let { children } = $props();

    setContext('TENANT', {
        id: 2,
        is_active: true,
        identifier: 'e4f57a65-e398-4564-916e-cf374087024e'
    });

    // let staffState = $state([
    //     { id: 1, name: 'John', active: true, phone: '0221235685', email: 'john@studio4hairsalon.co.nz', initials: 'JF', image: '/images/avatars/jf.png' },
    //     { id: 2, name: 'Apple', active: true, phone: '021758997', email: '', initials: 'AV', image: '/images/avatars/av.png' },
    //     { id: 3, name: 'Marlong2', active: true, phone: '02198498569', email: 'marlon@gmail.com', initials: 'MV', image: 'images/avatars/mv2.png' },
    //     { id: 4, name: 'Marlong3', active: true, phone: '0227499223', email: 'marlong3@yahoo.com', initials: 'MV' },
    //     { id: 5, name: 'Marlong4', active: true, phone: '0225444221', email: 'marlong4@hotmail.com', initials: 'MV' },
    // ]);
    // setContext('STAFF_STATE', staffState);

    // let productState = $state([
    //     { id: 1, name: 'Massage Bed', active: true, quantity: 4 },
    //     { id: 2, name: 'Massage Chair', active: true, quantity: 8 },
    // ]);
    // setContext('PRODUCT_STATE', productState);
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
