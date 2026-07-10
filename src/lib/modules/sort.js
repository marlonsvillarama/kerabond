export const sortByKey = (list, key) => {
    if (key) {
        list.sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
            if (b[key].toLowerCase() < a[key].toLowerCase()) return 1;
            return 0;
        });
    }
    else {
        list.sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (b.toLowerCase() < a.toLowerCase()) return 1;
            return 0;
        });
    }

    list = list;
    return list;
};
