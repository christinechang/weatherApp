import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import GeoPlacesInput from './GooglePlacesInput'
import {iconKey} from './iconKey'

export default class App extends React.Component {
  state = {

  }

  getLatLong = (lat,long) => {
    this.setState({long, lat})
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition ( (suc, err) => {
       // console.log(suc, ":" , err)
        let long = suc.coords.longitude;
        let lat = suc.coords.latitude;
        this.getWeather(lat,long);
        this.setState({long, lat})
        })   
  }
  getWeather = async (lat,long) =>{
    let url =  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=0e7a73517621332a46816ab76cf137d9`  
    try {
  	      let weather = await fetch(url);
  	      
          let weatherJSON = await weather.json();
          console.log("WEATHER STRUCTURE:", weatherJSON)
          //set state with individual elements that you will need HERE
          //don't go deep into objects in state - will lead to early errors when undefined
  	      this.setState({temp:weatherJSON.main.temp})
          this.setState({icon:weatherJSON.weather[0].icon})
  	    }
  	    catch(e) {
  	      console.log('error:', e)
  	    }


  }
  render() {
    let iconNum = this.state.icon;
    let imageURL = iconKey[iconNum];
    console.log('iconURL', imageURL)
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>
            czc weather
          </Text>          
        </View>
        <View style={styles.search}>
          <GeoPlacesInput getLatLong = {this.getLatLong}/>
        </View>
        <View style={styles.twoPart}>
          <Image style={styles.icon} source={{uri: imageURL}}
               />
                         <Image style={styles.icon} source={{uri: imageURL}}
               />
        </View>
        <View style={styles.bottom}>
          <Text style = {styles.botText}>
          long: {this.state.long}
          </Text>
          <Text style = {styles.botText}>
          lat: {this.state.lat}
          </Text>
          <Text style = {styles.botText}>
          temp: {this.state.temp}
          </Text>
          <Text style = {styles.botText}>
          icon number: {this.state.icon}
          </Text>
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
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 20,
    backgroundColor: '#c1d9ff',
    // backgroundColor: 'pink'
  },
  top: {
    flex: .1,
    backgroundColor: '#eaf2ff',
    width: '100%'
  },
  topText: {
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },

  // topButton: {
  //   title: 'button'
  // },
  search: {
    flex: .07,
    backgroundColor: '#eaf2ff',
    width: '100%'
  },
  twoPart: {
    flex: .3,
    backgroundColor: "#c1d9ff",
    width: '100%',
    flexDirection: 'row'
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
  icon: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
    width: 150, 
    height: 150
  }
});
