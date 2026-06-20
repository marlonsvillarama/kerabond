<script>
    import { getContext } from "svelte";

    let calendarState = getContext('CALENDAR_STATE');
</script>

{calendarState.mode} : {calendarState.date}