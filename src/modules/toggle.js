export const toggle = (items, id, condition = null) => {
    const realCondition = condition !== null ? !!condition : items.includes(id);
    return realCondition ? items.concat(id) : items.filter((item) => item !== id);
};
