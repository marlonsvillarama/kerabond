<script>
    let {
        slot = '',
        staff,
        onclick
    } = $props();

    let isHourStart = $derived(slot.value.slice(2) === '00');
    let isHourEnd = $derived(slot.value.slice(2) === '45');
    // let dialog = $state();

    const addBooking = () => {
        console.log(`slot.value = ${slot.value}; staff.id = ${staff.id}`);
        onclick();
        // if (dialog) {
        //     dialog.showModal();
        // }
    };

    const renderTime = $derived.by(() => {
        let hour = parseInt(slot.value.slice(0, 2));
        let minutes = slot.value.slice(2);
        let am_pm = hour >= 12 ? 'pm' : 'am';
        return `${hour > 12 ? (hour - 12) : hour} ${am_pm}`;
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fl-staff-slot day"
    class:hour-start={isHourStart === true}
    class:hour-end={isHourEnd === true}
    onclick={() => addBooking()}
    data-staff={staff.id}
    data-date={slot.date}
    data-slot={slot.value}
>
    {#if isHourStart === true}
    <span class="hour-label">{renderTime}</span>
    {/if}
</div>

<!-- <dialog bind:this={dialog} class="dlg-booking"></dialog> -->

<style>
    .fl-staff-slot {
        /* background-color: red; */
        /* border-top: 1px solid var(--border-light); */
        /* border-left: 1px solid var(--accent-border); */
        cursor: pointer;
        height: 2rem;
        /* padding: 0.5rem; */
        overflow: visible;
        position: relative;
        /* transition: all 20ms ease-in-out; */
    }
    .fl-staff-slot:not(:first-of-type) {
        border-top: 1px dashed var(--border-semi-light);
    }
    /* .fl-staff-slot:hover {
        box-shadow: inset 0 0 0 3px var(--accent-border);
    } */
    .fl-staff-slot.hour-start {
        border-top: none;
    }
    .fl-staff-slot.hour-end {
        border-bottom: 1px solid var(--border-semi-light);
    }
    .fl-staff-slot > .hour-label {
        color: var(--dark);
        opacity: 0.8;
        position: absolute;
        font-size: 0.875rem;
        top: 0.125rem;
        left: 0.25rem;
    }
</style>
