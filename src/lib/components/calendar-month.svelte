<script>
    import { createAppointmentData } from "$lib/data/appointment.svelte";
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createServicesData } from "$lib/data/services.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";
    import CalendarMonthDay from "./calendar-monthday.svelte";
    import CalendarWeekSlots from "./calendar-week-slots.svelte";
    import CalendarWeekDay from "./calendar-week-day.svelte";
    import DialogAppointment from "./dialog-appointment.svelte";
    import DialogWeekDay from "./dialog-week-day.svelte";

    let {
        data = [],
        value = new Date()
    } = $props();

    const appointment = createAppointmentData();
    const calendar = createCalendarData();
    const services = createServicesData();
    const settings = createSettingsData();
    // let weekDays = settings.weekDays;
    // console.log('weekDays', weekDays);

    let tempValues = $state({});
    let weeks = $derived.by(() => {
        let output = [];
        let startDay = new Date(value.getFullYear(), value.getMonth(), 1);
        let endDay = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        let currentDay = new Date(startDay.getFullYear(), startDay.getMonth(), 1);
        console.log('startDay', startDay);
        console.log('endDay', endDay);

        let week = [];
        do {
            let currentDate = currentDay.getDate();
            let dayOfWeek = currentDay.getDay();

            if (week.length >= 7) {
                output.push(week);
                week = [];
            }

            if (currentDate === 1) {
                week = [];
                let count = 0;

                // if start with Sunday
                if (settings.weekStart === 0) {
                    if (dayOfWeek === 0) count = 0;
                    else count = dayOfWeek;
                }
                else {
                    if (dayOfWeek === 0) count = 6;
                    else count = dayOfWeek - 1;
                }
                console.log('** 1 count = ', count);

                for (let i = 0; i < count; i++) {
                    week.push(null);
                }
            }

            week.push({
                date: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()),
                day: dayOfWeek
            });

            if (currentDate === endDay.getDate()) {
                for (let i = week.length; i < 7; i++) {
                    week.push(null);
                }
    
                output.push(week);
                break;
            }

            currentDay.setDate(currentDate + 1);
        } while (currentDay <= endDay);
        console.log('*** calendar-month output', output);

        return output;
    });

    const closeForm = () => {
        slotDialog.close();
    };

    const setAppointmentValues = (values) => {
        console.log(`appointment setValues; value =>`, values);
        tempValues.customer = values?.customer || '';
        tempValues.email = values?.email || '';
        tempValues.id = values?.id || '';
        tempValues.phone = values?.phone || '';
        tempValues.service = values?.service || '';
        tempValues.slot = values?.slot || calendar.slot;
        // if (!appointment.slot) { return }

        let dt = new Date(tempValues.slot);
        console.log(`appointment setValues; dt =>`, dt);
        tempValues.date = settings.parseDate(dt);
        // appointment.date = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate().toString().padStart(2, '0')}`;
        tempValues.time = settings.parseTime(dt);
        // appointment.time = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        console.log(`appointment setValues; output =>`, tempValues);
    }

    const saveAppointment = () => {
        // let dt = new Date(`${appointment.date} ${appointment.time}`);
        // // let dateString = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        // // let timeString = `${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
        // appointment.slot = `${calendar.parseDate(dt)} ${calendar.parseTime(dt)}`;
        // console.log(`* saveAppointment slot = ${calendar.slot}`, appointment.values);
        console.log(`* saveAppointment slot = ${calendar.slot}; tempValues`, tempValues);

        if (validateAppointment() === false) { return; }

        // TODO - Implement save to db
        calendar.updateItem(tempValues);
        // calendar.updateSlotBlock(appointment.values);
        slotDialog.close();
    };

    let addDialog = $state(null);
    let viewDialog = $state(null);
    let appointmentDialog = $state(null);

    // const onAddClick = () => {
    //     appointmentDialog.showModal();
    // };

    // const onViewClick = () => {
    //     viewDialog.showModal();
    // };

    const onItemClick = (update = true) => {
        if (update !== true) {
            tempValues = appointment.initialize();
        }
        setAppointmentValues(calendar.activeItem);
        appointmentDialog.showModal();
    };

    const hideAdd = () => {
        appointmentDialog.close();
    };

    // const showAdd = () => {
    //     tempValues = appointment.initialize();
    //     setAppointmentValues(calendar.activeItem);
    // };

    // const hideAppointment = () => {
    //     appointmentDialog.close();
    // };

    // const hideView = () => {
    //     viewDialog.close();
    // };
</script>

