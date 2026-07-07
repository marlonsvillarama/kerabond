<script>
    import { Square, SquareCheckBig } from "@lucide/svelte";
    let {
        checked = $bindable(false),
        id = 'fld-cb',
        label = 'Checkbox',
        required = false,
        subtext = 'Subtext goes here'
    } = $props();
</script>

<div class="fl-fld-cb">
    <input type="checkbox" {id} bind:checked />
    {#if checked}
        <SquareCheckBig size={20} />
    {:else}
        <Square size={20} />
    {/if}
    <label for={id} class:fl-fld-optional={required === false}>{label}</label>
    {#if subtext}
        <!-- <span class="fl-fld-subtext">{subtext}</span> -->
    {/if}
    <!-- <input type="text" {id} name={id} style="width: {width || '100%'}" bind:value onblur={validate} /> -->
    <!-- {#if showError} -->
        <!-- <span class="fl-fld-error">This field is required.</span> -->
    <!-- {/if} -->
</div>

<style>
    .fl-fld-cb {
        display: flex;
        align-items: center;
        /* flex-direction: column; */
        gap: 0.5rem;
        position: relative;
    }
    .fl-fld-cb > label {
        color: var(--dark);
        cursor: pointer;
        font-size: 0.875rem;
        /* font-weight: 500; */
    }
    .fl-fld-cb > input[type=checkbox] {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    /* .fl-fld-subtext {
        color: var(--dark);
        font-size: 0.625rem;
        font-weight: 500;
        opacity: 0.5;
    } */
</style>
