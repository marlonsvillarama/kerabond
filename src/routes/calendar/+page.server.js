import { supabase } from "$lib/supabaseClient";
import { DateFormatter } from "$lib/modules/dates";

export async function load() {
    // const { data:locations } = await supabase.from('kb_locations').select();
    // const { data:services } = await supabase.from('kb_services').select();
    // const { data:staff } = await supabase.from('kb_staff').select();
    // const { data:variants } = await supabase.from('kb_service_variants').select();
    // const { data:staffServices } = await supabase.from('kb_service_staff').select();
    let todayDate = DateFormatter.toString(new Date());
    const { data:appointments } = await supabase.from('kb_appointments')
        .select(`
            id,
            service:kb_services ( id, name, duration ),
            staff:kb_staff ( id, first_name ),
            location:kb_locations ( id, name ),
            status:kb_appointment_status ( id, name )
            date,
            slot,
            notes,
            break_after
        `)
        .eq('date', todayDate);
    const { data:staff } = await supabase.from('kb_staff')
        .select(`
            id,
            first_name,
            last_name,
            phone,
            email,
            rating_ave,
            review_count
        `)
        .eq('is_active', true);
    const { data:locations } = await supabase.from('kb_locations')
        .select(`
            id,
            name,
            street_1,
            street_2,
            city,
            region
        `)
        .eq('is_active', true);

    return {
        appointments: appointments ?? [],
        locations: locations ?? [],
        staff: staff ?? []
    };
};
