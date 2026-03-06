<script>
    import { createAppointmentData } from "$lib/data/appointment.svelte";
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createServicesData } from "$lib/data/services.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    const appointment = createAppointmentData();
    const calendar = createCalendarData();
    const services = createServicesData();
    const settings = createSettingsData();

    let {
        data = $bindable(),

        onclose
    } = $props();

    const deleteData = () => {
        // console.log(`deleting appointment at slot ${calendar.slot}`);
        // if (isDirty) {
        //     if (confirm('You have unsaved changes. Are you sure you want to delete this?') === false) {
        //         return;
        //     }
        //     return;
        // }

        if (confirm('This will permanently remove the appointment. Are you sure?') === false) {
            return;
        }

        // TODO - implement delete from db
        calendar.deleteSlotItem(calendar.slot);
        // ondeleteitem();
        onclose();
    };

    const saveData = () => {
        // let dt = new Date(`${appointment.date} ${appointment.time}`);
        // // let dateString = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        // // let timeString = `${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
        // appointment.slot = `${calendar.parseDate(dt)} ${calendar.parseTime(dt)}`;
        // console.log(`* saveAppointment slot = ${calendar.slot}`, appointment.values);
        console.log(`* saveAppointment slot = ${calendar.slot}; data`, data);

        if (validate() === false) { return; }

        // TODO - Implement save to db
        calendar.updateItem(data);
        onclose();
    };

    const validate = () => {
        if (!data.service) {
            alert('Please select a service from the list.');
            return false;
        }

        return true;
    };
</script>

<div class="dlg-container">
    <div class="dlg-header">
        <div class="dlg-title">
            <span>Appointment Details</span>
            <button class="dlg-close" onclick={onclose}>
                Close
            </button>
        </div>
        {#if calendar.activeItem}
            <span class="dlg-desc">Update your appointment details here</span>
        {:else}
            <span class="dlg-desc">Add an appointment</span>
        {/if}
    </div>
    <div class="dlg-contents">
        <div class="dlg-slot-2">
            <div class="row">
                <label for="serviceDate">Date</label>
                <input type="date" id="serviceDate" name="serviceDate" bind:value={data.date} />
            </div>
            <div class="row">
                <label for="serviceTime">Time</label>
                <input type="time" id="serviceTime" name="serviceTime" bind:value={data.time} />
            </div>
        </div>

        <div class="row">
            <label for="customer">Customer Name</label>
            <input type="text" id="customer" name="customer" bind:value={data.customer}>
        </div>
        <div class="row">
            <div class="contact-details">
                <div class="phone">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" bind:value={data.phone}>
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" bind:value={data.email}>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="service">
                <label for="service">Service Requested</label>
                <select id="service" name="service" bind:value={data.service}>
                    {#each services.listByCategory as category}
                        <optgroup label={category.name}>
                            {#each category.services as item}
                                <option value={item.id}>{item.name}</option>
                            {/each}
                        </optgroup>
                    {/each}
                </select>
            </div>
        </div>

        {#if data.service}
            <div class="row service-details">
                <i class="ph ph-clock"></i>
                <span class="service-duration">Usually takes {services.getDuration(data.service)} minutes</span>
            </div>
        {/if}

        <div class="dlg-actions">
            <button class="btn-save" onclick={saveData}>
                {calendar.activeItem ? 'Update' : 'Create'} this appointment
            </button>
            {#if calendar.activeItem}
                <button class="btn-delete" onclick={deleteData}>
                    Delete
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    .dlg-container {
        padding: 1rem 1.5rem 1.5rem;
        border: 1px solid var(--border-light);
        border-radius: 0.5rem;
        outline: 0;
        width: 100%;
    }
    .dlg-header {
        display: grid;
        gap: 0rem;
        margin-bottom: 2rem;
    }
    .dlg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dlg-title > span {
        font-size: 1rem;
        font-weight: 600;
    }
    .dlg-close {
        border: 1px solid var(--border-light);
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
    .dlg-close:hover {
        box-shadow: var(--shadow-sm);
    }
    .dlg-desc {
        color: var(--medium);
    }
    .dlg-contents {
        display: grid;
        gap: 1.75rem;
    }
    .row * {
        display: grid;
        font-size: 0.875rem;
    }
    .row label {
        /* border: 1px solid red; */
        color: var(--medium);
        font-weight: 500;
    }
    .contact-details {
        display: grid;
        grid-template-columns: 8rem 1fr;
        gap: 1rem;
    }
    input[type=date],
    input[type=email],
    input[type=tel],
    input[type=text],
    input[type=time],
    select
    {
        border: 1px solid var(--border-light);
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        width: 100%;
        /* outline: 1px solid var(--accent); */
    }
    /* input[type=tel] {
        width: 10rem;
    } */
    input[type=date]:focus,
    input[type=email]:focus,
    input[type=tel]:focus,
    input[type=text]:focus,
    input[type=time]:focus,
    select:focus {
        border: 1px solid var(--accent-light);
        box-shadow: 0 0 5px var(--accent-light);
        outline: none;
        transition: var(--transition);
        /* outline: 2px solid var(--accent); */
    }
    .dlg-slot-2 {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
    }
    /* .dlg-slot,
    .service-details {
        padding: 0.25rem 0.5rem;
        border: 0;
        border-radius: 0.375rem;
    }
    .dlg-slot {
        display: grid;
        box-shadow: 0 0 3px var(--accent);
        background-color: var(--accent-lightest);
    }
    .slot-day,
    .slot-time {
        font-size: 1.25rem;
        color: var(--dark);
    }
    .slot-time {
        font-weight: 600;
    }
    .slot-date {
        color: var(--medium);
    }
    .contact {
        display: grid;
        border: 1px solid var(--border-light);
    }
    .contact > span {
        color: var(--medium);
    }
    .contact > span.name {
        color: var(--darkest);
        font-size: 1rem;
        font-weight: 600;
    } */
    .service-details {
        align-items: center;
        border: 0;
        border-radius: 0.375rem;
        display: flex;
        gap: 1rem;
        padding: 0.25rem 0.5rem;
    }
    .service-details > i {
        font-size: 1.5rem;
    }
    .service-duration {
        font-weight: 600;
    }
    .dlg-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0rem;
    }
    .dlg-actions > button {
        padding: 0.375rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: var(--transition);
    }
    .btn-save {
        background-color: var(--accent-light);
        border: 0;
        /* border: 1px solid var(--accent-light); */
        color: var(--dark);
        font-weight: 600;
    }
    .btn-save:hover {
        background-color: var(--accent);
    }
    .btn-delete {
        border: 1px solid transparent;
    }
    .btn-delete:hover {
        background-color: var(--border-lightest);
        color: red;
    }
</style>