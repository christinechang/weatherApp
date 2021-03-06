import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import api_key from './config.js'

export default class GooglePlacesInput extends React.Component {
render () {
    return (
    <GooglePlacesAutocomplete
      placeholder='Search City'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        this.props.getWeather(details.geometry.location.lat,details.geometry.location.lng) // 'details' is provided when fetchDetails = true
        console.log("details:",details)
      }}
      
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
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

 
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={}
 
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
 
    />
    )
}
}