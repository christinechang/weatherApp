import * as React from 'react';
import { Modal,Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'
import GeoPlacesInput2 from './GooglePlacesInput2'
// import Modal from './Modal'
import WeatherNow from './WeatherNow'
import Forecast from './Forecast'
import SearchBar from './SearchBar' 

export default class App extends React.Component {
  state = {
    fahrenheit: true,
    city: '',
    lat:0,
    long: 0,
    forecast:[]
  }

  componentDidMount() {
    //get current location
    navigator.geolocation.getCurrentPosition ( (suc, err) => {
      let long = suc.coords.longitude;
      let lat = suc.coords.latitude;
      this.getWeather(lat,long);
      this.getForecast(lat,long);
      })   
  }
  closeDropdown() {
    styles.searchBar.flex = .2
  }
  getWeather = async (lat, long) =>{
    console.log(`in getWeather, lat: ${lat}, long: ${long}`)
    let urlF =  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=0e7a73517621332a46816ab76cf137d9`  
    let urlC =  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`  
    try {
          let url = (this.state.fahrenheit ? urlF : urlC)
  	      let weather = await fetch(url);
          let weatherJSON = await weather.json();
          // console.log("WEATHER STRUCTURE:", weatherJSON)
          //set state with individual elements that you will need HERE
          //don't go deep into objects in state - will lead to early errors when undefined
  	      this.setState({
            temp:Math.round(weatherJSON.main.temp),
            icon:weatherJSON.weather[0].icon,
            city:weatherJSON.name,  //initial city name
            lat:lat,
            long:long
          }, ()=>{console.log(`state.lat: ${this.state.lat}, long: ${this.state.long}`)})
          this.closeDropdown();
  	    }
  	    catch(e) {
  	      console.log('error:', e)
  	    }
  }
  getForecast = async (lat,long) =>{
    let forecast = [];
    console.log("inside getForecast:",this.props.lat, this.props.long)
    let urlF =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=0e7a73517621332a46816ab76cf137d9`;  
    let urlC =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`;  
    let weatherDay = {};
    let dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    try {
        let url = (this.state.fahrenheit ? urlF : urlC);
        let fOrC = (this.state.fahrenheit ? " F" : " C");
        let forecastData = await fetch(url);
        let forecastJSON = await forecastData.json();
        let day;
        // console.log("FORECAST STRUCTURE:", forecastJSON);
        forecastJSON.list.map((elem, i)=>{
            //"dt_txt": "2018-10-10 18:00:00",
            //for now just get noon  -- later get high and low of day
            if (elem.dt_txt.slice(11,13) == 12) {
                day = new Date(elem.dt_txt.slice(0,4), (elem.dt_txt.slice(5,7)-1), elem.dt_txt.slice(8,10))
                weatherDay = {"temp": (Math.round(elem.main.temp) + fOrC), "dayOW": dayNames[day], "icon": elem.weather[0].icon}
                console.log("WeatherDay:", weatherDay)
                forecast.push(weatherDay)
            }
        })
        console.log("====FORECAST:",forecast)

        this.setState({forecast})  
    }
    catch(e) {
    console.log('error:', e)
    }
}
  getCity = (city) =>{
    this.setState({city})
  }
  render() {
    let imageURL = iconKey[this.state.icon];
    // console.log('iconURL', imageURL)
  
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLogo}> czc weather:  </Text>          
          <Text style={styles.titleCity}>{this.state.city}</Text>
        </View>
        <View style={styles.searchBar}>
          <GeoPlacesInput2 getWeather = {this.getWeather} getCity = {this.getCity} getForecast = {this.getForecast}/>
        </View>
        {/* <SearchBar style={styles.searchBar} getWeather = {this.getWeather} getCity = {this.getCity}/>
        {/* <SearchBar getWeather = {this.getWeather} getCity = {this.getCity}/> */}
        <View style={styles.weatherNow} >
          <WeatherNow icon = {this.state.icon} temp = {this.state.temp} fahrenheit = {this.state.fahrenheit}/>
        </View>
        <View style={styles.hourly} >
        </View>
        <View style={styles.forecast} >
          <Forecast forecast = {this.state.forecast}/>
        </View>
      </View>
    );
  }
}
// google places autocompete: This API project is not authorized to use thie API.  Please ensure this API is activated in the Google Developers Console: 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 20,
    backgroundColor: '#c1d9ff',
    // backgroundColor: 'pink'
  },
  title: {
    flex: .05,
    backgroundColor: '#eaf2ff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleCity: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  titleLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    // fontFamily: "'Pattaya', sans-serif",
    color: 'black',
  },
  search: {
    flex: .1,
    backgroundColor: '#eaf2ff',
    width: '100%',
    zIndex: 4
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
  },
  searchBar: {
    flex: .2,
    backgroundColor: 'lightgrey',
    width: '100%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  weatherNow: {
    backgroundColor: 'pink',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  hourly: {
    flex: .2,
    backgroundColor: 'pink',
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 4
  },
  forecast: {
    flex: .5,
    backgroundColor: 'tan',
    width: '100%',
  },
});
