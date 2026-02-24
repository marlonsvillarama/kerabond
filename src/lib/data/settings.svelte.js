let settingsData = $state({
    startDay: '0600',
    startShift: '0830',
    endDay: '1900',
    endShift: '1730',
    interval: 30,
    weekStart: 0,
    daysOff: [ 0, 6 ]
});

const DAYS = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
];

const getWeekDays = () => {
    if (settingsData.weekStart === 1) {
        return [ ...DAYS.slice(1, 7), DAYS[0] ];
    }

    return DAYS.slice(0, 7);
};

export const createSettingsData = () => {
    return {
        get startDay () { return settingsData.startDay; },
        get startShift () { return settingsData.startShift; },
        get endDay () { return settingsData.endDay; },
        get endShift () { return settingsData.endShift; },
        get interval () { return settingsData.interval; },
        get weekStart () { return settingsData.weekStart; },
        get daysOff () { return settingsData.daysOff; },
        get weekDays () { return getWeekDays(); }

        // set startDay (value) { settingsData.startDay; },
        // set startShift (value) { return settingsData.startShift; },
        // set endDay (value) { return settingsData.endDay; },
        // set endShift (value) { return settingsData.endShift; },
        // set interval (value) { return settingsData.interval; }
    };
};