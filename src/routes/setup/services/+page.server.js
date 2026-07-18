import { supabase } from "$lib/supabaseClient";
import { getContext } from "svelte";

export async function load() {
    // let tenant = getContext('TENANT');
    
    const { data:locations } = await supabase.from('kb_locations').select();
    const { data:services } = await supabase.from('kb_services').select();
    const { data:staff } = await supabase.from('kb_staff').select();
    const { data:variants } = await supabase.from('kb_service_variants').select();
    const { data:staffServices } = await supabase.from('kb_service_staff').select();

    return {
        locations: locations ?? [],
        services: services ?? [],
        staff: staff ?? [],
        staffServices: staffServices ?? [],
        variants: variants ?? [],
    };
};
