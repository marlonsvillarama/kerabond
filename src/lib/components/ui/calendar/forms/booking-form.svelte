<script>
    import { Calendar, Clock, MapPin, Scissors, User, X } from "@lucide/svelte";
    import { getContext } from "svelte";
    import BookingFormItem from "./booking-form-item.svelte";
    import Button from "../../button.svelte";
    import CalendarDatePicker from "../calendar-date-picker.svelte";
    import CalendarTimePicker from "../calendar-time-picker.svelte";
    import Separator from "../../separator.svelte";

    let {
        footer,
        header,
        onclose
    } = $props();

    /**
     * Client name
     * Phone
     * Email
     * Service
     * Staff
     * Location
    */

    let datePopover = $state();
    let timePopover = $state();
    
    const selectDate = (value) => {
        console.log(`Selected date = ${value}`);
        datePopover.hidePopover();
    };

    const selectTime = (value) => {
        console.log(`Selected date = ${value}`);
        timePopover.hidePopover();
    };
</script>

<div class="fl-booking">
    <div class="fl-booking-header flex-center between">
        <div class="form-title">
            <span class="title">Appointment Details</span>
            <span class="sub-title">Fill out the booking form below</span>
        </div>
        <button type="button" onclick={onclose}><X size={20} /></button>
    </div>

    <div class="fl-booking-content">
        <BookingFormItem Icon={MapPin} locked={true}>
            {#snippet header()}
                <span class="subtext">Booking location</span>
                <span class="text">137 The Square</span>
            {/snippet}
        </BookingFormItem>

        <BookingFormItem Icon={Calendar} target="fl-booking-date-popover">
            {#snippet header()}
                <span class="subtext">Booking date</span>
                <span class="text">Wednesday, 25 September 2026</span>
            {/snippet}
            {#snippet dialog()}
                <div class="fl-form-item-popover" id="fl-booking-date-popover" popover bind:this={datePopover} style="position-anchor: --fl-booking-date-popover">
                    <CalendarDatePicker onselectdate={selectDate} />
                </div>
            {/snippet}
        </BookingFormItem>

        <BookingFormItem Icon={Scissors}>
            {#snippet header()}
                <span class="subtext">Booked service</span>
                <span class="text">Women's haircut + blow-dry</span>
            {/snippet}
            {#snippet details()}
                <p>Takes around 90 minutes</p>
            {/snippet}
        </BookingFormItem>

        <BookingFormItem Icon={Clock} target="fl-booking-time-popover">
            {#snippet header()}
                <span class="subtext">Starts on</span>
                <span class="text">11:30 am</span>
            {/snippet}
            {#snippet dialog()}
                <div class="fl-form-item-popover" id="fl-booking-time-popover" popover bind:this={timePopover} style="position-anchor: --fl-booking-time-popover">
                    <CalendarTimePicker onselecttime={selectTime} />
                </div>
            {/snippet}
        </BookingFormItem>

        <BookingFormItem Icon={User}>
            {#snippet header()}
                <span class="subtext">Guest</span>
                <span class="text">Apple Villarama</span>
            {/snippet}
            {#snippet details()}
                <p>Email</p>
                <p>Phone</p>
            {/snippet}
        </BookingFormItem>
    </div>

    <div class="footer">
        {@render footer()}
    </div>
</div>

<style>
    .fl-booking {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .fl-booking-header {
        background-color: var(--primary);
        padding: 0.75rem 1.5rem;
    }
    .form-title {
        display: flex;
        flex-direction: column;
    }
    .form-title > .title {
        color: var(--white);
        font-size: 1.25rem;
        font-weight: 500;
    }
    .form-title > .sub-title {
        color: var(--lighter);
        font-size: 0.875rem;
        font-weight: 400;
        margin-top: 0.125rem;
        opacity: 0.8;
    }
    .fl-booking-header > button {
        background-color: transparent;
        border: 0;
        border-radius: 50%;
        color: var(--white);
        cursor: pointer;
        outline: 0;
        height: 2.125rem;
        width: 2.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-booking-header > button:hover {
        background-color: var(--primary-light);
        color: var(--darker);
    }
    .fl-booking > .fl-booking-content {
        flex: 1;
        margin: 0.5rem 0rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
    }
</style>
