import * as React from 'react';
import {Modal, Text, View, TouchableHighlight, Alert} from 'react-native';

export default class SearchBar extends React.Component{
    state = {
        modalVisible: false
    }
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={{marginTop: 10}}>
                <Modal 
                    // animationType = "slide"
                    transparent = {true}
                    visible = {this.state.modalVisible}
                    presentationStyle = {"overFullScreen"}
                    onRequestClose = {()=> {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 45,backgroundColor:'white',flex:.1}}>
                        <View>
                            <Text> Hello World!</Text>
                            <TouchableHighlight
                                onPress= {() => {
                                    this.setModalVisible(!this.state.modalVisible )
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight style= {{ flex: .2,
      backgroundColor: 'pink', width: '100%'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style= {{ 
      backgroundColor: 'pink', width: '100%'}}>..........Show Modal.........</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
