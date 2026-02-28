<script>
    import { createAppointmentData } from "$lib/data/appointment.svelte";
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createServicesData } from "$lib/data/services.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    import CalendarWeekSlots from "./calendar-week-slots.svelte";
    import CalendarWeekDay from "./calendar-week-day.svelte";

    let appointment = createAppointmentData();
    let calendar = createCalendarData();
    let services = createServicesData();
    let settings = createSettingsData();

    let {
        data = [],
        value = new Date()
    } = $props();

    let timeSlots = $state([]);
    let dialogDate = $state('');

    const blockDay = (id) => {
        alert(`blocking day ${id}...`);
    };

    let weekStart = $derived.by(() => {
        let dt = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        dt.setDate(value.getDate() - value.getDay() + settings.weekStart);
        // console.log(`week value`, value);
        // console.log(`weekStart`, dt);
        return dt;
    });

    let currentWeekDays = $derived.by(() => {
        let output = [];
        for (let i = 0; i < 7; i++) {
            let dt = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
            dt.setDate(dt.getDate() + i);
            
            let obj = {
                date: dt,
                name: settings.weekDays.find(d => d.id === dt.getDay())?.name
            };
            // console.log(`* currentWeekDays obj, i = ${i}`, obj);
            output.push(obj);
        }
        return output;
    });

    let slotDate = $derived.by(() => {
        if (!calendar.slot) { return ''; }

        return (new Date(calendar.slot)).toLocaleDateString('en-NZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    let slotDay = $derived.by(() => {
        if (!calendar.slot) { return ''; }

        return (new Date(calendar.slot)).toLocaleDateString('en-NZ', {
            weekday: 'long'
        });
    });

    let slotTime = $derived.by(() => {
        if (!calendar.slot) { return ''; }

        return (new Date(calendar.slot)).toLocaleTimeString('en-NZ', {
            hour: 'numeric',
            minute: 'numeric'
        });
    });

    let slotDialog = $state(null);

    const showForm = () => {
        appointment.setValues(calendar.selectedBlock);

        dialogDate = calendar.slot;
        slotDialog.showModal();
    };

    const closeForm = () => {
        slotDialog.close();
    };

    const validateAppointment = () => {
        if (!appointment.service) {
            alert('Please select a service from the list.');
            return false;
        }

        return true;
    };

    const saveAppointment = () => {
        appointment.slot = `${appointment.date} ${appointment.time}`;
        console.log(`* saveAppointment slot = ${calendar.slot}`, appointment.values);

        if (validateAppointment() === false) { return; }

        // TODO - Implement save to db
        calendar.updateSlotBlock(appointment.values);
        slotDialog.close();
    };

    let isDirty = $derived.by(() => {
        return (
            appointment.customer !== calendar.selectedBlock?.customer ||
            appointment.phone !== calendar.selectedBlock?.phone ||
            appointment.email !== calendar.selectedBlock?.email ||
            appointment.service !== calendar.selectedBlock?.service
        )
    });

    const deleteAppointment = () => {
        console.log(`deleting appointment at slot ${calendar.slot}`);
        if (isDirty) {
            if (confirm('You have unsaved changes. Are you sure you want to delete this?') === false) {
                return;
            }
            return;
        }

        if (confirm('This will permanently remove the appointment. Are you sure?') === false) {
            return;
        }

        // TODO - implement delete from db
        calendar.deleteSlotBlock(calendar.slot);
        slotDialog.close();
    };
</script>

<div class="wrapper">
    <div class="header border-b-2 border-(--accent)">
        <div class="time-col border-r border-(--border)"></div>
        {#each currentWeekDays as cd, i}
            <div class="week-day {i < settings.weekDays.length - 1 ? 'border-r border-(--border)' : ''}">
                <span class="date">{cd.date.getDate().toString()}</span>
                <span class="name">{cd.name.slice(0, 3).toUpperCase()}</span>
                <button class="menu" title="Menu" onclick={blockDay(i)}>
                    <i class="ph ph-gear-six"></i>
                </button>
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">

            <CalendarWeekSlots />

            {#each currentWeekDays as cd, i}
                <CalendarWeekDay
                    value={cd.date}
                    blocked={false}
                    blocks={calendar.blocks}
                    onslotselect={showForm}
                />
            {/each}
        </div>
    </div>
</div>

<dialog class="day-dialog" bind:this={slotDialog}>
    <div class="dlg-header">
        <div class="dlg-title">
            <span>Appointment Details</span>
            <button class="dlg-close" onclick={closeForm}>
                Close<!-- <i class="ph ph-x"></i> -->
            </button>
        </div>
        {#if calendar.selectedBlock}
            <span class="dlg-desc">Update your appointment details here</span>
        {:else}
            <span class="dlg-desc">Add an appointment</span>
        {/if}
    </div>
    <div class="dlg-contents">
        <div class="dlg-slot-2">
            <div class="row">
                <label for="serviceDate">Date</label>
                <input type="date" id="serviceDate" name="serviceDate" bind:value={appointment.date} />
            </div>
            <div class="row">
                <label for="serviceTime">Time</label>
                <input type="time" id="serviceTime" name="serviceTime" bind:value={appointment.time} />
            </div>
            <!-- <div class="flex align-center justify-between">
                <span class="slot-day">{slotDay}</span>
                <span class="slot-time">{slotTime}</span>
            </div>
            <span class="slot-date">{slotDate}</span> -->
        </div>

        <div class="row">
            <label for="customer">Customer Name</label>
            <input type="text" id="customer" name="customer" bind:value={appointment.customer}>
        </div>
        <div class="row">
            <div class="contact-details">
                <div class="phone">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" bind:value={appointment.phone}>
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" bind:value={appointment.email}>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="service">
                <label for="service">Service Requested</label>
                <select id="service" name="service" bind:value={appointment.service}>
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

        {#if appointment.service}
        <div class="row service-details">
            <i class="ph ph-clock"></i>
            <span class="service-duration">Usually takes {services.getDuration(appointment.service)} minutes</span>
        </div>
        {/if}

        <div class="dlg-actions">
            <button class="btn-save" onclick={saveAppointment}>
                {calendar.selectedBlock ? 'Update' : 'Create'} this appointment
            </button>
            {#if calendar.selectedBlock}
                <button class="btn-delete" onclick={deleteAppointment}>
                    Delete
                </button>
            {/if}
        </div>
    </div>
</dialog>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .header {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .calendar-contents {
        flex: 1;
        overflow-y: auto;
    }
    /* .header, */
    .calendar-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .week-day {
        /* background-color: var(--accent-lighter); */
        padding: 0.25rem 0.5rem 0.25rem 0.75rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* position: relative; */
        /* padding: 0.5rem 0.5rem 0.675rem; */
    }
    /* .day-title {
        width: 100%;
        border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    } */
    .week-day .date {
        /* color: var(--dark); */
        font-size: 1.5rem;
        font-weight: 400;
        /* border: 1px solid red; */
        line-height: 1.5rem;
    }
    .week-day .name {
        color: var(--medium);
        /* font-size: 1.25rem; */
        font-weight: 400;
        /* border: 1px solid red; */
        line-height: 1.25rem;
    }
    /* .slot {
        height: 4rem;
    } */
    .menu {
        /* position: absolute; */
        top: 0.25rem;
        right: 0.25rem;
        padding: 0.25rem 0.375rem 0.125rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: var(--transition);
        background-color: white;
    }
    .menu i {
        font-size: 1.25rem;
    }
    .menu:hover {
        background-color: var(--border-lightest);
    }
    .day-dialog {
        padding: 1rem 1.5rem 1.5rem;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 1px solid var(--border-light);
        border-radius: 0.5rem;
        outline: 0;
        width: 30rem;
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
    .dlg-slot,
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
    }
    .service-details {
        display: flex;
        align-items: center;
        gap: 1rem;
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