<div class="wrapper">
    <div class="header border-b border-(--border)">
        {#each settings.weekDays as day, i}
            <div class="week-day text-center {i < settings.weekDays.length - 1 ? 'border-r border-(--border)' : ''}">
                {day.name}
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">
            {#each weeks as week}
            <div class="month-row">
                {#each settings.weekDays as day, i}
                <CalendarMonthDay
                    day={week[i]}
                    disabled={settings.daysOff.indexOf(day.id) >= 0}
                    onitemclick={onItemClick}
                    onaddclick={onItemClick}
                    onviewclick={() => viewDialog.showModal()}
                />
                {/each}
            </div>
            {/each}
        </div>
    </div>
</div>

<!-- <dialog id="addDialog" bind:this={addDialog}>
    <div class="dlg-header">
        <div class="dlg-title">
            <span>Add Appointment</span>
            <button class="dlg-close" onclick={hideAdd}>
                Close-- <i class="ph ph-x"></i> --
            </button>
        </div>
    </div>
</dialog> -->

<dialog id="viewDialog" bind:this={viewDialog}>
    <DialogWeekDay {value} onclose={() => viewDialog.close()} />
    <!-- <div class="dlg-header">
        <div class="dlg-title">
            <span>{value.toLocaleDateString('en-NZ', {   })}</span>
            <button class="dlg-close" onclick={hideView}>
                Close!-- <i class="ph ph-x"></i> --
            </button>
        </div>
    </div>
    <div class="flex flex-cols-[80px_auto] border-1">
        <CalendarWeekSlots />
        <CalendarWeekDay
            blocked={false}
            items={calendar.items}
            onslotselect={() => {}}
        />
    </div> -->
</dialog>

<dialog id="appointmentDialog" bind:this={appointmentDialog}>
    <DialogAppointment bind:data={tempValues} onclose={() => appointmentDialog.close()} />
    <!-- <div class="dlg-header">
        <div class="dlg-title">
            <span>Appointment Details</span>
            <button class="dlg-close" onclick={hideAppointment}>
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
                <input type="date" id="serviceDate" name="serviceDate" bind:value={tempValues.date} />
            </div>
            <div class="row">
                <label for="serviceTime">Time</label>
                <input type="time" id="serviceTime" name="serviceTime" bind:value={tempValues.time} />
            </div>
        </div>

        <div class="row">
            <label for="customer">Customer Name</label>
            <input type="text" id="customer" name="customer" bind:value={tempValues.customer}>
        </div>
        <div class="row">
            <div class="contact-details">
                <div class="phone">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" bind:value={tempValues.phone}>
                </div>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" bind:value={tempValues.email}>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="service">
                <label for="service">Service Requested</label>
                <select id="service" name="service" bind:value={tempValues.service}>
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

        {#if tempValues.service}
        <div class="row service-details">
            <i class="ph ph-clock"></i>
            <span class="service-duration">Usually takes {services.getDuration(tempValues.service)} minutes</span>
        </div>
        {/if}

        <div class="dlg-actions">
            <button class="btn-save" onclick={saveAppointment}>
                {calendar.activeItem ? 'Update' : 'Create'} this appointment
            </button>
            {#if calendar.activeItem}
                <button class="btn-delete" onclick={deleteAppointment}>
                    Delete
                </button>
            {/if}
        </div>
    </div> -->
</dialog>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .calendar-contents {
        flex: 1;
        overflow-y: auto;
    }
    .header,
    .calendar-grid {
        width: 100%;
        display: grid;
    }
    .header {
        font-weight: 600;
        grid-template-columns: repeat(7, 1fr);
    }
    .week-day {
        background-color: var(--accent-light);
        padding: 0.25rem;
    }
    .month-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    dialog {
        min-width: 10rem;
        min-height: 10rem;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    dialog {
        /* padding: 1rem 1.5rem 1.5rem; */
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        /* border: 1px solid var(--border-light); */
        border-radius: 0.5rem;
        outline: 0;
    }
    #appointmentDialog {
        width: 30rem;
    }
    #viewDialog {
        width: 90vw;
    }
    /* .dlg-header {
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
    } */
    /* .dlg-desc {
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
        * border: 1px solid red; *
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
        * outline: 1px solid var(--accent); *
    }
    * input[type=tel] {
        width: 10rem;
    } *
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
        * outline: 2px solid var(--accent); *
    } */
    /* .dlg-slot-2 {
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
        * border: 1px solid var(--accent-light); *
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
    } */
    /* .slot {
        height: 10rem;
        position: relative;
    }
    .slot-disabled {
        background: repeating-linear-gradient(
            45deg,
            white,
            white 10px,
            var(--accent) 10px,
            var(--accent) 11px
        )
    }
    .slot,
    .slot-disabled {
        border-bottom: 1px solid var(--border);
    }
    .slot:not(:last-child),
    .slot-disabled:not(:last-child) {
        border-right: 1px solid var(--border);
    }
    .title {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-weight: 500;
    } */
</style>