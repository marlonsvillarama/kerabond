<script>
    import { NZPhoneFormatter } from "$lib/modules/phone";
    let {
        id = 'fld',
        label = 'Field',
        required = false,
        subtext = '',
        value = $bindable(''),
        width = ''
        // width = 8
    } = $props();

    let showError = $state(false);
    const validate = () => {
        value = NZPhoneFormatter(value);
        if (required === false) { return; }
        showError = required === true && !value;
    };
</script>

<div class="fl-fld">
    <label for={id} class:fl-fld-optional={required === false}>{label}</label>
    {#if subtext}
        <span class="fl-fld-subtext">{subtext}</span>
    {/if}
    <input type="phone" {id} name={id} style="width: {width || '100%'}" bind:value
        onblur={validate}
    />
    {#if showError}
        <span class="fl-fld-error">This field is required.</span>
    {/if}
</div>

<style>
    .fl-fld {
        display: flex;
        align-items: left;
        flex-direction: column;
        gap: 2px;
    }
    .fl-fld > label {
        color: var(--dark);
        font-size: 0.875rem;
        /* font-weight: 500; */
    }
    .fl-fld-subtext {
        color: var(--dark);
        font-size: 0.625rem;
        font-weight: 500;
        opacity: 0.5;
    }
    .fl-fld-optional {
        color: var(--border);
        font-weight: 300 !important;
        opacity: 0.6;
    }
    .fl-fld-optional::after {
        content: " (Optional)";
    }
    :global(.fl-fld > input[type=phone]) {
        /* border: 1px solid var(--light); */
        background-color: var(--lighter);
        border: none;
        outline: none;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
    :global(.fl-fld > input[type=phone]:focus) {
        background-color: var(--primary-lighter);
        outline: 2px solid var(--primary-light);
    }
    .fl-fld-error {
        color: red;
        font-size: 0.75rem;
        font-weight: 300;
        margin-left: 2px;
    }
</style>
