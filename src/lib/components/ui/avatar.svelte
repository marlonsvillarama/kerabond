<script>
    let {
        image = '',
        label = ''
    } = $props();
</script>

{#if image}
    <img class="fl-avatar" src={image}>
{:else}
    <div class="fl-avatar">{label}</div>
{/if}

<style>
    .fl-avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    img.fl-avatar {
        object-fit: cover;
    }
    div.fl-avatar {
        background-color: var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
