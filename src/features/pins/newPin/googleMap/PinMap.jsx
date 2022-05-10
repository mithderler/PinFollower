/* global google */
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from '@react-google-maps/api';
import { useField } from 'formik';

const defaultZoom = 12;

function PinMap({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [center, setCenter] = useState({ lat: 46.959, lng: 7.45 });
  const [zoom, setZoom] = useState(defaultZoom);
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  useEffect(() => {
    console.log('meta: ', meta);

    if (meta.value.latLng && meta.value.newAddressSearch) {
      setCenter(meta.value.latLng);
      setZoom(defaultZoom);
    }
    if (meta.value.latLng && !meta.value.newAddressSearch) {
      const { lat, lng } = meta.value.latLng;
      const latLng = new google.maps.LatLng(lat, lng);
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ latLng }, (results, status) => {
        console.log('results: ', results);
        if (status !== google.maps.GeocoderStatus.OK) {
          console.log('Google Status: ', status);
        } else {
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

  const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  const Spinner = () => <div>Loading...</div>;

  const handleMapClick = (e) => {
    helpers.setValue({
      latLng: e.latLng.toJSON(),
      address: '',
      newAddressSearch: false,
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
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={options}
          zoom={zoom}
          onClick={handleMapClick}
          center={center}
        >
          <>
            <Marker position={meta.value.latLng || center} />
          </>
        </GoogleMap>
        {/* <div className='my-4'>Address: {meta.value?.address}</div>
        <div>Lat: {meta.value.latLng?.lat}</div>
        <div>Lng: {meta.value.latLng?.lng}</div> */}
      </>
    );
  }
}

export default PinMap;
