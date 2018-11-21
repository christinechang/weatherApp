import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Forecast1Day from './Forecast1Day'

export default class Forecast extends React.Component {
   
    render() {
        return (    
            <View style={styles.forecast}>
                {this.props.forecast.map((elem,i) => {
                    return(
                    <Forecast1Day key = {i} icon = {elem.icon} temp = {elem.temp} fahrenheit = {elem.fahrenheit} dayOW = {elem.dayOW}/>
                )})}
            </View>
        );
    }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  forecast: {
    width: '100%',
    flex: 1
  }
});
