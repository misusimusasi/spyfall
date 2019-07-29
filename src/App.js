import React from "react";
import * as firebase from "firebase"; // TODO import only firebase/app
import "./App.css";

function App() {
  const DBref = firebase.database().ref('rooms');
  DBref.on("value", function(snapshot) {
    console.warn(snapshot.val());
  });

  const writeUserData = () => {
    firebase.database().ref('rooms/' + 123).set({
      roomId: 123,
    });
  }

  writeUserData();
  
  return <div className="App" />;
}

export default App;
