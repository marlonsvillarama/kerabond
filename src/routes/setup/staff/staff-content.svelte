<script>
    import { supabase } from "$lib/supabaseClient";
</script>

<div class="fl-full-scrollable fl-page-content">
    {#snippet controls()}
        <InputSearch />
        <button type="button" command="show-modal" commandfor="fl-staff-new" class="fl-btn-new">
            <Plus size={16} />Add staff
        </button>
    {/snippet}

    <div class="fl-page-content">
    {#each filteredStaff as staff}

        <StaffCard data={staff}
            // ondelete={deleteStaff}
            // onedit={() => {}}
            // onselect={toggleOne}
        />
    {/each}
    </div>
</div>

<style>
</style>
