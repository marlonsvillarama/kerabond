<script>
    let {
        align = '',
        class:className,
        id = '',
        errorMessage = 'This field is required.',
        label = '',
        onblur,
        required = false,
        subtext = '',
        value = $bindable(),
        width
    } = $props();

    let showError = $state(false);
    let isDirty = $state(false);

    const validate = () => {
        if (!isDirty) { return }

        showError = required === true && !value?.trim();
        if (showError) { return }

        isDirty = false;
        onblur?.();
    };
</script>

<div class="fl-fld-text"
    style="width: {width || '100%'}"
>
    <label for="text-{id}" class:optional={required === false}>{label}</label>

    {#if subtext}
        <span class="subtext">{subtext}</span>
    {/if}

    <input type="text" text="text-{id}" name="text-{id}"
        class={className}
        class:align-center={align.toLowerCase() === 'center'}
        class:align-right={align.toLowerCase() === 'right'}
        bind:value
        onblur={validate}
        onchange={() => isDirty = true}
    />

    {#if showError}
        <span class="error">{errorMessage}</span>
    {/if}
</div>

<style>
    .fl-fld-text {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }
    .fl-fld-text > label {
        color: var(--dark);
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.125px;
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
    /* .fl-fld-text > .optional::after {
        content: " (Optional)";
    } */
    :global(.fl-fld-text > input[type=text]) {
        /* background-color: var(--lighter); */
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        outline: none;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
    :global(.fl-fld-text > input[type=text]:focus) {
        /* background-color: var(--primary-lighter); */
        outline: 2px solid var(--primary);
    }
    :global(.fl-fld-text > input[type=text].align-center) {
        text-align: center;
    }
    :global(.fl-fld-text > input[type=text].align-right) {
        text-align: right;
    }
    .fl-fld-text > .error {
        color: red;
        font-size: 0.75rem;
        font-weight: 300;
        margin-left: 2px;
    }
</style>
