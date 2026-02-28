let calendarData = $state({
    selectedBlock: null,
    blocks: [
        { id: 1, slot: '2026/2/26 10:00', customer: 'Apple Villarama', service: 1, email: 'apple.v@gmail.com', phone: '0227000215' },
        { id: 2, slot: '2026/2/26 11:30', customer: 'Marlongst Villarama', service: 5, email: 'apple.v11@gmail.com', phone: '0227000222' },
        { id: 3, slot: '2026/2/27 10:30', customer: 'Marlonger Villaramer', service: 4, email: 'apple.v22@gmail.com', phone: '0227000217' },
        { id: 4, slot: '2026/2/27 11:30', customer: 'Apfel V', service: 3, email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
    ],
    slot: ''
});

export const createCalendarData  = () => {
    return {
        get blocks () { return calendarData.blocks },
        get selectedBlock () { return calendarData.selectedBlock },
        get slot () { return calendarData.slot },

        set blocks (value) { calendarData.blocks = value },
        set block (value) { calendarData.block = value },
        set slot (value) {
            calendarData.slot = value;
            calendarData.selectedBlock = calendarData.blocks.find(b => b.slot === value);
            console.log(`createCalendarData slot > selectedBlock`, calendarData.selectedBlock);
        },

        deleteSlotBlock (slot) {
            calendarData.blocks = calendarData.blocks.filter(b => b.slot !== slot)
        },
        updateSlotBlock (data) {
            console.log(`* calendar input data =>`, data);
            let selectedBlock = calendarData.blocks.find(b => b.slot === data.slot);

            if (selectedBlock) {
                console.log(`* calendar updating selectedBlock =>`, selectedBlock);
                for (const [k, v] of Object.entries(data)) {
                    if (k !== 'id') selectedBlock[k] = v;
                }
            }
            else {
                let maxId = Math.max(...calendarData.blocks.map(b => b.id));
                data.id = maxId + 1;
                console.log(`* calendar adding new data =>`, data);
                calendarData.blocks.push(data);
                calendarData.blocks = calendarData.blocks;
            }
            console.log(`* calendar updateSlotBlock; new blocks =>`, calendarData.blocks);
        },
    };
};