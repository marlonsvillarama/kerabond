<script>
    import {
        Calendar,
        ChartLine,
        DollarSign,
        Home,
        IdCardLanyard,
        Tag,

        CircleQuestionMark,
        LogOut,
        Plus,
        Search,
        Settings,
        User
    } from "@lucide/svelte";

    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import Button from "$lib/components/ui/button.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import InputText from "$lib/components/ui/input-text.svelte";
    import Select from "$lib/components/ui/select.svelte";

    let items = [
        { value: 1, text: "First Pick" },
        { value: 2, text: "Second Choice" },
        { value: 3, text: "Third Option" },
    ];

    let activeTab = $derived(page.url.pathname);
</script>

<div class="fl-app-header flex-center between">
    <div class="fl-company">Studio4 Hair Salon</div>

    <div class="fl-app-header-controls flex-center">
        <!-- <InputSearch id="global-search" /> -->

        <!-- <div class="fl-app-header-actions flex-center"> -->
            <!-- <Button flat={true} Icon={Plus} /> -->
        <a href="/calendar" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/calendar')}
            class:fl-app-header-tab-active={activeTab.startsWith('/calendar')}
        >Calendar</a>
        <a href="/sales" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/sales')}
            class:fl-app-header-tab-active={activeTab.startsWith('/sales')}
        >Sales</a>
        <a href="/reports" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/reports')}
            class:fl-app-header-tab-active={activeTab.startsWith('/reports')}
        >Reports</a>
        <a href="/setup" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/setup')}
            class:fl-app-header-tab-active={activeTab.startsWith('/setup')}
        >Setup</a>
    </div>
    
    <!-- <div class="fl-user"></div> -->
    <div class="fl-app-header-controls flex-center">
        <button type="button" class="btn-logout">
            <LogOut size={16} />Log Out
        </button>
        <!-- </div> -->
    </div>
</div>

<style>
    .fl-app-header {
        background-color: var(--darker);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 0 1.25rem;
    }
    .fl-company {
        color: var(--white);
        font-size: 1.375rem;
        font-weight: 500;
        /* letter-spacing: -0.25px; */
    }
    .fl-app-header-controls {
        font-size: 0.875rem;
        gap: 1.25rem;
    }
    .fl-app-header-controls:nth-child(2) {
        justify-content: center;
    }
    .fl-app-header-controls:last-child {
        justify-content: end;
    }
    .fl-app-header-tab,
    :global(.fl-app-header-tab-active) {
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem 1.5rem;
        text-decoration: none;
        transition: all 100ms ease-in-out;
    }
    .fl-app-header-tab {
        color: var(--lighter);
        border-top: 4px solid var(--darker);
    }
    :global(.fl-app-header-tab:not(.fl-app-header-tab-active):hover) {
        border-top: 4px solid var(--primary-lighter);
    }
    :global(.fl-app-header-tab-active) {
        color: var(--darkest);
        background-color: var(--lighter);
        border-top: 4px solid var(--primary);
    }
    button.btn-logout {
        background-color: transparent;
        border: none;
        border-radius: var(--border-radius);
        color: var(--white);
        cursor: pointer;
        display: flex;
        justify-content: center;
        font-size: 0.875rem;
        gap: 0.5rem;
        padding: 0.6rem;
        position: relative;
        transition: all 100ms ease-in-out;
    }
    button.btn-logout:hover {
        background-color: var(--primary);
    }
</style>
<!-- h:_&:JgKC9,Dm_h -->