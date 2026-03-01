import { createCalendarData } from "./calendar.svelte";

let calendar = createCalendarData();
let appointment = $state({
    customer: '',
    date: '',
    email: '',
    id: '',
    phone: '',
    service: '',
    slot: '',
    time: '',
});

export const createAppointmentData  = () => {
    return {
        get customer () { return appointment.customer },
        get date () { return appointment.date },
        get email () { return appointment.email },
        get id () { return appointment.id },
        get phone () { return appointment.phone },
        get service () { return appointment.service },
        get slot () { return appointment.slot },
        get time () { return appointment.time },
        get values () { return appointment },

        set customer (value) { appointment.customer = value },
        set date (value) {
            appointment.date = value;
            appointment.slot = `${value} ${appointment.time}`;
        },
        set email (value) { appointment.email = value },
        set phone (value) { appointment.phone = value },
        set service (value) { appointment.service = value },
        set slot (value) {
            appointment.slot = value
            if (!value) { return; }

            let dt = new Date(value);
            // appointment.date = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
            appointment.date = calendar.parseDate(dt);
            // appointment.time = `${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
            appointment.time = calendar.parseTime(dt);
            console.log(`set slot appointment =>`, appointment);
        },
        set time (value) {
            appointment.time = value;
            // appointment.date = value;
            appointment.slot = `${appointment.date} ${value}`;
        },
        
        setValues(value) {
            console.log(`appointment setValues; value =>`, value);
            appointment.customer = value?.customer || '';
            appointment.email = value?.email || '';
            appointment.id = value?.id || '';
            appointment.phone = value?.phone || '';
            appointment.service = value?.service || '';
            appointment.slot = value?.slot || '';
            if (!appointment.slot) { return }

            let dt = new Date(appointment.slot);
            console.log(`appointment setValues; dt =>`, dt);
            appointment.date = calendar.parseDate(dt);
            // appointment.date = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate().toString().padStart(2, '0')}`;
            appointment.time = calendar.parseTime(dt);
            // appointment.time = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
            console.log(`appointment setValues; output =>`, appointment);
        }
    };
};