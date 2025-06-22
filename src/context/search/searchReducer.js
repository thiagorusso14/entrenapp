export const initialState = {
  filters: {},
  services: [],
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_RESULTS":
      return { ...state, services: action.payload };
    default:
      return state;
  }
};
