import * as React from "react";

import { useCallback, useState, useEffect } from "react";
import { useMap } from "react-map-gl";

export default function Controls() {
  const { mymap } = useMap();
  const [inputValue, setInputValue] = useState("");
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!mymap) {
      return undefined;
    }

    const onMove = () => {
      const { lng, lat } = mymap.getCenter();
      setInputValue(`${lng.toFixed(3)}, ${lat.toFixed(3)}`);
      setError(false);
    };
    mymap.on("move", onMove);
    onMove();

    return () => {
      mymap.off("move", onMove);
    };
  }, [mymap]);

  const onChange = useCallback((evt) => {
    setInputValue(evt.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    const [lng, lat] = inputValue.split(",").map(Number);
    if (Math.abs(lng) <= 180 && Math.abs(lat) <= 85) {
      mymap.easeTo({
        center: [lng, lat],
        duration: 1000,
      });
    } else {
      setError(true);
    }
  }, [mymap, inputValue]);

  return (
    <div className="absolute top-10 left-2 z-50 bg-transparent w-[150px] md:w-[250px] shadow-lg p-2 rounded-md">
      <span className="bg-orange-50 text-black-50 font-bold px-5">
        Find Vendor/Event:{" "}
      </span>
      <div className="flex flex-row">
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          style={{ color: hasError ? "red" : "black" }}
        />
        <button
          onClick={onSubmit}
          className="inline-block px-6 py-2.5 bg-green-50 text-white-100 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-50 hover:shadow-lg focus:bg-gray-50 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-50 active:shadow-lg transition duration-150 ease-in-out"
        >
          GO
        </button>
      </div>
    </div>
  );
}
