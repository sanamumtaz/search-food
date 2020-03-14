// Action creator

export const resultToggle = (meals) => {
    return {
        // Return action
        type: "RESULT_TOGGLE",
        results: meals
    };
};

export const valToggle = (s_val) => {
    return {
        // Return action
        type: "VAL_TOGGLE",
        val: s_val
    };
};
