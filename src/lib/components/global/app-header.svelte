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
        <Button active={activeTab === '/'} flat={true} Icon={Calendar} onclick={() => goto('/')}>Calendar</Button>
        <Button active={activeTab.startsWith('/sales')} flat={true} Icon={DollarSign} onclick={() => goto('/sales')}>Sales</Button>
        <Button active={activeTab.startsWith('/reports')} flat={true} Icon={ChartLine} onclick={() => goto('/reports')}>Reports</Button>
        <Button active={activeTab.startsWith('/setup')} flat={true} Icon={Settings} onclick={() => goto('/setup')}>Setup</Button>
        <!-- <Select {items} id="top-list" style="width: 12rem;" /> -->
    </div>
    
    <!-- <div class="fl-user"></div> -->
    <div class="fl-app-header-controls flex-center">
        <Button flat={true} Icon={LogOut}>Log Out</Button>
        <!-- </div> -->
    </div>
</div>

<style>
    .fl-app-header {
        background-color: var(--white);
        border-bottom: 1px solid var(--border);
        padding: 0.625rem 1.25rem;
        /* padding-left: 1.25rem; */
    }
    .fl-company {
        font-size: 1.375rem;
        font-weight: 500;
        letter-spacing: -0.25px;
    }
    .fl-app-header-controls {
        gap: 1.25rem;
    }
    /* .fl-app-header-actions {
        gap: 0.5rem;
    } */
    /* .fl-app-header-actions {
        border: 1px solid red;
    } */
</style>
<!-- h:_&:JgKC9,Dm_h -->