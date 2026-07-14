import { supabase } from "$lib/supabaseClient";
import { getContext } from "svelte";

export async function load({ params }) {
    const id = params.slug;

    const { data:service, error } = await supabase.from('kb_services')
        .select(`
            created_at,
            name,
            description,
            is_active,
            category,
            has_variants,
            variants:kb_service_variants (
                id,
                created_at,
                name,
                duration,
                price
            ),
            locations:kb_service_locations (
                id,
                created_at,
                detail:kb_locations (
                    id
                ),
                staff:kb_staff (
                    id
                )
            )
        `)
        .eq('id', id).single()
        .order('duration', {
            referencedTable: 'kb_service_variants'
        });
    const { data:locations, error:locationError } = await supabase.from('kb_locations')
        .select(`
            id,
            created_at,
            name,
            street_1,
            street_2,
            city,
            region,
            country
        `);
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
        locations: locations ?? [],
        service: service ?? null,
        staff: staff ?? []
    };
};
