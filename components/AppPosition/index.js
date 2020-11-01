import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Header, Card, Input } from 'react-native-elements';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { actionCreators as actions } from './actions'

const AppPosition = (props) => {
  return (
    <View style={styles.container}>     
      <Header
        leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
      />
      <View>
        <Card>
            <Image
              resizeMode="cover"
              source={require('./EMI.png')}
            />
            <Text style={styles.title}>Seguimiento GPS</Text>
            <Text style={styles.subtitle}>{props.lastDate}</Text> 
        </Card>
        <Text>{"\n"}</Text>
        <Input placeholder="Ingrese su Identificador" label="Identificador" onChangeText={text => props.setPersonal(text)} defaultValue={props.idPersonal}></Input>
        <Text>{"\n"}</Text>
        <Text>Latitud: {props.lat}</Text>
        <Text>Longitud: {props.lon}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 15
  }
});

function mapStateToProps(state) {
  const {idPersonal,lastDate,lat,lon}=state;
  return {
    idPersonal,
    lastDate,
    lat,
    lon
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLocation: bindActionCreators(actions.setLocation, dispatch),
    setPersonal: bindActionCreators(actions.setPersonal, dispatch),
    setLastDate: bindActionCreators(actions.setLastDate, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPosition);

//export default AppPosition;