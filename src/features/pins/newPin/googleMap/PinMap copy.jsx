/* global google */
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api';
import { useField } from 'formik';
import { authActions } from '../../../auth/authReducer';
import { useDispatch } from 'react-redux';

const defaultZoom = 12;

function PinMap({ userLatLng, userAddress, ...props }) {
  const [field, meta, helpers] = useField(props);

  /* 
  if (userLatLng) {
    // console.log('inside');
    meta.value.address = userAddress;
    meta.value.latLng = userLatLng;
    meta.value.newAddressSearch = true;
    // console.log('metaaa: ', meta.value);
    // helpers.setValue({
    //   address: userAddress,
    //   latLng: userLatLng,
    //   newAddressSearch: true,
    // });
  }
*/
  const [center, setCenter] = useState(userLatLng);
  const [zoom, setZoom] = useState(defaultZoom);
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_API_KEY,
  //   libraries,
  // });

  useEffect(() => {
    // console.log('usrLTLNg: ', userLatLng);
    // if (userLatLng) {
    console.log('insidee');
    helpers.setValue({
      address: userAddress,
      latLng: userLatLng,
      newAddressSearch: true,
    });
    // }
  }, []);

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions}
        zoom={zoom}
        onClick={handleMapClick}
        center={center}
      >
        <>
          <Marker position={meta.value.latLng || center} />
        </>
      </GoogleMap>
    );
  }
}

export default PinMap;
