<script>
    let {
        header,
        details,
        Icon
    } = $props();
</script>

<div class="fl-form-item">
    <div class="flex-center">
        <Icon color="#435b30" size={24} />
        <div class="fl-form-item-content">
            {@render header?.()}
        </div>
    </div>
    {#if details}
        <div class="flex-center">
            <div style="width:36px"></div>
            <div class="fl-form-item-content">
                {@render details?.()}
            </div>
        </div>
    {/if}
    <span class="fl-form-item-edit">Edit</span>
</div>

<style>
    .fl-form-item {
        border: 1.5px solid transparent;
        border-radius: 0.25rem;
        cursor: pointer;
        padding: 0.25rem 0.25rem;
        width: 100%;
        /* transition: all 100ms ease-in-out; */
        display: grid;
        gap: 0.5rem;
        position: relative;
    }
    .fl-form-item > div {
        display: grid;
        grid-template-columns: 36px 1fr;
        /* align-items: center; */
        /* background-color: var(--lighter); */
        /* margin: 0 1.75rem; */
    }
    .fl-form-item:hover {
        border: 1.5px solid var(--primary-light);
        background-color: var(--primary-lightest);
    }
    .fl-form-item:hover > .fl-form-item-edit {
        display: inline;
    }
    .fl-form-item-content {
        display: flex;
        flex-direction: column;
        /* align-items: first baseline; */
        font-size: 0.875rem;
        color: var(--darker);
        /* border: 1px solid red; */
    }
    :global(.fl-form-item-content > .text) {
        color: var(--dark);
        font-size: 1rem;
        font-weight: 600;
    }
    :global(.fl-form-item-content > .subtext) {
        color: var(--dark);
        font-size: 0.75rem;
        /* font-weight: 500; */
        opacity: 0.5;
    }
    :global(.fl-form-item-content > p) {
        font-size: 0.75rem;
        /* font-weight: 300; */
        opacity: 0.7;
    }
    .fl-form-item-edit {
        position: absolute;
        display: none;
        top: 0.25rem;
        right: 0.5rem;
        /* transform: translateY(-50%); */
        font-size: 0.75rem;
        /* font-weight: 300; */
        /* color: var(--dark); */
        color: var(--primary);
    }
</style>
