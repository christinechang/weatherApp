import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'

export default class WeatherNow extends React.Component {

  render() {
   
    let imageURL = iconKey[this.props.icon];
  
    return (
      <View style={styles.weatherNow}>
        <View style = {styles.textContainer}>
          <Text style = {styles.textDisplay}>
              {this.props.temp}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={{uri: imageURL}} />
        </View>
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
    flex: .5,
  },
  icon: {
    width: 150, 
    height: 150,
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textDisplay: {
    flex: .4,
    fontSize: 40,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});
