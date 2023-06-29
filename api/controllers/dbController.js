const { connectionToDatabase } = require('../config/conn');

exports.user_exist = async (req, res, next) => {
    const { username } = req.body;

    // console.log(username, password);

    const db = await connectionToDatabase();
    let collection = await db.collection('users');
    let query = { username:username };

    let result = await collection.findOne(query);

    if(result){
        return res.sendStatus(200);
    }
    else {
        next();
    }
}

exports.new_user = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        bestTime: 0.0,
        idSkin: 1,
    }

    const db = await connectionToDatabase();
    let collection = await db.collection('users');
    let result = await collection.insertOne(newUser);

    // console.log(result);

    return res.sendStatus(201);
}

exports.find_user = async (req, res, next) => {
    const { username } = req.body;
    const db = await connectionToDatabase();

    let collection = await db.collection('users');
    let query = { username:username };

    let result = await collection.findOne(query);

    if(result){
        res.locals.result = result;
        next();
    }
    else {
        return res.status(200).json({ find: false });
    }
}

exports.get_ranking = async (req, res) => {
    const db = await connectionToDatabase();
    let collection = await db.collection('users');

    const query = {};

    const options = {
        sort: { bestTime: -1 },
        limit: 10,
        projection: { _id: 0, username: 1, bestTime: 1 },
    };

    const cursor = collection.find(query, options);

    let resp = { rank: [] };

    for await (const doc of cursor){
        resp.rank.push(doc);
    }

    // console.log(resp);

    return res.status(200).json(resp);
}

exports.user_update = async (req, res) => {
    try{
        const { userData } = req.body;

        const db = await connectionToDatabase();
        let collection = await db.collection('users');

        let query = { username:userData.username };
        let updates = {
            $set: {
                idSkin: userData.idSkin,
                bestTime: userData.bestTime
            },
        };

        let result = await collection.updateOne(query, updates);
        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500); //Internal Server Error
    }
}