<script>
    import { Calendar, Clock, MapPin, Scissors, User, X } from "@lucide/svelte";
    import { getContext } from "svelte";
    import BookingFormItem from "./booking-form-item.svelte";
    import Button from "../../button.svelte";
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
    
</script>

<div class="fl-booking">
    <!-- <div> -->
        <div class="fl-booking-header flex-center between">
            <div class="form-title">
                <span class="title">Appointment Details</span>
                <span class="sub-title">Fill out the booking form below</span>
            </div>
            <button type="button" onclick={onclose}><X size={20} /></button>
        </div>
        <div class="fl-booking-content">
            <!-- <div class="content-header"> -->
                <BookingFormItem Icon={MapPin}>
                    {#snippet header()}
                        <span class="subtext">Booking location</span>
                        <span class="text">137 The Square</span>
                    {/snippet}
                </BookingFormItem>
                <!-- <div class="fl-sep-vertical"></div> -->
                <BookingFormItem Icon={Calendar}>
                    {#snippet header()}
                        <span class="subtext">Booking date</span>
                        <span class="text">Wednesday, 25 September 2026</span>
                    {/snippet}
                </BookingFormItem>
                <!-- <div class="fl-sep-vertical"></div> -->
                <BookingFormItem Icon={Clock}>
                    {#snippet header()}
                        <span class="subtext">Starts on</span>
                        <span class="text">11:30 am</span>
                    {/snippet}
                </BookingFormItem>
            <!-- </div> -->
            
            <!-- <div class="fl-sep-horizontal"></div> -->

            <!-- <div class="content-data"> -->
                <BookingFormItem Icon={Scissors}>
                    {#snippet header()}
                        <span class="subtext">Booked service</span>
                        <span class="text">Women's haircut + blow-dry</span>
                    {/snippet}
                    {#snippet details()}
                        <p>Takes around 90 minutes</p>
                    {/snippet}
                    <!-- <span class="text">11:30 am</span> -->
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
            <!-- </div> -->
            <!-- <div class="content"></div> -->
        </div>
    <!-- </div> -->

    <div class="footer">
        {@render footer()}
    </div>
</div>
    <!-- <div class="fl-timeline-dlg">
        -- <div> --
            <div class="heading flex-center between">
                <span>Tuesday, 23 June 2026 - 10:30 am</span>
                <Button Icon={X} flat={true} onclick={hideDrawer} />
            </div>
            <div class="content-wrapper">
                <div class="fl-sidebar">
                    <Field id="fld-client" label="Client">
                        <InputText id="fld-client" material={true} />
                    </Field>
                </div>
                <div class="content">content</div>
            </div>
        -- </div> --

        -- <div class="footer">
            <Button onclick={hideDrawer}>Close</Button>
        </div> --
    </div> -->

<style>
    /* .fl-sep-vertical {
        width: 1px;
        border-left: 1px dashed var(--border);
    } */
    /* .fl-sep-horizontal {
        height: 1.5px;
        border-top: 1px solid var(--semi-light);
    } */
    .fl-booking {
        height: 100%;
        width: 100%;
        /* width: 25rem; */
        /* min-height: 20rem; */
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
    }
    /* .fl-booking > .header {
        display: flex;
        align-items: baseline;
        padding: 0.25rem;
        * background-color: var(--light); *
    } */
    .fl-booking-header {
        background-color: var(--primary);
        padding: 0.75rem 1.5rem;
    }
    .form-title {
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
        /* margin-left: 1.5rem; */
        /* margin-top: 0.75rem; */
    }
    .form-title > .title {
        color: var(--white);
        font-size: 1.25rem;
        font-weight: 500;
    }
    .form-title > .sub-title {
        color: var(--lighter);
        /* color: var(--semi-dark); */
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
        /* border: 1px solid red; */
        margin: 0.5rem 0rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
    }
    /* .content > .content-header { */
        /* display: grid; */
        /* grid-template-columns: 1fr auto 1fr auto 1fr; */
        /* grid-template-columns: 1fr 1fr 1fr; */
        /* gap: 0.5rem; */
    /* } */
    /* .fl-location {
        font-weight: 400;
        opacity: 0.8;
    } */
    /* .content-data { */
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: flex-start; */
        /* grid-template-columns: 1fr 1r; */
        /* gap: 1rem; */
    /* } */
</style>
