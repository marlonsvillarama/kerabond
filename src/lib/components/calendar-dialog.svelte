<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    let {
        open = $bindable(),
        slot = null
    } = $props();

    let settings = createSettingsData();
    let calendar = createCalendarData();
</script>

<dialog class="day-dialog" {open}>
    <div class="dlg-header">
        <div class="dlg-title">
            <span>Appointment Details</span>
            <i class="ph ph-x"></i>
        </div>
        <span class="dlg-desc">{!!slot ? 'Create' : 'Update'} your appointment details here</span>
    </div>
    <span>{slot}</span>
</dialog>

<style>
    .day-dialog {
        padding: 0.75rem 1.25rem;
        /* width: 20rem;
        height: 10rem; */
        top: 35%;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid var(--border-lightest);
        border-radius: 0.5rem;
        outline: 0;
        width: 30rem;
    }
    .dlg-header {
        display: grid;
        gap: 0rem;
    }
    .dlg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dlg-title > span {
        font-size: 1rem;
        font-weight: 600;
    }
</style>