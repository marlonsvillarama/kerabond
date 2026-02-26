let calendarData = $state({
    slot: ''
});

export const createCalendarData  = () => {
    return {
        get slot () { return calendarData.slot },

        set slot (value) { calendarData.slot = value }
    };
};