import * as firebase from "firebase"; // TODO import only firebase/app
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { history } from "./history";
import { Create } from "./pages/Create";
import { Lobby } from "./pages/Lobby";

const App = () => {
  const DBref = firebase.database().ref("rooms");
  DBref.on("value", function(snapshot) {
    console.warn(snapshot.val());
  });

  const writeUserData = () => {
    firebase
      .database()
      .ref("rooms/" + 123)
      .set({
        roomId: 123
      });
  };

  writeUserData();

  return (
    <div className="App">
      <Router history={history}>
        {/* <Route path={'/'} exact component={Main} /> */}
        <Route path={'/create'} exact component={Create} />
        {/* <Route path={'/join'} exact component={Join} /> */}
        <Route path={'/lobby/:lobbyId'} component={Lobby} />
        {/* <Route path={'/game'} exact component={Game} /> */}
        {/* <Route path={'/result'} exact component={Result} /> */}
      </Router>
    </div>
  );
}

export default App;
