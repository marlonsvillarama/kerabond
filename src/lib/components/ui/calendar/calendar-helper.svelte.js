export const formatDate = (dateObject) => {
    return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
};

export const parseDate = (dateValue) => new Date(dateValue);
