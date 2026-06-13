<script></script>

<header>
    <div class="logo text-[3rem] font-[700] leading-[2.25rem] mt-2">
        Studio 4
    </div>
    <div class="menu flex align-center justify-center gap-16">
        <!-- <a href="#">Dashboard</a> -->
        <a href="/calendar">Calendar</a>
        <a href="/settings">Settings</a>
        <!-- <a href="#">Clients</a>
        <a href="#">Services</a> -->
    </div>
    <div class="account flex align-center">
        <i class="user ph ph-user-circle"></i>
        <span>John Fernandez</span>
    </div>
</header>

<style>
    header {
        border-bottom: 1px solid var(--border);
        padding: 0.5rem 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo {
        /* background-color: var(--ring); */
        color: var(--accent);
        font-family: "Corinthia", cursive;
    }
    .menu > a {
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.375rem 1rem;
        border: 0;
        cursor: pointer;
        transition: var(--transition);
    }
    .menu > a:hover {
        border-radius: 0.5rem;
        background-color: var(--lightest);
    }
    .account {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.25rem 1rem;
        /* border: 1px solid var(--border); */
        border-radius: 0.25rem;
    }
    .user {
        font-size: 2rem;
    }
</style>