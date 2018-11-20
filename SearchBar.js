import * as React from 'react';
import {Modal, Text, View,  Alert} from 'react-native';
import GeoPlacesInput2 from './GooglePlacesInput2'


export default class SearchBar extends React.Component{
    render() {
        return (
            <View style={{marginTop: 10, flex:.1}}>
                {/* <Text>This (above)is what changes the height of dropdown need to change flex</Text> */}
                <Modal 
                    // animationType = "slide"
                    transparent = {true}
                    visible = {true}
                    presentationStyle = {"overFullScreen"}
                    >
                    <View style={{margin:4, marginTop: 50,flex:.3}}>
                    {/* need above flex to allow for dropdown */}
                        <GeoPlacesInput2 getWeather = {this.props.getWeather} getCity = {this.props.getCity}/>
                    </View>
                </Modal>
               
            </View>
        )
    }
}
// const styles = StyleSheet.create({
//     searchBar: {
//         flex: .08,
//         backgroundColor: 'green',
//         width: '100%'
//     }
// });
