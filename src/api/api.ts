export const API = {
    createLobby: (playerId: string): Promise<any> => fetch(
        'https://us-central1-spyfall-for-trainers.cloudfunctions.net/createLobby',
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({playerId})
        }
    ).then(res => res.json()),

    startGame: (lobbyId: string): Promise<Response> => fetch(
        'https://us-central1-spyfall-for-trainers.cloudfunctions.net/startGame',
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({lobbyId})
        }
    ),

    joinLobby: (playerId: string, lobbyId: string): Promise<Response> => fetch(
        'https://us-central1-spyfall-for-trainers.cloudfunctions.net/joinLobby',
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({playerId, lobbyId})
        }
    )
}