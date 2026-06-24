<script>
    let {
        children,
        id = '',
        label = 'Field Label',
    } = $props();

    const getRandomString = (length = 12) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            counter++;
        }

        return result;
    };

    let randomId = getRandomString();
    let fieldId = $derived(id || `fld-${randomId}`);
</script>

<div class="fl-field">
    <label for={fieldId}>{label}</label>
    {@render children?.()}
</div>

<style>
    .fl-field {
        display: grid;
        font-size: 0.875rem;
        gap: 0.25rem;
    }
    .fl-field > label {
        margin-left: 0.25rem;
        font-weight: 500;
    }
</style>
