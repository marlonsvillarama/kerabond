let calendarData = $state({
    selectedItem: null,
    items: [
        { id: 1, slot: '2026-02-26 09:00', customer: 'Apple Villarama', service: 1, email: 'apple.v@gmail.com', phone: '0227000215' },
        { id: 2, slot: '2026-02-26 11:30', customer: 'Marlongst Villarama', service: 5, email: 'apple.v11@gmail.com', phone: '0227000222' },
        { id: 3, slot: '2026-02-27 10:30', customer: 'Marlonger Villaramer', service: 4, email: 'apple.v22@gmail.com', phone: '0227000217' },
        { id: 4, slot: '2026-02-27 11:30', customer: 'Apfel V', service: 3, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
        { id: 5, slot: '2026-03-06 09:30', customer: 'Apfel V', service: 5, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
        { id: 6, slot: '2026-03-06 11:30', customer: 'Apfel V', service: 4, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
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
        get selectedItem () { return calendarData.selectedItem },
        get slot () { return calendarData.slot },

        set items (value) { calendarData.items = value },
        set item (value) { calendarData.item = value },
        set slot (value) {
            calendarData.slot = value;
            calendarData.selectedItem = calendarData.items.find(b => b.slot === value);
            console.log(`createCalendarData slot > selectedItem ==>`, calendarData.selectedItem)
        },

        deleteBlock (id) {
            calendarData.blocks = calendarData.blocks.filter(b => b.id !== id);
        },

        // TODO Implement updateBlock
        updateBlock (id) {},

        deleteSlotItem (slot) {
            calendarData.items = calendarData.items.filter(b => b.slot !== slot)
        },

        updateSlotItem (data) {
            console.log(`* calendar input data =>`, data);
            let slotItem = calendarData.items.find(b => b.slot === data.slot);

            if (slotItem) {
                console.log(`* calendar updating slotItem =>`, slotItem);
                for (const [k, v] of Object.entries(data)) {
                    console.log(`* calendar updating slotItem; k = "${k}"; v = "${v}"`);
                    if (k !== 'id') slotItem[k] = v;
                }
            }
            else {
                data.id = (new Date()).getTime();
                console.log(`* calendar adding new data =>`, data);
                calendarData.items.push(data);
                calendarData.items = calendarData.items;
            }
            console.log(`* calendar updateSlotItem; new items =>`, calendarData.items);
        },

        parseDate (dt) {
            return `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
        },

        parseDateTime (dt) {
            return `${this.parseDate(dt)} ${this.parseTime(dt)}`;
            // return `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
        },

        parseTime (dt) {
            return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        }

    };
};