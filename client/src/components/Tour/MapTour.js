import mapboxgl from 'mapbox-gl';
import Map, { Marker, Popup } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { getCenter } from 'geolib';

import 'mapbox-gl/dist/mapbox-gl.css';
import pinMarker from '../../img/pin.png';

mapboxgl.accessToken =
  'pk.eyJ1IjoidHVhbnBybzJrMjAwMSIsImEiOiJjbDdrMGJjemgwczFhNDFxc3EwZXRtaW16In0.i7FsvvmmNuq8RtIoLDL4WA';

const Mapp = ({ locations }) => {
  const [viewState, setViewState] = useState(() => {
    return { longitude: 0, latitude: 0, zoom: 5 };
  });

  useEffect(() => {
    setViewState((state) => {
      if (locations) {
        const coordinates = locations?.map((location) => ({
          longitude: location.coordinates[0],
          latitude: location.coordinates[1],
        }));

        const { longitude, latitude } = getCenter(coordinates);
        return {
          ...state,
          longitude,
          latitude,
        };
      }
      return { ...state };
    });
  }, [locations]);

  // console.log({ locations });

  return (
    <Map
      {...viewState}
      // onMove={(evt) => setViewState(evt.viewState)}
      mapStyle='mapbox://styles/tuanpro2k2001/cl7k02op6005s14nyb17slg3g'
    >
      {locations?.map((location, idx) => (
        <Marker
          key={idx}
          longitude={location?.coordinates[0]}
          latitude={location?.coordinates[1]}
          offsetTop={-20}
          offsetLeft={-10}
          anchor='bottom'
          style={{ width: '40px', height: '40px' }}
        >
          <img src={pinMarker} alt='Marker' />
        </Marker>
      ))}
    </Map>
  );
};

export default Mapp;
