
export const capitalizeFirstLetter = (word: string): string => (
    word[0].toUpperCase() + word.slice(1)
);

export const convertToReadableDate = (date: string): string => {
    const d = new Date(date);
    return d.toDateString();
};

// Circular object
export const replacerFunction = () => {
    const weakSet = new WeakSet();
    return (key: string, value: string) => {
        if (typeof value === 'object' && value !== null) {
            if (weakSet.has(value)) {
                return;
            }
            weakSet.add(value);
        }
        return value;
    };
};
