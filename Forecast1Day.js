import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'

export default class Forecast1Day extends React.Component {

  render() {
   
    let imageURL = iconKey[this.props.icon];
  
    return (
        <View style={styles.forecast1Day}>
            <View  style = {styles.dayOWContainer}>
              <Text style = {styles.textDisplay}>
                  {this.props.dayOW}
              </Text>
            </View>
            <View  style = {styles.iconContainer}>
                <Image style={styles.icon} source={{uri: imageURL}} />
            </View>
            <View  style = {styles.tempContainer}>
              <Text style = {styles.textDisplay}>
                  {this.props.temp}
              </Text>
            </View>
        </View>
    );
  }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  forecast1Day: {
    backgroundColor: "#c1d9ff",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center'
  },
  icon: {
    width: 50, 
    height: 50,
  },
  tempContainer: {
    flex: .4,
    justifyContent: 'center',
  },
  dayOWContainer: {
    flex: .4,
    justifyContent: 'center',
  },
  // textDisplay: {
  //   fontSize: 50,
  // }
});
