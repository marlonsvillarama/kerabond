<script>
    // import { getContext } from "svelte";
    import { CalendarStore } from "./calendar-store.svelte";
    import { Check, Eye, EyeClosed } from "@lucide/svelte";
    import Avatar from "../avatar.svelte";

    let {
        data = [],
        // date = $bindable(new Date()),
        // view = 'day',
    } = $props();
    // let calendarStore = getContext('calendarStore');
    let calendarStore = CalendarStore();
    
    const interval = 15;
    const startHour = 8;
    const endHour = 21;
    
    let daySlots = $derived.by(() => {
        let now = calendarStore.date;
        // let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let output = [];

        let dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        dt.setDate(dt.getDate() - dt.getDay() - 1);
        
        let i = 0;
        do {
            dt.setDate(dt.getDate() + 1);

            let year = dt.getFullYear();
            let month = (dt.getMonth() + 1).toString().padStart(2, '0');
            let date = dt.getDate().toString().padStart(2, '0');
            output.push({
                day: dt.toLocaleDateString('en-NZ', { weekday: 'short' }),
                date: `${year}-${month}-${date}`,
                long: dt.toLocaleDateString('en-NZ', { month: 'long', day: 'numeric', weekday: 'short' }),
                short: dt.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' }),
            });
            i++;
        } while (i < 7);

        console.log('daySlots', output)
        return output;
    });

    let timeSlots = $derived.by(() => {
        let output = [];
        let now = calendarStore.date;
        let dt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour);

        let i = 0;
        do {
            let year = dt.getFullYear();
            let month = (dt.getMonth() + 1).toString().padStart(2, '0');
            let date = dt.getDate().toString().padStart(2, '0');
            let hours = dt.getHours().toString().padStart(2, '0')
            let minutes = dt.getMinutes().toString().padStart(2, '0');

                // date: `${year}-${month}-${date}`,
            output.push({
                id: `${hours}${minutes}`,
                date: formatDate(dt),
                slot: dt.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true }),
                value: `${hours}${minutes}`,
                hourStart: dt.getMinutes() === 0
            });
            dt.setMinutes(dt.getMinutes() + interval);
            dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes());
            i++;
        } while (dt.getHours() < endHour);

        return output;
    });

    const sortByKey = (list, key) => {
        if (key) {
            list.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (b[key] < a[key]) return 1;
                return 0;
            });
        }
        else {
            list.sort((a, b) => {
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
            });
        }

        list = list;
        return list;
    };

    let allStaff = $state([
        { id: 1, name: 'John', initials: 'JF', image: '/images/avatars/jf.png' },
        { id: 2, name: 'Apple', initials: 'AV', image: '/images/avatars/av.png' },
        { id: 3, name: 'Marlong2', initials: 'MV', image: 'images/avatars/mv2.png' },
        { id: 4, name: 'Marlong', initials: 'MV' },
    ]);
    allStaff = sortByKey(
        allStaff.map(d => {
            return {
                ...d, checked: true
            };
        }),
        'name'
    );

    let timelineStaff = $derived(sortByKey(allStaff.filter(d => d.checked === true), 'name'));

    const updateTimelineStaff = (id) => {
        let staff = allStaff.find(d => d.id === id);
        let index = timelineStaff.findIndex(d => d.id === id);

        if (index >= 0) {
            timelineStaff.splice(index, 1);
            timelineStaff = sortByKey(timelineStaff, 'name');
            return;
        }

        timelineStaff.push(staff);
        timelineStaff = sortByKey(timelineStaff, 'name');
    }
</script>

