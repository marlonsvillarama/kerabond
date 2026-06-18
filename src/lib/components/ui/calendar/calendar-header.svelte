<script>
    import {
        Armchair,
        CalendarArrowDown,
        CalendarCog,
        ChevronLeft,
        ChevronRight,
        MapPin,
        Plus,
        Settings
    } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import ButtonGroup from "$lib/components/ui/button-group.svelte";
    import Select from "$lib/components/ui/select.svelte";

    let {
        date = $bindable(new Date()),
        mode = $bindable('month')
    } = $props();
    
    // let today = new Date();
    let dateText = $derived.by(() => {
        return `${date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
            ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}
        `;
    });
    let locationText = '137 The Square';

    const viewPreviousDay = () => {
        date.setDate(date.getDate() - 1);
        date = date;
        console.log('viewPreviousDay', date);
    };

    const viewNextDay = () => {
        date.setDate(date.getDate() + 1);
        date = date;
        console.log('viewNextDay', date);
    };
</script>

<div class="fl-cal-header flex-center between">
    <!-- <CmdHeader /> -->
    <div class="fl-cal-nav flex-center">
        <Button class="btn-location btn-emphasize" Icon={MapPin}>
            {locationText}
        </Button>
        <ButtonGroup>
            <Button active={mode === 'month'} flat={true} onclick={() => mode = 'month'}>Month</Button>
            <Button active={mode === 'week'} flat={true} onclick={() => mode = 'week'}>Week</Button>
            <Button active={mode === 'day'} flat={true} onclick={() => mode = 'day'}>Day</Button>
        </ButtonGroup>
    </div>

    <div class="fl-cal-nav flex-center">
        <Button class="btn-today btn-emphasize" Icon={CalendarArrowDown}>
            {dateText}
        </Button>

        <ButtonGroup>
            <Button flat={true} Icon={ChevronLeft} onclick={viewPreviousDay} />
            <Button flat={true} Icon={Armchair} onclick={() => date = new Date()}>
                Today
            </Button>
            <Button flat={true} Icon={ChevronRight} onclick={viewNextDay} />
        </ButtonGroup>

        <Button Icon={Plus} />
        <Button Icon={CalendarCog} />
    </div>
</div>

<style>
    .fl-cal-header {
        /* background-color: var(--white); */
        /* border-bottom: 1.5px solid var(--border); */
        gap: 1rem;
        padding: 0.75rem 1rem;
    }
    .fl-cal-nav { gap: 1rem; }
    :global(.btn-emphasize) {
        font-weight: 600;
        text-transform: uppercase;
    }
</style>
