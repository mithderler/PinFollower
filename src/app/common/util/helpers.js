/* global google */
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function getAndSetAddressByLatLng(
  { lat, lng },
  setValue,
  newAddressSearch = false
) {
  const latLng = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ latLng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      console.error('Google Status: ', status);
    } else {
      console.log('sonuz: ', results[0]);
      setValue({
        locationName: '',
        address: results[0].formatted_address,
        latLng: { lat, lng },
        newAddressSearch,
      });
    }
  });
}
