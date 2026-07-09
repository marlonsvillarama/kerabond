import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data:staff } = await supabase.from('kb_staff').select();
    const { data:locations } = await supabase.from('kb_locations').select();
    const { data:staffLocations } = await supabase.from('kb_staff_locations').select();

    return {
        staff: staff ?? [],
        locations: locations ?? [],
        staffLocations: staffLocations ?? []
    };
};
