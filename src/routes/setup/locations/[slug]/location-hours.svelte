<script>
    import { onMount, getContext, setContext } from "svelte";
    import { ArrowRight } from "@lucide/svelte";
    import Select from "$lib/components/ui/select.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        onchange,
        data = $bindable()
    } = $props();

    let globalPrefs = getContext('GLOBAL');
    // console.log('globalPrefs', globalPrefs);

    let weekDays = $state([
        { day: 0, name: 'Sunday' },
        { day: 1, name: 'Monday' },
        { day: 2, name: 'Tuesday' },
        { day: 3, name: 'Wednesday' },
        { day: 4, name: 'Thursday' },
        { day: 5, name: 'Friday' },
        { day: 6, name: 'Saturday' },
    ]);

    onMount(() => {
        let days = (data || '').split(',');
        // console.log('days', days);

        if (days.length <= 0) {
            weekDays = weekDays.map(d => {
                return { ...d, is_active: false }
            });
        }

        weekDays = weekDays.map(wd => {
            let weekDay = days.find(d => d.indexOf(`${wd.day}:`) === 0);
            if (!weekDay) {
                return { ...wd, is_active: false }
            }

            let parts = weekDay.split(':');
            if (parts.length < 2 || !parts[1]) {
                return { ...wd, is_active: false }
            }

            let bizHours = parts[1].split('-');
            return {
                ...wd,
                is_active: true,
                start: bizHours[0],
                end: bizHours[1]
            };
        });
        // console.log('*** onMount weekDays', weekDays);
    });

    let timeSlotOptions = $derived.by(() => {
        let output = [];
        let today = new Date();
        let startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            parseInt(globalPrefs.start_hour.slice(0, 2)),
            parseInt(globalPrefs.start_hour.slice(2))
        );

        let endHour = parseInt(globalPrefs.end_hour.slice(0, 2));
        let endMinutes = parseInt(globalPrefs.end_hour.slice(2));

        do {
            output.push({
                text: (new Intl.DateTimeFormat(
                    'en-NZ',
                    { hour: '2-digit', minute: '2-digit', hour12: true }
                )).format(startDate).toUpperCase(),
                value: `${startDate.getHours().toString().padStart(2, '0')}${startDate.getMinutes().toString().padStart(2, '0')}`
            });
            startDate.setMinutes(startDate.getMinutes() + 15);
            // console.log('startDate', startDate);
        } while (
            startDate.getHours() < endHour ||
            (startDate.getHours() === endHour && startDate.getMinutes() <= endMinutes)
        );

        // console.log('timeOptions', output);
        return output;
    });
    setContext('TIME_SLOTS', timeSlotOptions);

    const confirmToggleDay = (e) => {
        console.log('confirmToggleDay e', e.target.id);
        let idParts = e.target.id.split('-');
        let index = idParts[1];

        if (weekDays[index].is_active !== true) { return; }
        if (!confirm(`Close this location on ${weekDays[index].name}s?`)) {
            e.preventDefault();
            return;
        }
    };

    const toggleDay = (day) => {
        let index = data.findIndex(d => d.day.toString() === day.toString());
        console.log(`*** toggleDay ${day} BEFORE is_active = ${weekDays[index].is_active}`, weekDays[index].is_active);

        // let isConfirmed = confirm(`Close this location on ${weekDays[index].name}s?`);
        // console.log('*** toggleDay > isConfirmed', isConfirmed);
        // console.log(`*** toggleDay ${day} AFTER is_active = ${weekDays[index].is_active}`, weekDays[index].is_active);
        // if (!isConfirmed) { return; }

        weekDays[index].is_active = !weekDays[index].is_active;
        weekDays[index].start = weekDays[index].is_active ? globalPrefs.start_hour : null;
        weekDays[index].end = weekDays[index].is_active ? globalPrefs.end_hour : null;
        console.log(`*** toggleDay ${day} AFTER is_active = ${weekDays[index].is_active}`, weekDays[index].is_active);
        updateSchedule();
    };

    const formatSchedule = () => {
        data = weekDays.map(d => {
            let hours = (d.is_active) ? `${d.start || ''}-${d.end || ''}` : '';
            // console.log(`. > hours = ${hours}`);
            return `${d.day}${hours ? `:${hours}` : ''}`;
        }).join(',');
        console.log('*** locationHours > formatSchedule data', data);
    };

    const updateSchedule = () => {
        // console.log('updateSchedule weekDays', weekDays);
        formatSchedule();
        onchange();
    };
</script>

<div class="fl-loc-hours">
    {#each weekDays as weekDay, i}
        {JSON.stringify(weekDay)}
        <div class="row">
            <div class="day" data-day={weekDays[i].day}>
                <div class="avatar">{weekDays[i].name[0]}</div>
                <div>{weekDays[i].name}</div>
            </div>
            <Toggle id="day_active-{weekDays[i].day}"
                bind:checked={weekDays[i].is_active}
                onclick={confirmToggleDay}
                ontoggle={() => toggleDay(weekDays[i].day)}
            />
            <div class="controls">
                <Select bind:value={weekDays[i].start} options={timeSlotOptions} onchange={updateSchedule} />
                <ArrowRight size={16} />
                <Select bind:value={weekDays[i].end} options={timeSlotOptions} onchange={updateSchedule} />
            </div>
        </div>
    {/each}
</div>

<style>
    .fl-loc-hours {
        display: flex;
        flex-direction: column;
        /* gap: 0.25rem; */
        /* border: 1px solid red; */
    }
    .fl-loc-hours > .row {
        background-color: var(--lightest);
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        /* border:  1px solid red; */
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
        /* margin-left: 1rem; */
    }
    .fl-loc-hours > .row:nth-child(odd) {
        background-color: var(--lighter);
    }
    .fl-loc-hours > .row > .day {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .fl-loc-hours > .row > .day > .avatar {
        background-color: var(--primary);
        border-radius: 50%;
        color: var(--white);
        height: 1.75rem;
        width: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-loc-hours > .row > .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    /* .fl-loc-hours > .row > .controls > input[type=text] {
        border: 1px solid red;
        width: 3rem;
    } */
    /* .fl-loc-hours > .row > .controls > .header {
        color: var(--darker);
        font-weight: 600;
    } */
</style>
