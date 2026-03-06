let settingsData = $state({
    slotHeight: '2.5rem',
    startDay: '0600',
    startShift: '0830',
    endDay: '1900',
    endShift: '1730',
    interval: 30,
    weekStart: 0,
    daysOff: [ 0 ]
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

const getDayTimeSlots = () => {
    let startHour = settingsData.startDay.slice(0, 2);
    let endHour = settingsData.endDay.slice(0, 2);
    let now = new Date();
    let day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(startHour),
        0
    );

    let output = [];
    do {
        output.push({
            value: day,
            text: parseTime(day, true),
            time: parseTime(day)
        });
        day.setMinutes(day.getMinutes() + settingsData.interval);
    } while (day.getHours() < endHour);

    console.log('getDayTimeSlots output', output);
    return output;

};

const getWeekDays = () => {
    if (settingsData.weekStart === 1) {
        return [ ...DAYS.slice(1, 7), DAYS[0] ];
    }

    return DAYS.slice(0, 7);
};

const parseDate = (dt) => {
    return `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
};

const parseSlot = (dt) => {
    return `${parseDate(dt)} ${parseTime(dt)}`;
};

const parseTime = (dt, text = false) => {
    let hours = dt.getHours();
    let output = text === true ?
        `${hours > 12 ? hours - 12 : hours}:${dt.getMinutes().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}` :
        `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
    return output;
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
        get weekDays () { return getWeekDays(); },
        get timeSlots () { return getDayTimeSlots(); },
        get slotHeight () { return this.slotHeight },

        parseDate,
        parseSlot,
        parseTime
        // set startDay (value) { settingsData.startDay; },
        // set startShift (value) { return settingsData.startShift; },
        // set endDay (value) { return settingsData.endDay; },
        // set endShift (value) { return settingsData.endShift; },
        // set interval (value) { return settingsData.interval; }
    };
};