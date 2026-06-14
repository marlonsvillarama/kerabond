<script>
    import { Plus } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
</script>

<div class="fl-page-header flex-center between">
    <h2>Schedule</h2>
    <div class="fl-page-controls flex-center">
        <!-- <InputSearch /> -->
        <Button Icon={Plus}>New schedule</Button>
    </div>
</div>
<div class="fl-full-scrollable fl-page-content">
    <div>
        schedule content
    </div>
</div>

<style></style>
