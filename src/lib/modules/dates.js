export const DateFormatter = () => {
    return {
        add: () => {},

        parseDate: (value) => {
            return new Date(value);
        },

        toString: (value) => {
            if (!value) { return ''; }
            return `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}`;
        }
    };
};
