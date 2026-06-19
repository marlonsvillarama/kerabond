// const formatDate = (dateObject) => {
//     return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
// };

// const parseDate = (dateValue) => new Date(dateValue);

// export const calendarStore = $state({
//     date: new Date(),
//     mode: 'month',

//     get dateDisplay () {
//         return `${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
//                 ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`
//     }
// });
// export const dateDisplay = $derived(`${calendarState.date.toLocaleDateString('en-NZ', { weekday: 'long' })} - ${calendarState.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);


export function CalendarStore () {
    let date = $state(new Date());
    // let dateDisplay = $derived(`${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
    //             ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    let mode = $state('day');

    return {
        date () { return date },
        mode () { return mode },
        // get date () { return date.value },
        dateDisplay () { return `${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
                ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`
        },
        // get mode () { return mode.value },

        // set date (value) {
        //     let type = Object.prototype.toString.call(value);
        //     date.value = type === '[object Object]' ? value : this.parseDate(value);
        //     console.log('store; setting CalendarStore date', date.value);
        // },
        updateDate (value) {
            let type = Object.prototype.toString.call(value);
            date = type === '[object Object]' ? value : this.parseDate(value);
            console.log('store; setting CalendarStore date', thisdate);
        },
        // set mode (value) {
        //     mode.value = value.toLowerCase();
        //     // date = this.parseDate(this.formatDate(date));
        //     console.log(`store; mode = ${mode.value}; date ==>>`, date.value);
        // },
        updateMode (value) {
            mode = value.toLowerCase();
            // date = this.parseDate(this.formatDate(date));
            console.log(`store; mode = ${mode}; date ==>>`, date);
        },

        // displayDate () {
        //     return `${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
        //         ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`
        // },
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
