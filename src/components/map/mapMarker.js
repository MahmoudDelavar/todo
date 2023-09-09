import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import { markerIcon } from './markerIcon';

const MapMarker = ({ onGetPosition, center }) => {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = forwardRef(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          onGetPosition && onGetPosition(marker.getLatLng());
        }
      },
    }),
    [markerRef, onGetPosition]
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <MapMarker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={markerIcon}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </MapMarker>
  );
};

export default MapMarker;
