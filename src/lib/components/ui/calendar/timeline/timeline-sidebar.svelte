<script>
    import { CalendarCog, Check, Eye, EyeClosed } from "@lucide/svelte";
    import { getContext } from "svelte";
    import Button from "../../button.svelte";

    let calendarState = getContext('CALENDAR_STATE');
    let staffState = getContext('STAFF_STATE');
    console.log('sidebar; staffState', staffState);
    // let allStaff = $state([
    //     { id: 1, name: 'John', initials: 'JF', image: '/images/avatars/jf.png' },
    //     { id: 2, name: 'Apple', initials: 'AV', image: '/images/avatars/av.png' },
    //     { id: 3, name: 'Marlong2', initials: 'MV', image: 'images/avatars/mv2.png' },
    //     { id: 4, name: 'Marlong', initials: 'MV' },
    // ]);

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
    staffState = sortByKey(staffState, 'name');

    // let allStaff = sortByKey(
    //     allStaff.map(d => {
    //         return {
    //             ...d, checked: !!d.checked
    //         };
    //     }),
    //     'name'
    // );

    // let timelineStaff = $derived(sortByKey(allStaff.filter(d => d.checked === true), 'name'));

    const updateTimelineStaff = (id) => {
        console.log(`updateTimelineStaff; id = ${id}`);
        // let staff = allStaff.find(d => d.id === id);
        let index = calendarState.selectedStaff.indexOf(id);

        if (index >= 0) {
            calendarState.selectedStaff = calendarState.selectedStaff.filter(d => d !== id);
            console.log('calendarState.selectedStaff', calendarState.selectedStaff);
            return;
        }

        calendarState.selectedStaff.push(id);
        calendarState.selectedStaff = sortByKey(calendarState.selectedStaff);
        // timelineStaff.push(staff);
        // timelineStaff = sortByKey(timelineStaff, 'name');
    }
</script>

<div class="fl-timeline-sidebar">
    <div class="fl-staff-list">
        {#each staffState as staff}
        <div class="fl-staff-toggle">
            <input type="checkbox" name="staff-{staff.id}" id="staff-{staff.id}"
                checked={calendarState.selectedStaff.indexOf(staff.id) >= 0}
                onchange={() => updateTimelineStaff(staff.id)}>
            <label for="staff-{staff.id}" class="flex-center between">
                <span>{staff.name}</span>
                {#if calendarState.selectedStaff.indexOf(staff.id) >= 0}
                <Eye size={16} />
                {:else}
                <EyeClosed size={16} />
                {/if}
            </label>
        </div>
        {/each}
    </div>
    <div class="fl-timeline-actions">
        <Button Icon={CalendarCog} class="w-full border">Timeline Settings</Button>
    </div>
</div>

<style>
    .fl-timeline-sidebar {
        width: 16rem;
        padding: 1rem;
        background-color: var(--white);
        border: 1px solid var(--border-light);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* box-shadow: var(--shadow); */
    }
    :global(.fl-timeline-sidebar > *) {
        /* flex: 1; */
        width: 100%;
    }
    :global(.fl-staff-sidebar > *:not(:last-child)) {
        margin-bottom: 0.5rem;
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
        /* background-color: var(--border-light); */
        border: 1px solid var(--border-light);
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 100ms ease-in-out;
    }
    /* .fl-staff-toggle label:hover { */
        /* background-color: var(--accent-border); */
        /* border: 1.5px solid var(--accent-border); */
        /* box-shadow: var(--shadow); */
    /* } */
    .fl-staff-toggle input[type=checkbox]:checked + label {
        background-color: var(--accent-pale);
        /* background-color: var(--accent-border); */
        border: 1px solid var(--accent-pale);
    }
    /* .fl-timeline-actions {
        border: 2px solid green;
    } */
</style>
