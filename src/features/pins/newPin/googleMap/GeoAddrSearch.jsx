import { useField } from 'formik';
import React, { useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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

  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({ address: '', latLng: null, newAddressSearch: false });
    }
  }

  return (
    <PlacesAutocomplete
      value={field.value['address']}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <TextInput
            {...getInputProps({
              name: field.name,
              onBlur: (e) => handleBlur(e),
              ...props,
            })}
          />
          {meta.touched && meta.error ? (
            <label basic color='red' style={{ border: 0 }}>
              * {meta.error['address']}
            </label>
          ) : null}
          {suggestions?.length > 0 && (
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
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
