export const sortByKey = (list, key) => {
    if (key) {
        list.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (b[key] < a[key]) return 1;
            return 0;
        });
    }
    else {
        list.sort((a, b) => {
            if (a < b) return -1;
            if (b < a) return 1;
            return 0;
        });
    }

    list = list;
    return list;
};
