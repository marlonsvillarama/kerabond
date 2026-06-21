<script>
    let {
        slot,
        staff,
        onclick
    } = $props();

    // let dialog = $state();

    const addBooking = () => {
        console.log(`slot.value = ${slot.value}; staff.id = ${staff.id}`);
        onclick();
        // if (dialog) {
        //     dialog.showModal();
        // }
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fl-staff-slot day"
    onclick={() => addBooking()}
    data-staff={staff.id}
    data-date={slot.date}
    data-slot={slot.value}
></div>

<!-- <dialog bind:this={dialog} class="dlg-booking"></dialog> -->

<style>
    .fl-staff-slot {
        /* background-color: red; */
        border-top: 1px solid var(--border-light);
        border-left: 1px solid var(--accent-border);
        cursor: pointer;
        padding: 0.25rem;
        position: relative;
        /* transition: all 20ms ease-in-out; */
    }
    .fl-staff-slot:hover {
        /* background-color: var(--accent-pale); */
        box-shadow: inset 0 0 0 3px var(--accent-border);
    }
</style>
