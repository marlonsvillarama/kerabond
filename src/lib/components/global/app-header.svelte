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
    import Button from "$lib/components/controls/button.svelte";
    import InputSearch from "$lib/components/controls/input-search.svelte";
    import InputText from "$lib/components/controls/input-text.svelte";
    import Select from "$lib/components/controls/select.svelte";

    let items = [
        { value: 1, text: "First Pick" },
        { value: 2, text: "Second Choice" },
        { value: 3, text: "Third Option" },
    ];

    let activeTab = $derived(page.url.pathname);
    const navigateToPage = (url) => {
        // alert(`navigating to ${url}`);
        goto(url);
    };
</script>

<div class="fl-app-header flex-center between">
    <div class="fl-company">Chantara Massage</div>

    <div class="fl-app-header-controls flex-center">
        <!-- <InputSearch id="global-search" /> -->

        <!-- <div class="fl-app-header-actions flex-center"> -->
            <!-- <Button flat={true} Icon={Plus} /> -->
        <Button active={activeTab === '/'} flat={true} Icon={Calendar} onclick={() => navigateToPage('/')}>Calendar</Button>
        <!-- <Button flat={true} Icon={User} onclick={() => navigateToPage('/clients')}></Button> -->
        <Button active={activeTab.startsWith('/sales')} flat={true} Icon={DollarSign} onclick={() => navigateToPage('/sales')}>Sales</Button>
        <!-- <Button flat={true} Icon={IdCardLanyard} onclick={() => navigateToPage('/staff')}></Button> -->
        <!-- <Button flat={true} Icon={Tag} onclick={() => navigateToPage('/inventory')}></Button> -->
        <Button active={activeTab.startsWith('/reports')} flat={true} Icon={ChartLine} onclick={() => navigateToPage('/reports')}>Reports</Button>

        <!-- <Button flat={true}>
        <User size={24} />
        </Button> -->
        <Button active={activeTab.startsWith('/setup')} flat={true} Icon={Settings} onclick={() => navigateToPage('/setup')}>Setup</Button>
        <!-- <Select {items} id="top-list" style="width: 12rem;" /> -->
    </div>
    
    <!-- <div class="fl-user"></div> -->
    <div class="fl-app-header-controls flex-center">
        <!-- <Button flat={true} Icon={CircleQuestionMark}>Help</Button> -->
        <Button flat={true} Icon={LogOut}>Log Out</Button>
        <!-- </div> -->
    </div>
</div>

<style>
    .fl-app-header {
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
