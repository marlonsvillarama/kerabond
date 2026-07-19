<script>
    let {
        id = '',
        errorMessage = 'This field is required.',
        label = 'Text Field',
        onblur,
        required = false,
        subtext = '',
        value = $bindable(),
        width
    } = $props();

    let showError = $state(false);
    const validate = () => {
        // if (required === false) { return; }

        showError = required === true && !value?.trim();
        if (showError) { return; }

        onblur?.();
    };
</script>

<div class="fl-fld-text">
    <label for="text-{id}" class:optional={required === false}>{label}</label>
    <!-- <input type="text" id="text-{id}" bind:value /> -->
    {#if subtext}
        <span class="subtext">{subtext}</span>
    {/if}
    <input type="text" text="text-{id}" name="text-{id}" style="width: {width || '100%'}" bind:value onblur={validate} />
    {#if showError}
        <span class="error">{errorMessage}</span>
    {/if}
</div>

<style>
    .fl-fld-text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .fl-fld-text > label {
        color: var(--dark);
        font-size: 0.875rem;
        font-weight: 600;
    }
    .fl-fld-text > .subtext {
        color: var(--dark);
        font-size: 0.625rem;
        font-weight: 500;
        opacity: 0.5;
    }
    .fl-fld-text > .optional {
        color: var(--dark);
        font-weight: 300 !important;
        opacity: 0.7;
    }
    .fl-fld-text > .optional::after {
        content: " (Optional)";
    }
    :global(.fl-fld-text > input[type=text]) {
        /* border: 1px solid var(--light); */
        background-color: var(--lighter);
        border: none;
        outline: none;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
    :global(.fl-fld-text > input[type=text]:focus) {
        background-color: var(--primary-lighter);
        outline: 2px solid var(--primary-light);
    }
    .fl-fld-text > .error {
        color: red;
        font-size: 0.75rem;
        font-weight: 300;
        margin-left: 2px;
    }
</style>
