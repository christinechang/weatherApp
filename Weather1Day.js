import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'

export default class Weather1Day extends React.Component {

  render() {
   
    let imageURL = iconKey[this.props.icon];
  
    return (
        <View style={styles.twoPart}>
            <View  style = {styles.iconContainer}>
                <Image style={styles.icon} source={{uri: imageURL}} />
            </View>
            <View  style = {styles.tempContainer}>
            <Text style = {styles.tempDisplay}>
                {this.props.temp} {this.props.fahrenheit ? 'F' : 'C'}
            </Text>
            </View>
        </View>
    );
  }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  twoPart: {
    flex: .3,
    backgroundColor: "#c1d9ff",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  icon: {
    width: 150, 
    height: 150,
  },
  tempContainer: {
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  tempDisplay: {
    fontSize: 50,
  }
});
