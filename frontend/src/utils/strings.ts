
export const capitalizeFirstLetter = (word: string): string => (
    word[0].toUpperCase() + word.slice(1)
);

export const convertToReadableDate = (date: string): string => {
    const d = new Date(date);
    return d.toDateString();
};
