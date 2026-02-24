<script>
    let {
        date,
        mode = 'week'
    } = $props();

    let title = $derived.by(() => {
        let output = '';
        console.log('calendar.title derived', date);

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

<button onclick={onrefresh} title="Click to Refresh">
    <h1 class="title">{title}</h1>
    <i class="ph-fill ph-arrows-clockwise" size={32}></i>
</button>

<style>
    button {
        border: 0px solid var(--accent-light);
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        padding: 0.25rem 3rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        /* justify-content: space-between; */
    }
    button:hover {
        background-color: var(--accent-light);
    }
    .title {
        font-size: 1.125rem;
        font-weight: 600;
        /* margin-bottom: 0.5rem; */
        /* border: 1px solid red; */
    }
</style>