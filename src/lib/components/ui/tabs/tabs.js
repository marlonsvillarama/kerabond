import { getContext, setContext } from "svelte";

export const tabsContext = () => {
    let activeTab = '';

    return {
        getActiveTab: () => activeTab,
        setActiveTab: (value) => activeTab = value
    };
};
