import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Weather1Day from './Weather1Day'

export default class Forecast extends React.Component {
    state = {
        forecast: []
    }
    componentDidMount() {
        this.getForecast(this.props.latitude, this.props.longitude,this.props.fahrenheit)
    }
  
    getForecast = async (lat, long) =>{
        let urlF =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=0e7a73517621332a46816ab76cf137d9`;  
        let urlC =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`;  
        let forecast = [];
        let weatherDay = {};
        try {
            let url = (this.state.fahrenheit ? urlF : urlC);
            let forecastData = await fetch(url);
            let forecastJSON = await forecastData.json();
            let day;
            // console.log("FORECAST STRUCTURE:", forecastJSON)
            forecastJSON.list.map((elem, i)=>{
            //"dt_txt": "2018-10-10 18:00:00",
            //for now just get noon
            if (elem.dt_txt.slice(11,13) == 12) {
                day = new Date(elem.dt_txt.slice(0,4), (elem.dt_txt.slice(5,7)-1), elem.dt_txt.slice(8,10))
                weatherDay = {"temp": elem.main.temp, "dayOW": this.getDayOfWeek(day), "icon": elem.weather[0].icon}
                // console.log(weatherDay, this.getDayOfWeek(day))
                forecast.push(weatherDay)
            }
            })
            // console.log(forecast)

            this.setState({forecast})  
        }
        catch(e) {
        console.log('error:', e)
        }
    }
    getDayOfWeek(date) {
        dayNames = ["Su","M","T","W","Th","F","Sa"]
        return (dayNames[date.getDay()]);
    }
    getCity = (city) =>{
        this.setState({city})
    }
    render() {
    
        return (    
            <View style={styles.twoPart}>

                {this.state.forecast.map((elem,i) => {
                    return(
                    <Weather1Day key = {i} icon = {elem.icon} temp = {elem.temp} fahrenheit = {elem.fahrenheit}/>
                )})}
            </View>
        );
    }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 20,
    backgroundColor: '#c1d9ff',
    // backgroundColor: 'pink'
  },
  top: {
    flex: .1,
    backgroundColor: '#eaf2ff',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  topText: {
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  shortCity: {
    alignSelf: 'flex-end',
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black'
  },
  longCity: {
    alignSelf: 'flex-end',
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black'
  },
  search: {
    flex: .2,
    backgroundColor: '#eaf2ff',
    width: '100%'
  },
  twoPart: {
    flex: .3,
    backgroundColor: "#c1d9ff",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottom: {
    flex: .6,
    backgroundColor: "#fff9c4",
    width: '100%'
  },
  botText: {
    // padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
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
