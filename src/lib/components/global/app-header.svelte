<script>
    import {
        Calendar,
        ChartLine,
        CircleUser,
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
    import Select from "$lib/components/ui/select-OLD.svelte";

    let items = [
        { value: 1, text: "First Pick" },
        { value: 2, text: "Second Choice" },
        { value: 3, text: "Third Option" },
    ];

    let activeTab = $derived(page.url.pathname);
</script>

<div class="fl-app-header flex-center between">
    <div class="fl-company">Chantara Massage</div>

    <div class="fl-app-header-tabs flex-center">
        <!-- <InputSearch id="global-search" /> -->

        <!-- <div class="fl-app-header-actions flex-center"> -->
            <!-- <Button flat={true} Icon={Plus} /> -->
        <a href="/calendar" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/calendar')}
            class:fl-app-header-tab-active={activeTab.startsWith('/calendar')}
        ><Calendar size={16} />Calendar</a>
        <a href="/sales" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/sales')}
            class:fl-app-header-tab-active={activeTab.startsWith('/sales')}
        ><DollarSign size={16} />Sales</a>
        <a href="/reports" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/reports')}
            class:fl-app-header-tab-active={activeTab.startsWith('/reports')}
        ><ChartLine size={16} />Reports</a>
        <a href="/setup" data-sveltekit-reload
            class:fl-app-header-tab={!activeTab.startsWith('/setup')}
            class:fl-app-header-tab-active={activeTab.startsWith('/setup')}
        ><Settings size={16} />Setup</a>
    </div>
    
    <!-- <div class="fl-user"></div> -->
    <div class="fl-app-header-controls flex-center">
        <button type="button" class="btn-logout">
            <CircleUser size={28} />
            <!-- <LogOut size={16} />Log Out -->
        </button>
        <!-- </div> -->
    </div>
</div>

<style>
    .fl-app-header {
        /* background-color: var(--darker); */
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 0.375rem 1rem;
        border-bottom: 1px solid var(--light);
    }
    .fl-company {
        color: var(--darker);
        font-size: 1.25rem;
        font-weight: 600;
        /* letter-spacing: -0.25px; */
    }
    .fl-app-header-tabs,
    .fl-app-header-controls {
        font-size: 0.875rem;
        gap: 1.25rem;
        /* border: 1px solid red; */
    }
    .fl-app-header > :nth-child(2) {
        justify-content: center;
    }
    .fl-app-header > :last-child {
        justify-content: end;
    }
    .fl-app-header-tab,
    :global(.fl-app-header-tab-active) {
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.375rem 0.625rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        transition: all 100ms ease-in-out;
    }
    .fl-app-header-tab {
        color: var(--dark);
        border-bottom: 4px solid transparent;
    }
    :global(.fl-app-header-tab:not(.fl-app-header-tab-active):hover) {
        border-bottom: 4px solid var(--light);
    }
    :global(.fl-app-header-tab-active) {
        color: var(--darkest);
        /* background-color: var(--lighter); */
        border-bottom: 4px solid var(--primary);
    }
    button.btn-logout {
        background-color: transparent;
        border: none;
        border-radius: var(--border-radius);
        /* color: var(--white); */
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
        background-color: var(--light);
    }
</style>
<!-- h:_&:JgKC9,Dm_h -->