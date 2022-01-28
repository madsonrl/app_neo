import React, { useState } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';

import hands from './assets/handshake.png'
import jumpIcon from './assets/high-five.png'
import danceIcon from './assets/dance.png'
import dance2Icon from './assets/dance2.png'
import dance3Icon from './assets/neo.png'
import fighting from './assets/fighting.png'
import iccrLogo from './assets/icct.png'


export default function App() {

  const [buttonAction, setButtonAction] = useState(false);

  const ws = new WebSocket('ws://192.168.0.32:9500');
  

  function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }

  ws.onmessage = (e) => {
    // a message was received
    console.log("recebido:",e.data);

    let recv = e.data;

    if(recv == "0"){
      setButtonAction(false);
    }

  };



  const setCommand = async (command) => {
    setButtonAction(true);
    ws.send(command);

  }

  return (
    <SafeAreaView style={styles.container}>

      <Image source={iccrLogo} style={styles.imgLogo} />

      <View style={styles.boxButtons} >

        <View style={styles.pairButtons}>

          <TouchableOpacity
            disabled={buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("60")}
          >
            <Image source={dance3Icon} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>Matrix</Text>
          </TouchableOpacity>



          <TouchableOpacity
            disabled = {buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("20")}
          >
            <Image source={jumpIcon} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>High 5</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.pairButtons}>

          <TouchableOpacity
            disabled = {buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("30")}
          >
            <Image source={danceIcon} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>Dance 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled = {buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("40")}
          >
            <Image source={dance2Icon} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>Dance 2</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.pairButtons}>

          <TouchableOpacity
            disabled = {buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("10")}
          >
            <Image source={hands} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>Shake Hand</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled = {buttonAction}
            style={styles.buttonShakeHand}
            onPress={() => setCommand("50")}
          >
            <Image source={fighting} style={styles.imgShakeHand} />
            <Text style={styles.textShakeHand}>Fight</Text>
          </TouchableOpacity>

        </View>

      </View>

      <Text style={styles.textTitle}>NeoRobot Controls</Text>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030c3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgLogo: {
    width: 160,
    height: 80,
  },

  textTitle: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 20
  },

  boxButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  pairButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonShakeHand: {
    alignItems: "center",
    backgroundColor: "#2bc389",
    padding: 30,
    borderRadius: 20,
    margin: 20,

  },

  imgShakeHand: {
    width: 80,
    height: 80,
  },

  textShakeHand: {
    color: "white",
    fontWeight: 'bold'
  }

});
