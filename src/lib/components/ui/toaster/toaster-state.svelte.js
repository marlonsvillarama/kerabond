import { getContext, onDestroy, setContext } from "svelte";

export class ToasterState {
    toasts = $state([]);
    toastToTimeoutMap = new Map();

    constructor() {
        onDestroy(() => {
            for (const timeout of this.toastToTimeoutMap.values()) {
                clearTimeout(timeout);
            }
            this.toastToTimeoutMap.clear();
        });
    }

    add(title, message, type = 'info', duration = 5000) {
        const id = crypto.randomUUID();
        this.toasts.push({
            type,
            id,
            title,
            message
        });
        this.toastToTimeoutMap.set(
            id,
            setTimeout(() => {
                this.remove(id)
            }, duration)
        );
    }

    remove(id) {
        const timeout = this.toastToTimeoutMap.get(id)
        if (timeout) {
            clearTimeout(timeout);
            this.toastToTimeoutMap.delete(id);
        }
        this.toasts = this.toasts.filter(d => d.id !== id);
    }
}

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
    return setContext(TOAST_KEY, new ToasterState())
}

export function getToastState() {
    return getContext(TOAST_KEY);
}
