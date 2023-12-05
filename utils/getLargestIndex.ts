export const getLargestIndex = (arr: any): number => {
    return arr.reduce((max: number, current: any) => Math.max(max, current.index), -1);
};
