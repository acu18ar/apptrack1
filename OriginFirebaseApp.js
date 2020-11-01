import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'
import 'firebase/firestore';
import AppPosition from './components/AppPosition'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './components/AppPosition/reducers'

const store = createStore(reducer); 

const firebaseConfig = {
  apiKey: "AIzaSyCOeHdXvGuqGb9qWDmQ35gKBAFWpKxB9bo",
  authDomain: "emi-gps.firebaseapp.com",
  databaseURL: "https://emi-gps.firebaseio.com",
  projectId: "emi-gps",
  storageBucket: "emi-gps.appspot.com",
  messagingSenderId: "318320003821",
  appId: "1:318320003821:web:f355c1b5d4155f8ca85ae4"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();
var tIntervalPostPosition=20;//segs
var startTime = Date.now();
var idPersonal="";
var first=true;

function storePositionMYSQL(id,lat,lon) {
  fetch(`http://192.168.1.13:8000/api/storePosition/asdf/-17.65/-677.988`)
  //.then((response) => console.log(response))
  .catch((error) => {
    console.error(error);
  });
}
const LOCATION_TRACKING = 'location-tracking';

const App = () => {
  startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log('tracking started?', hasStarted);
  };

  useEffect(() => {
    config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };
    config();
    setTimeout(()=>{
      startLocationTracking();
    },1000)
  }, []);
  return (
    <Provider store={store}>
      <AppPosition/>
    </Provider>
  );
}

export default App;

function getFormatDate() {
  var d = new Date,
  dformat = [d.getMonth()+1,
              d.getDate(),
              d.getFullYear()].join('/')+' '+
            [d.getHours(),
              d.getMinutes(),
              d.getSeconds()].join(':');
  return dformat;
}

function setLocation(location) {
  return {
      type: 'SET_LOCATION',
      location
  };
}

function setLastDate(lastDate) {
  return {
      type: 'SET_LAST_DATE',
      lastDate
  };
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (data) {
    const { locations } = data;
    var lat = locations[0].coords.latitude;
    var lon = locations[0].coords.longitude;
    store.dispatch(setLocation(locations[0]));

    var seconds = Math.floor((Date.now() - startTime)/1000);
    if (first) {
      first=!first;
      seconds=tIntervalPostPosition+1;
    }
    /*console.log(
      `${new Date(Date.now()).toLocaleString()}:: ${lat},${lon}`
    );*/
    if (seconds>=tIntervalPostPosition) {
      var id=store.getState()['idPersonal'];
      if (id=="") {
        id="Sin Nombre";
      }
      var dateNow=getFormatDate();
      store.dispatch(setLastDate('Ulimo Registro '+dateNow));
      //storePositionMYSQL(id,lat,lon);
      dbh.collection('personal').add({
        nombre:id,
        lat: lat,
        lon: lon,
        date: firebase.firestore.FieldValue.serverTimestamp()
      });
      startTime=Date.now();
    }
  }
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
});