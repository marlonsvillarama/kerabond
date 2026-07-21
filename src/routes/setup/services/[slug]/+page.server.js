import { supabase } from "$lib/supabaseClient";
import { getContext } from "svelte";

export async function load({ params }) {
    const id = params.slug;

    const { data:service, error } = await supabase.from('kb_services')
        .select(`
            id,
            created_at,
            name,
            description,
            is_active,
            category,
            has_variants,
            is_online,
            review_count,
            rating_ave,
            revenue_total,
            variants:kb_service_variants (
                id,
                name,
                duration,
                price
            ),
            locations:kb_service_locations (
                id,
                details:kb_location (
                    id,
                    name
                )
            )
        `)
        .eq('id', id).single()
        .order('duration', {
            referencedTable: 'kb_service_variants'
        });
                // details:kb_location (
                //     id,
                //     name,
                //     street_1,
                //     street_2,
                //     city,
                //     assigned:kb_staff_locations (
                //         id,
                //         staff:kb_staff (
                //             id,
                //             first_name
                //         )
                //     )
                // )
                // assigned:kb_staff_locations (
                //     id,
                //     first_name
                // )
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
            email,
        `)
        .eq('is_active', true)
        .order('first_name');

    return {
        locations: locations ?? [],
        service: service ?? null,
        staff: staff ?? []
    };
};
