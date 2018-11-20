import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Forecast1Day from './Forecast1Day'

export default class Forecast extends React.Component {
    // state = {
    //     forecast: []
    // }
    // componentDidMount() {
    //     this.getForecast(this.props.lat, this.props.long,this.props.fahrenheit)
    // }
  
    // getForecast = async (lat,long) =>{
    //     console.log("inside getForecast:",this.props.lat, this.props.long)
    //     let urlF =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=0e7a73517621332a46816ab76cf137d9`;  
    //     let urlC =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`;  
    //     let forecast = [];
    //     let weatherDay = {};
    //     try {
    //         let url = (this.state.fahrenheit ? urlF : urlC);
    //         let forecastData = await fetch(url);
    //         let forecastJSON = await forecastData.json();
    //         let day;
    //         // console.log("FORECAST STRUCTURE:", forecastJSON);
    //         forecastJSON.list.map((elem, i)=>{
    //             //"dt_txt": "2018-10-10 18:00:00",
    //             //for now just get noon  -- later get high and low of day
    //             if (elem.dt_txt.slice(11,13) == 12) {
    //                 day = new Date(elem.dt_txt.slice(0,4), (elem.dt_txt.slice(5,7)-1), elem.dt_txt.slice(8,10))
    //                 weatherDay = {"temp": elem.main.temp, "dayOW": this.getDayOfWeek(day), "icon": elem.weather[0].icon}
    //                 console.log("WeatherDay:", weatherDay)
    //                 forecast.push(weatherDay)
    //             }
    //         })
    //         // console.log(forecast)

    //         this.setState({forecast})  
    //     }
    //     catch(e) {
    //     console.log('error:', e)
    //     }
    // }
    // getDayOfWeek(date) {
    //     dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    //     return (dayNames[date.getDay()]);
    // }
    // getCity = (city) =>{
    //     this.setState({city})
    // }
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
