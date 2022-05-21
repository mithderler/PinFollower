/* global google */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import { useField } from 'formik';

import { getAndSetAddressByLatLng } from '../../../../app/common/utils/helpers';

const defaultZoom = 12;
const initLocation = { lat: 46.959, lng: 7.45 };
const emptyFields = {
  locationName: '',
  address: '',
  latLng: null,
  newAddressSearch: false,
};

function PinMap({ ...props }) {
  const [field, meta, helpers] = useField(props);
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  const [userLatLng, setUserLatLng] = useState(initLocation);
  const searchRef = useRef();
  const mapRef = useRef();
  const [center, setCenter] = useState(userLatLng);
  const [zoom, setZoom] = useState(defaultZoom);
  const { setValue, setError, setTouched } = helpers;

  // if user searchs new address, find it on the map
  // if user click the map, get location info
  useEffect(() => {
    if (meta.value.latLng && meta.value.newAddressSearch) {
      setCenter(meta.value.latLng);
      if (zoom !== defaultZoom) {
        setZoom(defaultZoom);
      }
    }
    if (meta.value.latLng && !meta.value.newAddressSearch) {
      const { lat, lng } = meta.value.latLng;
      getAndSetAddressByLatLng({ lat, lng }, setValue);
    }
  }, [meta.value.latLng]);

  const Spinner = () => <div>Loading...</div>;

  // GoogleMap
  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  // GoogleMap functions
  const handleMapLoad = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLatLng({ lat, lng });

          getAndSetAddressByLatLng({ lat, lng }, setValue, true);
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
    setValue({
      latLng: e.latLng.toJSON(),
      locationName: '',
      address: '',
      newAddressSearch: false,
    });
  };

  const handleZoomChange = () => {
    if (mapRef.current !== null) {
      const newZoom = mapRef.current?.state.map.zoom;
      setZoom(newZoom);
    }
  };

  // Input StandaloneSearchBox functions
  const onSearchLoad = useCallback((search) => {
    searchRef.current = search;
  }, []);

  const onPlacesChanged = () => {
    const locationName = searchRef.current.getPlaces()[0].name;
    const address = searchRef.current.getPlaces()[0].formatted_address;
    console.log('arama adresi: ', searchRef.current.getPlaces()[0]);
    const { lat, lng } = searchRef.current.getPlaces()[0].geometry.location;
    const latLng = {
      lat: lat(),
      lng: lng(),
    };

    setValue({
      locationName,
      address,
      latLng,
      newAddressSearch: true,
    });
  };
  console.log('METAA: ', meta.value);
  const handleCancelAddress = (e) => {
    setValue(emptyFields);
    e.target.parentNode.firstChild.focus();
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
          <div className='relative group'>
            <input
              value={`${
                meta.value.locationName && field.value['locationName'] + ', '
              }${field.value['address']}`}
              onChange={(e) =>
                setValue({ ...meta.value, address: e.target.value })
              }
              className='box-border border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline text-ellipsis placeholder:italic placeholder:text-xs md:placeholder:text-sm'
              type='text'
              placeholder='Enter location'
            />
            <span
              className='absolute text-second font-semibold right-3 top-3 z-20 hidden group-hover:inline-block cursor-pointer'
              onClick={handleCancelAddress}
            >
              X
            </span>
          </div>
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={mapOptions}
          zoom={zoom}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
          onZoomChanged={handleZoomChange}
          center={center}
          ref={mapRef}
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
