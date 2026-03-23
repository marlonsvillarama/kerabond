<script>
    import CalendarTitle from "$lib/components/calendar-title.svelte";
    import CalendarNav from "$lib/components/calendar-nav.svelte";
    import CalendarWeek from "$lib/components/calendar-week.svelte";
    import CalendarMonth from "$lib/components/calendar-month.svelte";
    import DialogBlocks from "$lib/components/dialog-blocks.svelte";
    import ModeToggle from "$lib/components/mode-toggle.svelte";

    let { data } = $props();
    let mode = $state('week');
    let date = $state(new Date());
    let blockDialog = $state(null);

    const blocksClick = () => {
        blockDialog.showModal();
    };

    const closeBlocks = () => {
        blockDialog.close();
    };

    const refreshCalendar = () => {
        alert(`refreshCalendar; mode = ${mode}\n${date.toLocaleDateString('en-NZ')}`);
    };
</script>

<main>
    <section class="header">
        <div class="header-menu">
            <button type="button" class="button-lock" onclick={blocksClick}>
                <i class="ph ph-gear-six"></i>
            </button>
            <button type="button" class="button-lock" onclick={blocksClick}>
                <i class="ph ph-calendar-slash"></i>
            </button>
        </div>
        <!-- <ModeToggle bind:mode={mode} /> -->
        <div class="flex align-center gap-[0.5rem]">
            <CalendarTitle {date} {mode} onrefresh={refreshCalendar} />
            <!-- <button type="button" class="button-menu" onclick={menuClick}>
                <i class="ph ph-list"></i>
            </button>
            <button type="button" class="button-menu" onclick={menuClick}>
                <i class="ph ph-arrows-clockwise"></i>
            </button> -->
        </div>
        <CalendarNav bind:date={date} {mode} />
    </section>

    <section class="content">
        {#if mode === 'week'}
            <CalendarWeek value={date} />
        {:else}
            <CalendarMonth value={date} />
        {/if}
    </section>
</main>

<dialog id="dialog-lock" bind:this={blockDialog}>
    <DialogBlocks onclose={closeBlocks} />
</dialog>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
        padding: 0.5rem 0.75rem;
    }
    .header {
        padding-bottom: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-light);
    }
    .header-menu {
        display: flex;
        gap: 0.5rem;
    }
    .content {
        flex: 1;
        overflow-y: auto;
    }
    .button-lock {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        gap: 0.5rem;
        padding: 0.5rem;
        /* background-color: aliceblue; */
        /* border: 1px solid var(--lightest); */
        border: 0px solid transparent;
        border-radius: 0.25rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        /* box-shadow: var(--shadow-sm); */
        transition: var(--transition);
    }
    .button-lock:hover {
        background-color: var(--accent-light);
    }
    .button-lock:active {
        background-color: var(--lightest);
        box-shadow: none;
        transform: translateY(2px);
    }
    dialog {
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        /* border: 1px solid var(--border-light); */
        border-radius: 0.5rem;
        outline: 0;
        min-width: 34rem;
        width: 34rem;
        /* width: 50vw; */
    }
</style>