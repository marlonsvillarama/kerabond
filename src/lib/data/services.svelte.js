let allServices = [
    { id: 1, category: 'Haircut', name: "Men's Haircut", duration: 30 },
    { id: 2, category: 'Haircut', name: "Women's Haircut", duration: 30 },
    { id: 3, category: 'Haircut', name: "Under 16 years old", duration: 30 },
    { id: 4, category: 'Others', name: "Keratin", duration: 60 },
    { id: 5, category: 'Others', name: "Kerabond", duration: 90 },
];

export const createServicesData = () => {
    return {
        get all () { return allServices },
        get listByCategory () {
            let output = [];
            let categories = [ ...new Set(allServices.map(d => d.category)) ];
            categories.forEach(c => {
                output.push({
                    name: c,
                    services: allServices.filter(s => s.category === c)
                });
            });
            return output;
        },

        getDuration (id) {
            let svc = allServices.find(s => s.id === id);
            return svc?.duration || 0;
        }
    };
};