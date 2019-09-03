const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true,
  });
admin.initializeApp();

exports.getRooms = functions.https.onRequest(async (request, response) => {
    const rooms = await admin.database().ref('rooms').once('value');

    // tslint:disable-next-line: no-shadowed-variable
    return cors(request, response, () => {
        response.status(200).send(rooms);
    })
});

// POST 
// params: { playerId: string }
exports.createLobby = functions.https.onRequest(async (request, response) => {
    const { playerId } = request.body;
    console.log(playerId)

    const newLobbyId = Math.round(Math.random() * 10000).toString();

    await admin
        .database()
        .ref('rooms/' + newLobbyId)
        .set({
            roomId: newLobbyId,
            players: {[playerId]: ''},
            process: 'prepare',
        })
    // tslint:disable-next-line: no-shadowed-variable
    return cors(request, response, () => {
        response.status(200).send(newLobbyId);
    })
});

// POST 
// params: { playerId: string, lobbyId: string }
exports.joinLobby = functions.https.onRequest(async (request, response) => {
    const { playerId, lobbyId } = request.body;
    console.log(playerId, lobbyId)

    await admin
        .database()
        .ref('rooms/' + lobbyId + '/players')
        .update({
            [playerId]: '',
        });

    // tslint:disable-next-line: no-shadowed-variable
    return cors(request, response, () => {
        response.status(200).send('Game joined');
    })
});


// POST 
// params: { lobbyId: string }
exports.startGame = functions.https.onRequest(async (request, response) => {
    const { lobbyId } = request.body;
    console.log(lobbyId)
    if (lobbyId) {

        const LOCATIONS_LIST = ['WORK', 'HOME', 'STREET'];
        const ROLES_LIST = ['NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY'];

        const shuffle = (arr) => {
            let j, temp;
            for (let i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
            return arr;
        };

        const players = await admin.database().ref('rooms/' + lobbyId + '/players').once('value').then(snap => snap.val());
        console.log(players)

        const playersId = Object.keys(players);
        console.log(playersId)

        let roles = ROLES_LIST.slice(0, playersId.length - 1);
        roles.push('SPY');
        roles = shuffle(roles);
        const gameLocation = LOCATIONS_LIST[Math.floor(Math.random() * LOCATIONS_LIST.length)];

        for (const player in players) {
            console.log(players[player])
            players[player] = roles.pop();
        }

        await admin
            .database()
            .ref('rooms/' + lobbyId)
            .set({
                process: 'game',
                players,
                gameLocation,
                endTime: new Date(new Date().getTime() + 60000 * 6).getTime().toString()
            })
        
        setTimeout(() => {
            admin
                .database()
                .ref('rooms/' + lobbyId)
                .update({process: 'result'})
            }, 60000 * 6);
    }

    // tslint:disable-next-line: no-shadowed-variable
    return cors(request, response, () => {
        response.status(200).send('Game started');
    })
});