<script>
    let {
        date,
        mode = 'week'
    } = $props();

    let title = $derived.by(() => {
        let output = '';

        if (mode === 'week') {
            let startWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            startWeek.setDate(startWeek.getDate() - startWeek.getDay());
            // console.log('startWeek', startWeek);

            let endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate());
            endWeek.setDate(startWeek.getDate() + 6);
            // console.log('endWeek', endWeek);

            if (startWeek.getMonth() !== endWeek.getMonth()) {
                output = `${startWeek.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric'})} - ${endWeek.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric'})}`;
            }
            else {
                output = ` ${startWeek.toLocaleDateString('en-NZ', { month: 'long' })} ${startWeek.getDate()} - ${endWeek.getDate()}, ${startWeek.getFullYear()}`;
            }
        }
        else {
            output += ` ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' })}`;
        }

        return output;
    });
</script>

<h1 class="title">{title}</h1>

<style>
    .title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        /* border: 1px solid red; */
    }
</style>