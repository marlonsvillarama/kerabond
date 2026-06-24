<script>
    let {
        image = '',
        label = ''
    } = $props();
</script>

{#if image}
    <img class="fl-avatar" src={image} alt={label}>
{:else}
    <div class="fl-avatar">{label}</div>
{/if}

<style>
    .fl-avatar {
        height: 36px;
        width: 36px;
        border-radius: 50%;
    }
    img.fl-avatar {
        object-fit: cover;
    }
    div.fl-avatar {
        background-color: var(--dark);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
