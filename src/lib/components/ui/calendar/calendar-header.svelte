<script>
    import {
        Armchair,
        CalendarArrowDown,
        ChevronLeft,
        ChevronRight,
        MapPin,
        Plus
    } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import ButtonGroup from "../button-group.svelte";
    import CmdHeader from "$lib/components/global/cmd-header.svelte";
  import Select from "../select.svelte";

    let today = new Date();
    let todayText = $derived.by(() => {
        return `${today.toLocaleDateString('en-NZ', { weekday: 'long' })} -
            ${today.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}
        `;
    });
    let locationText = '137 The Square';
</script>

<div class="fl-cal-header flex-center between">
    <!-- <CmdHeader /> -->
    <Button class="btn-location btn-emphasize" Icon={MapPin}>
        {locationText}
    </Button>

    <div class="fl-cal-nav flex-center">
        <Button class="btn-today btn-emphasize" Icon={CalendarArrowDown}>
            {todayText}
        </Button>

        <ButtonGroup>
            <Button flat={true} Icon={ChevronLeft} />
            <Button flat={true} Icon={Armchair}>
                Today
            </Button>
            <Button flat={true} Icon={ChevronRight} />
        </ButtonGroup>

        <Button Icon={Plus} />
    </div>
</div>

<style>
    .fl-cal-header {
        /* background-color: var(--white); */
        border-bottom: 1.5px solid var(--border);
        gap: 1rem;
        padding: 0.375rem 1rem;
    }
    .fl-cal-nav { gap: 1rem; }
    :global(.btn-emphasize) {
        font-weight: 600;
        text-transform: uppercase;
    }
</style>
