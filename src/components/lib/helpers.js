export const convertToMoney = (value) => new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: 'PHP',
}).format(`${value}`);