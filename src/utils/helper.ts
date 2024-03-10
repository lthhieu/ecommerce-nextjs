export const addCommas = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = (num: number) => num.toString().replace(/[^0-9]/g, "");
export const convertNumberToList = (number: any) => {
    const integerPart = Math.floor(number);
    const fractionalPart = number - integerPart;

    const resultList = Array(integerPart).fill(1);

    if (fractionalPart > 0) {
        resultList.push(fractionalPart);
    }
    const loopValue = 5 - resultList.length
    for (let i = 1; i <= loopValue; i++) {
        resultList.push(0)
    }

    return resultList;
}