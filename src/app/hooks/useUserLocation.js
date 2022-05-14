/* global google */
import { useState, useEffect } from 'react';

const initLocation = { lat: 46.959, lng: 7.45 };

const useUserLocation = () => {
  const [userLatLng, setUserLatLng] = useState(initLocation);
  const [userAddress, setUserAddress] = useState('');
  console.log('usrAAAAAAAAAAA: ', userAddress);

  function getAddress(lat, lng) {
    const latLng = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ latLng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        console.log('Google Status: ', status);
      } else {
        setUserAddress(results[0].formatted_address);
      }
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLatLng({ lat, lng });
          getAddress(lat, lng);
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
  }, []);

  return { userLatLng, userAddress };
};

export default useUserLocation;
