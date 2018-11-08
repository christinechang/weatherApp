import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import api_key from './config.js'

export default ({getWeather, getCity}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // 
      listViewDisplayed= {false}    // true/false/undefined  --needs to be false for list view to close after selection
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        getWeather(details.geometry.location.lat,details.geometry.location.lng);
        // getForecast(details.geometry.location.lat,details.geometry.location.lng);
        // console.log("LOCATION++++++++++++++:",details);
        getCity(details.address_components[0].long_name);
        data = '';        
      }}
      closeOnEndEditing={true}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: api_key.api_google_maps,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        }
      }}
      
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
    //   renderRightButton={() => <Text>Custom text after the input</Text>}
    />
  );
}