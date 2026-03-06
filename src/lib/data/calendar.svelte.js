import { createSettingsData } from "./settings.svelte";

let settings = createSettingsData();

let calendarData = $state({
    activeItem: null,
    activeSlot: '',
    items: [
        { id: 1, slot: '2026-03-05 09:00', customer: 'Apple Villarama', service: 6, email: 'apple.v@gmail.com', phone: '0227000215' },
        { id: 2, slot: '2026-03-05 20:30', customer: 'Marlongst Villarama', service: 5, email: 'apple.v11@gmail.com', phone: '0227000222' },
        { id: 4, slot: '2026-03-05 11:30', customer: 'Apfel V', service: 3, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
        { id: 3, slot: '2026-02-27 10:30', customer: 'Marlonger Villaramer', service: 4, email: 'apple.v22@gmail.com', phone: '0227000217' },
        { id: 6, slot: '2026-03-06 11:30', customer: 'Apfel V', service: 4, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
        { id: 5, slot: '2026-03-06 09:30', customer: 'Apfel V', service: 5, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
    ],
    slot: '',
    blocks: [
        { id: 1, date: '2026-03-16', start: '06:00', end: '19:00' },
        { id: 1, date: '2026-03-16', start: '06:00', end: '19:00' },
        { id: 1, date: '2026-03-16', start: '06:00', end: '19:00' },
    ]
});


export const createCalendarData  = () => {
    return {
        get blocks () { return calendarData.blocks },
        get items () { return calendarData.items },
        get activeItem () { return calendarData.activeItem },
        get slot () { return calendarData.slot },

        set item (value) { calendarData.item = value },
        set items (value) { calendarData.items = value },
        set slot (value) {
            calendarData.slot = value;
            calendarData.activeItem = calendarData.items.find(b => b.slot === value);
            console.log(`createCalendarData slot > activeItem ==>`, calendarData.activeItem)
        },

        deleteBlock (id) {
            calendarData.blocks = calendarData.blocks.filter(b => b.id !== id);
        },

        deleteSlotItem (slot) {
            calendarData.items = calendarData.items.filter(b => b.slot !== slot)
        },

        isToday (value) {
            return settings.parseDate(new Date()) === settings.parseDate(value)
        },

        slotHasAppointment (slot) {
            let appointment = slots.find(s => s.value === slot);
            return !!appointment;
        },

        getItemById (id) {
            calendarData.activeItem = calendarData.items.find(b => b.id === id);
            console.log(`createCalendarData getItemById(${id}) ==>`, calendarData.activeItem)
        },

        getSlots (dt) {
            let output = [];
            let currentDay = new Date(
                dt.getFullYear(),
                dt.getMonth(),
                dt.getDate(),
                parseInt(settings.startDay.slice(0, 2)),
                parseInt(settings.startDay.slice(2))
            );

            do {
                let isBlockedSlot = false;
                items.forEach(b => {
                    if (parseInt(b.start) <= toTimeInt(currentDay) && parseInt(b.end) > toTimeInt(currentDay)) {
                        isBlockedSlot = true;
                    }
                });
                output.push({
                    value: settings.parseDateTime(currentDay),
                    disabled: (
                        (
                            toTimeInt(currentDay) < parseInt(startShift) ||
                            toTimeInt(currentDay) >= parseInt(endShift)
                        ) ||
                        settings.daysOff.indexOf(value.getDay()) >= 0 ||
                        isBlockedSlot === true
                    )
                });

                currentDay.setMinutes(currentDay.getMinutes() + interval);
                currentDay = new Date(
                    value.getFullYear(),
                    value.getMonth(),
                    value.getDate(),
                    currentDay.getHours(),
                    currentDay.getMinutes()
                );
                // console.log(`* > weekday day.getHours() = ${currentDay.getHours()}; endDay.slice = ${endDay.slice(0, 2)}`);
            } while (currentDay.getHours() < parseInt(endDay.slice(0, 2)));
            console.log('* weekday slots', output);

            return output;
        },

        getTimeFromSlot (slot) {
            let dt = new Date(slot);
            return dt.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: 'numeric' });
        },

        /* parseDate (dt) {
            return `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
        }, */

        /* parseDateTime (dt) {
            return `${this.parseDate(dt)} ${this.parseTime(dt)}`;
            // return `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
        }, */

        /* parseTime (dt) {
            return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        }, */

        updateItem (data) {
            console.log(`* calendar input data =>`, data);
            let slotItem = calendarData.items.find(b => b.slot === data.slot);

            if (slotItem) {
                console.log(`* calendar updating slotItem =>`, slotItem);
                for (const [k, v] of Object.entries(data)) {
                    console.log(`* calendar updating slotItem; k = "${k}"; v = "${v}"`);
                    if (k !== 'id') slotItem[k] = v;
                    if (k === 'date' || k === 'time') {
                        slotItem.slot = `${slotItem.date} ${slotItem.time}`;
                    }
                }
                calendarData.items = calendarData.items;
            }
            else {
                data.id = (new Date()).getTime();
                console.log(`* calendar adding new data =>`, data);
                calendarData.items.push(data);
                calendarData.items = calendarData.items;
            }
            console.log(`* calendar updateItem; new items =>`, calendarData.items);
        },
    };
};