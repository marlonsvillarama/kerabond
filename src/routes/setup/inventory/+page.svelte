<script>
    import { Plus } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import Drawer from "$lib/components/ui/drawer.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";

    let openDrawer = $state(false);

    const newProduct = () => {
        console.log('newProduct');
        openDrawer = true;
    };
</script>

<div class="fl-page-header flex-center between">
    <h2>Inventory</h2>
    <div class="fl-page-controls flex-center">
        <InputSearch />
        <Button Icon={Plus} onclick={newProduct}>New product</Button>
    </div>
</div>
<div class="fl-full-scrollable fl-page-content">
    <div>
        inventory content
    </div>
</div>

<Drawer bind:open={openDrawer} />

<style></style>
