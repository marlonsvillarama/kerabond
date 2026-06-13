<script>
    import {
        Calendar,
        ChartLine,
        DollarSign,
        Home,
        IdCardLanyard,
        Tag,
        User
    } from "@lucide/svelte";

    import { goto } from "$app/navigation";
    import Button from "$lib/components/controls/button.svelte";

    const navigateToPage = (url) => {
        alert(`navigating to ${url}`);
        goto(url);
    };
</script>

<div class="fl-cmd-header flex-center">
    <!-- <Button flat={true}>
        <Home size={20} />
        Home
    </Button> -->
    <!-- {@render navItem("Home", Home, gotoHome)} -->
    <!-- {@render navItem("Clients", User, gotoHome)} -->
    <!-- {@render navItem("Invoices", DollarSign, gotoHome)} -->
    <Button flat={true} Icon={Calendar} onclick={() => navigateToPage('/')}></Button>
    <Button flat={true} Icon={User} onclick={() => navigateToPage('/clients')}></Button>
    <Button flat={true} Icon={DollarSign} onclick={() => navigateToPage('/sales')}></Button>
    <Button flat={true} Icon={IdCardLanyard} onclick={() => navigateToPage('/staff')}></Button>
    <Button flat={true} Icon={Tag} onclick={() => navigateToPage('/inventory')}></Button>
    <Button flat={true} Icon={ChartLine} onclick={() => navigateToPage('/reports')}></Button>
</div>

{#snippet navItem(label, Icon, onclick)}
<button class="fl-cmd flex-center" {onclick}>
    <Icon size={20} />
    {label}
</button>
{/snippet}

<style>
    .fl-cmd-header {
        /* border-bottom: 0.25rem solid var(--accent); */
        gap: 0.375rem;
        /* padding: 0 1.5rem; */
        padding: 0.25rem 1rem;
    }
    .fl-cmd {
        background-color: var(--ivory);
        border: 0;
        /* border-radius: 0.375rem; */
        cursor: pointer;
        font-size: 1rem;
        gap: 0.5rem;
        /* padding: 0.4rem 0.5rem 0.375rem 0.5rem; */
        padding: 0.625rem 1.25rem;
        position: relative;
        transition: all 100ms ease-in-out;
    }
    .fl-cmd:hover {
        background-color: var(--accent);
        color: var(--white);
    }
</style>
