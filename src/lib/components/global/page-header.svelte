<script>
    let {
        title = "Page",
        controls
    } = $props();
</script>

<div class="controls-header flex-center between">
    <h2>{title}</h2>
    <div class="controls flex-center">
        <InputSearch />
        <Button Icon={Plus}>New staff</Button>
        <!-- <Button>button 2</Button> -->
    </div>
</div>

<style></style>
