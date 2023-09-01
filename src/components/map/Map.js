import 'leaflet/dist/leaflet.css';
// import styles from './Map.module.scss';
import 'leaflet/dist/images/marker-shadow.png';
import { markerIcon } from './markerIcon';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  Polygon,
} from 'react-leaflet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Map = (props) => {
  const { center, onGetPosition, draggable = true, zoom = 13, scope } = props;

  function DraggableMarker() {
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
    const markerRef = useRef(null);
    const map = useMap();

    useEffect(() => {
      center && map.locate();
      center && setMarkerPosition(center);
      center && map?.flyTo(center, map.getZoom());
    }, [center]);

    // useMapEvents({
    //   locationfound(e) {
    //     center && setMarkerPosition(center);
    //     center && map.flyTo(center, map.getZoom());
    //   },
    // });

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          const position = marker.getLatLng();

          if (marker != null) {
            // setMarkerPosition(position);
            // map.flyTo(position, map.getZoom());
            onGetPosition && onGetPosition(position);
          }
        },
      }),
      [center]
    );

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={markerPosition}
        ref={markerRef}
        icon={markerIcon}
      />
    );
  }

  return (
    <MapContainer
      style={{ width: '100%', height: '370px', zIndex: 0 }}
      center={[28.7041, 77.1025] || [0, 0]}
      zoom={zoom}
      scrollWheelZoom={true}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Polygon positions={scope || []} />
      <DraggableMarker />
    </MapContainer>
  );
};

export default Map;
