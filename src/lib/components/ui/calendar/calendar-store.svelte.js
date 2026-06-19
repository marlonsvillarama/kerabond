// const formatDate = (dateObject) => {
//     return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
// };

// const parseDate = (dateValue) => new Date(dateValue);

// export const calendarState = $state({
//     date: new Date(),
//     mode: 'month'
// });
// export const dateDisplay = $derived(`${calendarState.date.toLocaleDateString('en-NZ', { weekday: 'long' })} - ${calendarState.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);


export function CalendarStore () {
    let date = $state(new Date());
    let dateDisplay = $derived(`${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
                ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    let mode = $state('month');

    return {
        get date () { return date },
        get dateDisplay () { return dateDisplay
        },
        get mode () { return mode },

        set date (value) {
            let type = Object.prototype.toString.call(value);
            date = type === '[object Object]' ? formatDate(value) : value;
            console.log('setting CalendarStore date', date);
        },
        set mode (value) { mode = value.toLowerCase() },

        displayDate () {
            return `${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
                ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`
        },
        formatDate (dateObject) {
            return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
        },
        parseDate (dateValue) { return new Date(dateValue) },
    };
}

// // export const calendarDate = $state(new Date());
// // export const calendarMode = $state('month');

// export class CalendarStore {
//     date = $state(new Date());
//     mode = $state('month');

//     dateDisplay = $derived(`${this.date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
//         ${this.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    
//     // constructor() {
//     //     this.date = new Date();
//     //     this.mode = 'month';
//     // }
// }
