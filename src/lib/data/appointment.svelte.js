let appointment = $state({
    customer: '',
    date: '',
    email: '',
    id: '',
    phone: '',
    service: '',
    slot: '',
    time: ''
});

export const createAppointmentData  = () => {
    return {
        get customer () { return appointment.customer },
        get date () { return appointment.slot ? appointment.slot.split(' ')[0] : '' },
        get email () { return appointment.email },
        get id () { return appointment.id },
        get phone () { return appointment.phone },
        get service () { return appointment.service },
        get slot () { return appointment.slot },
        get time () { return appointment.slot ? appointment.slot.split(' ')[1] : '' },
        get values () { return appointment },

        set customer (value) { appointment.customer = value },
        set date (value) {
            appointment.date = value;
            appointment.slot = `${value} ${appointment.time}`;
        },
        set email (value) { appointment.email = value },
        set phone (value) { appointment.phone = value },
        set service (value) { appointment.service = value },
        set slot (value) { appointment.slot = value },
        set time (value) {
            appointment.date = value;
            appointment.slot = `${value} ${appointment.time}`;
        },
        
        setValues(value) {
            appointment.customer = value?.customer || '';
            appointment.email = value?.email || '';
            appointment.phone = value?.phone || '';
            appointment.service = value?.service || '';
            appointment.slot = value?.slot || '';
        }
    };
};