import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data } = await supabase.from('kb_staff').select();
    return {
        staff: data ?? []
    };
};
