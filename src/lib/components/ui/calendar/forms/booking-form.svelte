<script>
    import { getContext } from "svelte";

    let {
        onclose
    } = $props();

    /**
     * Client name
     * Phone
     * Email
     * Service
     * Staff
     * Location
    */
    
</script>

<div class="fl-dlg fl-booking">
    <div>
        <div class="heading">New Booking</div>
        <div class="content-wrapper fl-full-scrollable">
            <div class="content">content</div>
        </div>
    </div>

    <div class="footer">
        <Button onclick={onclose}>Close</Button>
    </div>
</div>
    <!-- <div class="fl-timeline-dlg">
        -- <div> --
            <div class="heading flex-center between">
                <span>Tuesday, 23 June 2026 - 10:30 am</span>
                <Button Icon={X} flat={true} onclick={hideDrawer} />
            </div>
            <div class="content-wrapper">
                <div class="fl-sidebar">
                    <Field id="fld-client" label="Client">
                        <InputText id="fld-client" material={true} />
                    </Field>
                </div>
                <div class="content">content</div>
            </div>
        -- </div> --

        -- <div class="footer">
            <Button onclick={hideDrawer}>Close</Button>
        </div> --
    </div> -->

<style>
    .fl-booking {

    }
</style>
