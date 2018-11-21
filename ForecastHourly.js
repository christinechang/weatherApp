import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
// import Forecast1Hour from './Forecast1Hour'
import {iconKey} from './iconKey'

export default class ForecastHourly extends React.Component {
   
    render() {
        console.log("=====WEATHER 1 HOUR", this.props.weatherHours)
        return (    
            <ScrollView style={styles.hourly} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}>
                {/* loop through all hours */}
                    {/* // <Forecast1Hour key = {i} icon = {elem.icon} temp = {elem.temp} hour = {elem.hour}/>  */}
                    {this.props.weatherHours.map((elem,i) => {
                        console.log("iconKey:", iconKey[elem.icon])
                        return (
                        <View key = {i} style={styles.weather1Hour}>
                            <View  style = {styles.weather1HourTime}>
                                <Text style = {styles.textDisplay}>
                                    {elem.hour}
                                </Text>
                            </View>
                            <View  style = {styles.weather1HourIcon}>
                                <Image style={styles.icon} source={{uri: iconKey[elem.icon]}} />
                            </View>
                            <View  style = {styles.weather1HourTemp}>
                                <Text style = {styles.textDisplay}>
                                    {elem.temp}
                                </Text>
                            </View>
                        </View>
                    )})}
            </ScrollView>
        );
    }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  hourly: {
    // width: '100%',
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'orange'
  },
  weather1Hour: {
    flex:1,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid'
  },
  weather1HourTime: {
    flex:.2,
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid'
  },
  weather1HourIcon: {
    flex:.6,
    width: 50,
    // height: 200
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid'
  },
  weather1HourTemp: {
    flex:.2,
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid'
  },
  textDisplay: {
    fontSize: 12,
  },
  icon: {
    width: 50, 
    height: 50,
  },
});
