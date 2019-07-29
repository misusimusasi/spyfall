import React, { FC } from "react";
import * as firebase from "firebase"; // TODO import only firebase/app
import { History } from "history";

interface FormElements extends HTMLFormElement {
  playerId: HTMLInputElement;
}

interface CreateProps {
  history: History;
}

export const Create: FC<CreateProps> = ({ history }) => {
  const createLobby = (e: React.FormEvent<FormElements>) => {
    e.preventDefault();

    const newLobbyId =  Math.round(Math.random() * 10000);
  
    firebase
      .database()
      .ref("rooms/" + newLobbyId)
      .set({
        roomId: newLobbyId,
        players: [
          e.currentTarget.playerId.value
        ]
      });

    history.push("/lobby/" + newLobbyId);
  };

  return (
    <div className="create">
      <form onSubmit={createLobby}>
        <label htmlFor="playerId">Player name</label>
        <input name="playerId" id="playerId" />
        <button>Создать</button>
      </form>
    </div>
  );
};
