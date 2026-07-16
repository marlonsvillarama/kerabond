import { supabase } from "$lib/supabaseClient";
import { getContext } from "svelte";

export async function load({ params }) {
    const id = params.slug;
    console.log('location id', id);

    const { data:location, error } = await supabase.from('kb_locations')
        .select(`
            created_at,
            is_active,
            name,
            street_1,
            street_2,
            city,
            region,
            country,
            is_primary,
            schedule,
            staff:kb_staff_locations (
                id,
                created_at,
                details:kb_staff (
                    id,
                    first_name,
                    is_active,
                    phone,
                    email,
                    review_count,
                    rating_ave
                )
            )
        `)
        .eq('id', id).single();
    const { data:staff, error:staffError } = await supabase.from('kb_staff')
        .select(`
            id,
            first_name,
            last_name,
            phone,
            email
        `)
        .eq('is_active', true)
        .order('first_name');

    return {
        location: location ?? {},
        staff: staff ?? []
    };
};
