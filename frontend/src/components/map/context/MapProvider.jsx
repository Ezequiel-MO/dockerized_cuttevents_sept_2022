import { useEffect, useReducer } from "react";
import { MapContext } from "./MapContext";
import { mapReducer, MAP_ACTIONS } from "./mapReducer";
import { Marker, Popup } from "mapbox-gl";
import MapLogic from "../MapLogic";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { currentProject } = useCurrentProject();
  const { coords } = MapLogic(currentProject);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers = [];
    for (const coord of coords) {
      const { latitude, longitude } = coord;
      const popup = new Popup().setHTML(`<h6>${coord.name}</h6>`);
      /*   const el = document.createElement("div");
      el.style.backgroundImage = `url(${coord.icon})`;
      el.style.width = "40px";
      el.style.height = "40px"; */
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([longitude, latitude])
        .addTo(state.map);

      newMarkers.push(newMarker);
    }
    //Todo : clean polilines
    dispatch({ type: MAP_ACTIONS.SET_MARKERS, payload: newMarkers });
  }, [state, coords]);

  const setMap = (map) => {
    const myLocationPopup = new Popup().setHTML(`
      <div className="flex flex-col items-center justify-center">
        <Icon icon="location" color="#ea5933" width="40" />
        <Typography variant="h4" className="text-bold text-white-100 indent-2 ">
          My Location
          </Typography>
          </div>
          `);
    new Marker({
      color: "#ea5933",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: MAP_ACTIONS.SET_MAP, payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
