import { useRef, useState } from "react";
import Map, {
  GeolocateControl,
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapLogic from "./MapLogic";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { Icon } from "@iconify/react";

const VendorMap = () => {
  const mapRef = useRef();
  const { viewState, setViewState, coords } = MapLogic();
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <>
      <Map
        id="mymap"
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapLib={maplibregl}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <NavigationControl className="navigation-control" showCompass={true} />
        <ScaleControl />
        {coords.map((coord, index) => (
          <Marker
            key={`${coord.id}-${index}`}
            longitude={coord.longitude}
            latitude={coord.latitude}
            anchor="top"
            offsetLeft={-17.5}
            offsetTop={-38}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(coord);
            }}
          >
            <Icon icon={coord.icon} width="35" color="#ea5933" />
          </Marker>
        ))}
        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
          >
            <div className="p-2 text-sm">
              {popupInfo.name}
              <br />
            </div>
            {/* <img width="100%" src={popupInfo.image} /> */}
          </Popup>
        )}
      </Map>
    </>
  );
};

export default VendorMap;
