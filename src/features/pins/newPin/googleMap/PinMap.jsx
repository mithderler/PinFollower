/* global google */
import React, { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import { useField } from 'formik';

const defaultZoom = 12;
const initLocation = { lat: 46.959, lng: 7.45 };

function PinMap({ ...props }) {
  const [field, meta, helpers] = useField(props);
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  const [userLatLng, setUserLatLng] = useState(initLocation);
  const searchRef = useRef();
  const [center, setCenter] = useState(userLatLng);
  const [zoom, setZoom] = useState(defaultZoom);

  // if user searchs new address, find it on the map
  // if user click the map, get location info
  useEffect(() => {
    if (meta.value.latLng && meta.value.newAddressSearch) {
      setCenter(meta.value.latLng);
      setZoom(() => defaultZoom);
    }
    if (meta.value.latLng && !meta.value.newAddressSearch) {
      const { lat, lng } = meta.value.latLng;
      const latLng = new google.maps.LatLng(lat, lng);
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ latLng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          console.log('Google Status: ', status);
        } else {
          console.log('RESULTTTT: ', results);
          const address = results[0].formatted_address;
          helpers.setValue({
            latLng: { lat, lng },
            address,
            newAddressSearch: false,
          });
        }
      });
    }
  }, [meta.value.latLng]);

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  const Spinner = () => <div>Loading...</div>;

  const handleMapLoad = (map) => {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newlatLng = { lat, lng };
          setUserLatLng(newlatLng);

          const latLng = new google.maps.LatLng(lat, lng);
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode({ latLng }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK) {
              console.log('Google Status: ', status);
            } else {
              // setAddress2(results[0].formatted_address);
              helpers.setValue({
                address: results[0].formatted_address,
                latLng: newlatLng,
                newAddressSearch: true,
              });
            }
          });
        },
        (err) => console.error(err),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log('Something went wrong (navigator.geolocation)');
    }
  };

  const handleMapClick = (e) => {
    console.log('clikk: ', e.latLng.toJSON());
    helpers.setValue({
      latLng: e.latLng.toJSON(),
      address: '',
      newAddressSearch: false,
    });
  };

  const onSearchLoad = React.useCallback((search) => {
    searchRef.current = search;
  }, []);

  const onPlacesChanged = () => {
    const addressName = searchRef.current.getPlaces()[0].name;
    const formattedAddress = searchRef.current.getPlaces()[0].formatted_address;
    const address = `${addressName}, ${formattedAddress}`;

    const { lat, lng } = searchRef.current.getPlaces()[0].geometry.location;
    const latLng = {
      lat: lat(),
      lng: lng(),
    };

    helpers.setValue({
      address,
      latLng,
      newAddressSearch: true,
    });
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  if (isLoaded) {
    return (
      <div className='space-y-3'>
        <StandaloneSearchBox
          onLoad={onSearchLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            value={field.value['address']}
            onChange={(e) =>
              helpers.setValue({ ...meta.value, address: e.target.value })
            }
            className='box-border border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline text-ellipsis'
            type='text'
            placeholder='Customized your placeholder'
          />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={mapOptions}
          zoom={zoom}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
          center={center}
        >
          <>
            <Marker position={meta.value.latLng || center} />
          </>
        </GoogleMap>
      </div>
    );
  }
}

export default PinMap;
