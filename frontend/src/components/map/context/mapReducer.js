export const MAP_ACTIONS = {
  SET_MAP: "SET_MAP",
  SET_MARKERS: "SET_MARKERS",
};

export const mapReducer = (state, action) => {
  switch (action.type) {
    case "SET_MAP":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case "SET_MARKERS":
      return {
        ...state,
        markers: action.payload,
      };
    default:
      return state;
  }
};
