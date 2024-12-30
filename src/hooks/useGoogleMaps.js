// useGoogleMaps.js
import { useEffect, useState } from "react";

export const useGoogleMaps = () => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyAWSfp11ay0zsj1xJ5aiNwZcZgz73CHTvs'}&libraries=places`;
        script.async = true;
        script.onload = () => setGoogleMapsLoaded(true);
        document.head.appendChild(script);
      } else {
        setGoogleMapsLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  return { googleMapsLoaded };
};
