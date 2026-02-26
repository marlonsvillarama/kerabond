<script>
    let {
        date = $bindable(),
        mode = 'week'
    } = $props();

    // const runPrevious = () => {};
    const moveToNext = () => {
        console.log('date NEXT before', date);

        if (mode === 'week') {
            date.setDate(date.getDate() + 7);
        }
        else if (mode === 'month') {
            date.setMonth(date.getMonth() + 1);
        }

        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        console.log('date NEXT after', date);
    };

    const moveToToday = () => {
        console.log('date before', date);

        date = new Date();
    };

    const moveToPrevious = () => {
        console.log('date NEXT before', date);

        if (mode === 'week') {
            date.setDate(date.getDate() - 7);
        }
        else if (mode === 'month') {
            date.setMonth(date.getMonth() - 1);
        }

        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        console.log('date NEXT after', date);
    };
</script>

<div class="controls-container">
    <button onclick={moveToPrevious} title="Previous">
        <i class="ph ph-caret-left"></i>
        <!-- Previous -->
        <!-- Previous {mode} -->
    </button>
    <button onclick={moveToToday} title="Today" class="today">
        Today
    </button>
    <button onclick={moveToNext} title="Next">
        <!-- Next -->
        <!-- Next {mode} -->
        <i class="ph ph-caret-right"></i>
    </button>
</div>

<style>
    .controls-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        /* border: 1px solid red; */
        /* margin-bottom: 0.5rem; */
    }
    button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        /* background-color: aliceblue; */
        /* border: 1px solid var(--lightest); */
        border: 0px solid transparent;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        /* box-shadow: var(--shadow-sm); */
        transition: var(--transition);
    }
    button:hover {
        background-color: var(--lightest);
    }
    button:active {
        background-color: var(--lightest);
        box-shadow: none;
        transform: translateY(2px);
    }
    button.today {
        background-color: var(--accent-light);
        padding: 0.5rem 1rem;
    }
    button.today:hover {
        background-color: var(--accent);
    }
    button > i {
        font-size: 1.25rem;
    }
</style>