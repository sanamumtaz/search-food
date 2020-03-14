import { combineReducers } from "redux";

const resultReducer = (results = null, action) => {
    if (action.type === "RESULT_TOGGLE") {
        return results = action.results;
    }

    return results;
};

const valReducer = (searchValue = '', action) => {
    if (action.type === "VAL_TOGGLE") {
        return searchValue = action.val;
    }

    return searchValue;
};

export default combineReducers({
    searchResults: resultReducer,
    searchValue: valReducer,
});

