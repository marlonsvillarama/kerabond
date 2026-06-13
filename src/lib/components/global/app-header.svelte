<script>
    import { Search, User } from "@lucide/svelte";
    import Button from "$lib/components/controls/button.svelte";
    import InputSearch from "$lib/components/controls/input-search.svelte";
    import InputText from "$lib/components/controls/input-text.svelte";
</script>

<div class="fl-app-header flex-center between">
    <div class="fl-company">Chantara Massage</div>
    <div class="fl-app-header-controls flex-center">
        <InputSearch id="global-search" />
        <div class="fl-app-header-actions flex-center">
            <Button>
                <User size={24} class="" />
            </Button>
        </div>
    </div>
</div>

<style>
    .fl-app-header {
        padding: 0.625rem 1.25rem;
    }
    .fl-company {
        font-size: 1.375rem;
        font-weight: 500;
        letter-spacing: -0.25px;
    }
    .fl-app-header-controls,
    .fl-app-header-actions {
        gap: 1.5rem;
    }
    /* .fl-app-header-actions {
        border: 1px solid red;
    } */
</style>
