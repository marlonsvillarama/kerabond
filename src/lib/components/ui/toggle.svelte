<script>
    let {
        ontoggle
    } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="toggle" onclick={ontoggle}>
    <input type="checkbox" />
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label></label>
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
        /* opacity: 0; */
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
        width: 40px;
        height: 24px;
        background: #ccc;
        position: relative;
        display: inline-block;
        border-radius: 12px;
        box-sizing: border-box;
        transition: 0.2s ease-in;
    }
    .toggle label:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
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
