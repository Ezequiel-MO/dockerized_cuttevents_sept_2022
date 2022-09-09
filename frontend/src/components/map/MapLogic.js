/* import { getCenter } from "geolib"; */
import { useState, useEffect } from "react";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import useGetLocations from "../../hooks/useGetLocation";

const MapLogic = () => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [coords, setCoords] = useState([]);
  const [viewport, setViewport] = useState({});
  const { currentProject } = useCurrentProject();
  const { locations } = useGetLocations();
  const { hotels, schedule, groupLocation } = currentProject;
  const [viewState, setViewState] = useState({
    latitude: 41.492944,
    longitude: 2.0567259,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    let centralCoords = locations.filter(
      (item) => item.name === groupLocation
    ) ?? [41.492944, 2.0567259];
    setViewState({
      ...viewState,
      latitude: centralCoords[0]?.location.coordinates[0] || 41.492944,
      longitude: centralCoords[0]?.location.coordinates[1] || 2.0567259,
    });
  }, [locations]);

  useEffect(() => {
    if (hotels?.length > 0) {
      const hotelCoords = hotels?.map((hotel) => {
        return {
          longitude: hotel.location.coordinates[1],
          latitude: hotel.location.coordinates[0],
          name: hotel.name,
          icon: "carbon:hotel",
          id: hotel._id,
        };
      });
      setCoords((prevState) => [...prevState, ...hotelCoords]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    schedule.forEach((day) => {
      day.morningEvents.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "carbon:events",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.lunch.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "bx:bx-restaurant",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.afternoonEvents.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "carbon:events",
            },
          ]);
        }
      });
    });
    schedule.forEach((day) => {
      day.dinner.forEach((event) => {
        if (event.location.coordinates.length > 0) {
          setCoords((coords) => [
            ...coords,
            {
              latitude: event.location.coordinates[0],
              longitude: event.location.coordinates[1],
              name: event.name,
              id: event._id,
              icon: "bx:bx-restaurant",
            },
          ]);
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  /* useEffect(() => {
    if (coords.length > 0) {
      const centerObj = getCenter(coords);
      setViewport({
        width: "100%",
        height: "100%",
        latitude: centerObj.latitude,
        longitude: centerObj.longitude,
        zoom: 12,
      });
    }
  }, [coords]); */

  return {
    selectedLocation,
    setSelectedLocation,
    coords,
    viewport,
    setViewport,
    viewState,
    setViewState,
  };
};

export default MapLogic;
