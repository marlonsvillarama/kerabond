<script>
  import { onMount } from "svelte";

    let {
        start = '0800',
        end = '1800',
        interval = 30,
        value = $bindable('0800')
    } = $props();

    let timeDisplay = $derived.by(() => {
        let hours = value.slice(0, 2);
        let hoursInt = parseInt(hours);
        let minutes = value.slice(2);

        return `${hoursInt}:${minutes} ${hoursInt >= 12 ? 'PM' : 'AM'}`
    });

    onMount(() => {});
</script>

<div class="fl-time-select">
    <button type="button" command="show-popover" commandfor="fl-time">{timeDisplay}</button>
</div>

<div id="fl-time" popover>
    time select popover
</div>

<style>
    .fl-time-select {
        border: 0;
        outline: 0;
        cursor: pointer;
    }
    .fl-time-select > button {
        background-color: var(--semi-light);
        border: 0;
        border-radius: 0.25rem;
        color: var(--darker);
        cursor: pointer;
        font-size: 0.75rem;
        outline: 0;
        padding: 0.25rem 0;
        width: 5rem;
    }
</style>
