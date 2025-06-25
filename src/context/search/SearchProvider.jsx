import { useReducer } from "react";
import { initialState, searchReducer } from "./searchReducer";
import { SearchContext } from "./searchContext";
import api from "../../axios/axios";

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchServices = async (filters) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") queryParams.append(key, value);
    });

    try {
      const { data } = await api.get(`/services/search?${queryParams.toString()}`);
      dispatch({ type: "SET_FILTERS", payload: filters });
      dispatch({ type: "SET_RESULTS", payload: data.services || [] });
    } catch (error) {
      console.error("Error al buscar servicios:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ ...state, searchServices }}>
      {children}
    </SearchContext.Provider>
  );
};
