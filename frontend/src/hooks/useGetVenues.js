import { useEffect, useState } from "react";

export const useGetVenues = (id, options) => {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    if (id === "lunch" || id === "dinner") {
      setVenues(options.filter((option) => option.isVenue === true));
    }
  }, []);

  return { venues };
};
