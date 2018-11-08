import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {iconKey} from './iconKey'
import GeoPlacesInput2 from './GooglePlacesInput2'
// import Modal from './Modal'
import Weather1Day from './Weather1Day'
import Forecast from './Forecast'

export default class App extends React.Component {
  state = {
    fahrenheit: true,
    city: '',
    city1: ''   //note - there are short city names and long city names.  not always same, not always correct
  }
  

  componentDidMount() {
    // console.log("componentDidMount");

    navigator.geolocation.getCurrentPosition ( (suc, err) => {
      //  console.log("=====location info ===== ", suc, ":" , err)
        let long = suc.coords.longitude;
        let lat = suc.coords.latitude;
        this.getWeather(lat,long);
        console.log("geolocation: ", suc)
        })   
  }
  getWeather = async (lat, long) =>{
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
            temp:weatherJSON.main.temp,
            icon:weatherJSON.weather[0].icon,
            lat,
            long,
            city1:weatherJSON.name  //initial city name
          })
  	    }
  	    catch(e) {
  	      console.log('error:', e)
  	    }
  }
  // getForecast = async (lat, long) =>{
  //   let urlF =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=0e7a73517621332a46816ab76cf137d9`;  
  //   let urlC =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`;  
  //   let forecast = [];
  //   let weatherDay = {};
  //   try {
  //       let url = (this.state.fahrenheit ? urlF : urlC);
  //       let forecastData = await fetch(url);
  //       let forecastJSON = await forecastData.json();
  //       let day;
  //       // console.log("FORECAST STRUCTURE:", forecastJSON)
  //       forecastJSON.list.map((elem, i)=>{
  //         //"dt_txt": "2018-10-10 18:00:00",
  //         //for now just get noon
  //         if (elem.dt_txt.slice(11,13) == 12) {
  //           day = new Date(elem.dt_txt.slice(0,4), (elem.dt_txt.slice(5,7)-1), elem.dt_txt.slice(8,10))
  //           weatherDay = {"temp": elem.main.temp, "dayOW": this.getDayOfWeek(day), "icon": elem.weather[0].icon}
  //           // console.log(weatherDay, this.getDayOfWeek(day))
  //           forecast.push(weatherDay)
  //         }
  //       })
  //       // console.log(forecast)

  //       this.setState({forecast})
  //   }
  //   catch(e) {
  //     console.log('error:', e)
  //   }
  // }
  // getDayOfWeek(date) {
  //   dayNames = ["Su","M","T","W","Th","F","Sa"]
  //   return (dayNames[date.getDay()]);
  // }
  getCity = (city) =>{
    this.setState({city})
  }
  render() {
    let imageURL = iconKey[this.state.icon];
    // console.log('iconURL', imageURL)
    let cityStyle = styles.shortCity;
    if (this.state.city && this.state.city.length > 12) {
      cityStyle =  styles.longCity
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}> czc weather:  </Text>          
          <Text style={cityStyle}>{this.state.city||this.state.city1}</Text>
        </View>
        <View style={styles.search}>
          <GeoPlacesInput2 getWeather = {this.getWeather} getCity = {this.getCity}/>
        </View>
        {/* <Modal></Modal> */}

        <Weather1Day icon = {this.state.icon} temp = {this.state.temp} fahrenheit = {this.state.fahrenheit}/>

        <View style={styles.twoPart}>
          <Forecast latitude = {this.state.lat} longitude = {this.state.long} fahrenheit = {this.state.fahrenheit}/>
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
  top: {
    flex: .1,
    backgroundColor: '#eaf2ff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    // alignSelf: 'flex-end',
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black'
  },
  longCity: {
    // alignSelf: 'flex-end',
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black'
  },
  search: {
    flex: .1,
    backgroundColor: '#eaf2ff',
    width: '100%',
    zIndex: 4
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