<div class="fl-cal-timeline">
    <!-- <Sidebar root="/setup" items={sidebarItems} onselect={updateSetup} /> -->
    <div class="fl-sidebar">
        <div class="fl-staff-list">
            {#each allStaff as staff}
            <div class="fl-staff-toggle">
                <input type="checkbox" name="staff-{staff.id}" id="staff-{staff.id}"
                    bind:checked={staff.checked}
                    onchange={() => updateTimelineStaff(staff.id)}>
                <label for="staff-{staff.id}" class="flex-center between">
                    <span>{staff.name}</span>
                    {#if staff.checked}
                    <Eye size={16} />
                    {:else}
                    <EyeClosed size={16} />
                    {/if}
                </label>
            </div>
            {/each}
        </div>
        {calendarStore.date}
    </div>

    <div class="fl-content fl-page">
        <div class="fl-timeline-header">
            <div class="fl-timeline-corner" class:day={calendarStore.mode === 'day'} class:week={calendarStore.mode === 'week'}></div>
            <div class="fl-timeline-staff" style="grid-template-columns: repeat({timelineStaff.length}, 1fr);">
                {#each timelineStaff as staff}
                    <div class="fl-timeline-staff-header">
                        <!-- <div class="fl-staff-avatar">{staff.initials}</div> -->
                        <Avatar label={staff.initials} image={staff.image} />
                        {staff.name}
                    </div>
                {/each}
            </div>
        </div>

        <div class="fl-timeline-grid fl-full-scrollable">
            {#if calendarStore.mode === 'day'}
                {#each timeSlots as slot}
                    <div class="fl-timeline-row"
                        class:fl-slot-start={slot.hourStart === true}
                    >
                        <div class="fl-selection-box"></div>

                        {#if slot.hourStart}
                            <span class="fl-slot-start-label">{slot.slot}</span>
                        {/if}
                        <div class="fl-timeline-slot-header day"></div>
                        <div 
                            class="fl-timeline-slot day"
                            class:fl-slot-start={slot.hourStart === true}
                            style="grid-template-columns: repeat({timelineStaff.length}, 1fr);"
                        >
                            {#each timelineStaff as staff}
                                <div class="fl-staff-slot" data-staff={staff.id} data-date={slot.date} data-slot={slot.value}></div>
                            {/each}
                        </div>
                    </div>
                {/each}
            {:else if calendarStore.mode === 'week'}
                {#each daySlots as slot}
                    <div class="fl-timeline-row fl-slot-start">
                        <div class="fl-timeline-slot-header week">
                            <span class="date">{slot.short}</span>
                            <span class="day">{slot.day}</span>
                        </div>
                        <div class="fl-timeline-slot week" style="grid-template-columns: repeat({timelineStaff.length}, 1fr);">
                            {#each timelineStaff as staff}
                                <div class="fl-staff-slot week" data-staff={staff.id} data-date={slot.date}></div>
                            {/each}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .fl-cal-timeline {
        background-color: var(--white);
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        margin: 1rem;
        margin-top: 0;
        overflow-y: auto;
    }
    .fl-sidebar {
        width: 13rem;
        padding: 0.5rem;
    }
    :global(.fl-sidebar > *) {
        flex: 1;
        width: 100%;
    }
    :global(.fl-sidebar > *:not(:last-child)) {
        margin-bottom: 0.5rem;
    }
    .fl-cal-timeline > .fl-page {
        border-left: 1px solid var(--border);
        flex: 1;
        display: grid;
        grid-template-rows: auto 1fr;
        overflow-y: auto;
    }
    .fl-timeline-header {
        display: grid;
        grid-template-columns: auto 1fr;
        pointer-events: none;
    }
    .fl-timeline-staff {
        --staff-columns: 3;
        display: grid;
        grid-template-columns: repeat(var(--staff-columns), 1fr);
        border-bottom: 3px solid var(--accent-border);
    }
    .fl-timeline-staff-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        border-left: 1px solid var(--accent-border);
        padding: 0.5rem 0;
        pointer-events: none;
    }
    .fl-timeline-row {
        display: flex;
        position: relative;
        user-select: none;
    }
    :global(.fl-timeline-corner),
    :global(.fl-timeline-slot-header) {
        width: 6rem;
        /* border: 2px solid red; */
    }
    /* :global(.fl-timeline-corner.week),
    :global(.fl-timeline-slot-header.week) {
        width: 6rem;
    } */
    :global(.fl-timeline-slot-header.week) {
        display: flex;
        flex-direction: column;
        justify-content: left;
        /* gap: 0.25rem; */
    }
    .fl-timeline-corner {
        background-color: var(--border);
        border-bottom: 3px solid var(--accent-border);
    }
    .fl-timeline-slot-header > span {
        /* display: block; */
        font-size: 0.875rem;
        font-weight: 500;
        /* padding: 0.5rem; */
        /* text-align: center; */
    }
    .fl-timeline-slot-header span {
        padding: 0 0.5rem;
    }
    .fl-timeline-slot-header.day span {
        padding-top: 0.5rem;
    }
    .fl-timeline-slot-header.week span.date {
        font-size: 1rem;
        font-weight: 600;
        padding-top: 0.5rem;
    }
    .fl-timeline-slot-header.week span.day {
        opacity: 0.5;
        font-weight: 400;
    }
    :global(.fl-timeline-slot.selected) {
        background-color: var(--accent-pale);
    }
    .fl-timeline-slot.day {
        flex: 1;
        /* border-top: 1px solid var(--border-light); */
        height: 1.5rem;
        display: grid;
    }
    .fl-timeline-slot.week {
        flex: 1;
        /* border-top: 1px solid var(--border-light); */
        height: 12rem;
        display: grid;
    }
    .fl-timeline-row.fl-slot-start {
        border-top: 1px solid var(--accent-border);
        position: relative;
    }
    .fl-timeline-row > span.fl-slot-start-label {
        font-size: 1rem;
        font-weight: 600;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
    .fl-timeline-slot.fl-slot-start {
        border-top: none;
    }
    .fl-staff-slot {
        /* background-color: red; */
        border-top: 1px solid var(--border-light);
        border-left: 1px solid var(--accent-border);
        cursor: pointer;
        transition: all 100ms ease-in-out;
    }
    .fl-staff-slot:hover {
        background-color: var(--accent-pale);
    }
    .fl-staff-list {
        /* border: 1px solid red; */
        display: grid;
        gap: 0.5rem;
    }
    .fl-staff-toggle {
        position: relative;
        /* border: 1px solid red; */
    }
    .fl-staff-toggle input[type=checkbox] {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    .fl-staff-toggle label {
        padding: 0.5rem 0.75rem;
        background-color: var(--border-light);
        /* border: 1.5px solid var(--border-light); */
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 100ms ease-in-out;
    }
    .fl-staff-toggle label:hover {
        /* background-color: var(--accent-border); */
        /* border: 1.5px solid var(--accent-border); */
        box-shadow: var(--shadow);
    }
    .fl-staff-toggle input[type=checkbox]:checked + label {
        background-color: var(--accent-border);
        /* border-color: var(--accent); */
    }
    .fl-selection-box {
        position: absolute;
    }
</style>
