import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'

export default class WeatherNow extends React.Component {

  render() {
   
    let imageURL = iconKey[this.props.icon];
  
    return (
      <View style={styles.weatherNow}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={{uri: imageURL}} />
        </View>
        <Text style = {styles.textDisplay}>
            {this.props.temp} {this.props.fahrenheit ? 'F' : 'C'}
        </Text>
        </View>
    );
  }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  weatherNow: {
    backgroundColor: "#c1d9ff",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid', 
    flex: .5,
    height: 150,
    width: 150, 
  },
  icon: {
    width: 150, 
    height: 150,
  },

  textDisplay: {
    flex: .4,
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
    fontSize: 40,
    width: 150, 
    height: 150,
  }
});
