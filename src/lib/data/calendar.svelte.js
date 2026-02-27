let calendarData = $state({
    block: null,
    slot: ''
});

export const createCalendarData  = () => {
    return {
        get block () { return calendarData.block },
        get slot () { return calendarData.slot },

        set block (value) { calendarData.block = value },
        set slot (value) { calendarData.slot = value }
    };
};