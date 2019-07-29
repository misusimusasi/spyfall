import React, { useState, useEffect, FC } from "react";
import * as firebase from "firebase"; // TODO import only firebase/app

interface LobbyProps {
  history: History;
  match: any;
}

export const Lobby: FC<LobbyProps> = ({ history, match }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const DBref = firebase.database().ref("rooms/" + match.params.lobbyId);
    DBref.on("value", function(snapshot) {
      console.warn(snapshot.val());
      snapshot.val() && setPlayers(snapshot.val().players);
    });
  }, []);

  return (
    <div className="lobby">
      {players && players.map((player, i) => {
        return <div key={i}>{player}</div>;
      })}
    </div>
  );
};
