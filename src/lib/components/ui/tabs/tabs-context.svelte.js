import { createContext } from "svelte";

export class TabsState {
    activeTab = $state('');

    constructor (initialTab) {
        this.activeTab = initialTab;
    }

    select (tabId) { this.activeTab = tabId; }
}

export const tabsContext = createContext();
