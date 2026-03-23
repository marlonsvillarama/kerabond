import { supabase } from "$lib/supabaseClient";

export async function load () {
    let now = new Date();
    let startWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startWeek.setDate(startWeek.getDate() - now.getDay());
    console.log('startWeek', startWeek.toLocaleDateString('en-NZ'));

    let endWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    endWeek.setDate(endWeek.getDate() + 6 - now.getDay());
    console.log('endWeek', endWeek.toLocaleDateString('en-NZ'));

    const { data } = await supabase.from("s4_appointments");
        /* .select(`customer:s4_customers (
            id,
            name,
            email,
            phone
        )`); */
    return {
        appointments: data ?? []
    };
}