<script>
    let {
        checked = $bindable(),
        id = 'toggle',
        onclick,
        ontoggle
    } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="toggle">
    <input type="checkbox" bind:checked {id} name={id} {onclick} onchange={ontoggle} />
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <label for={id}></label>
</div>

<style>
    .toggle {
        position: relative;
        box-sizing: border-box;
    }
    .toggle input[type="checkbox"] {
        position: absolute;
        left: -9999px;
        top: -9999px;
        z-index: 10;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .toggle label {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
    }
    .toggle label:before {
        content: '';
        width: 36px;
        height: 20px;
        background: #ccc;
        position: relative;
        display: inline-block;
        border-radius: 0.25rem;
        box-sizing: border-box;
        transition: 0.2s ease-in;
    }
    .toggle label:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 0.125rem;
        left: 2px;
        top: 2px;
        z-index: 2;
        background: #fff;
        box-sizing: border-box;
        transition: 100ms ease-in;
    }
    .toggle input[type="checkbox"]:checked + label:before {
        background: #4BD865;
    }
    .toggle input[type="checkbox"]:checked + label:after {
        left: 18px;
    }
</style>
