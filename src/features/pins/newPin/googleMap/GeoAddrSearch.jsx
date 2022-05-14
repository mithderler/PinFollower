import React from 'react';
import { useField } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoLocation } from 'react-icons/go';

import TextInput from '../../../../app/common/form/TextInput';

function GeoAddrSearch({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        helpers.setValue({ address, latLng, newAddressSearch: true });
      })
      .catch((error) => helpers.setError(error));
  };

  // function handleBlur(e) {
  //   field.onBlur(e);
  //   if (!field.value.latLng) {
  //     helpers.setValue({ address: '', latLng: null, newAddressSearch: false });
  //   }
  // }

  return (
    <PlacesAutocomplete
      value={field.value['address']}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      // googleCallbackName='initMap'
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <TextInput
            {...getInputProps({
              name: field.name,
              // onBlur: (e) => handleBlur(e),
              ...props,
            })}
          />
          {meta.touched && meta.error ? (
            <label basic color='red' style={{ border: 0 }}>
              * {meta.error['address']}
            </label>
          ) : null}
          {suggestions?.length > 0 && (
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? {
                      backgroundColor: '#eee',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }
                  : { backgroundColor: '#fefefe', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.placeId}
                    className='flex items-center px-2 py-2 border-b'
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <GoLocation />
                    <span className='ml-2'>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </PlacesAutocomplete>
  );
}

export default GeoAddrSearch;
