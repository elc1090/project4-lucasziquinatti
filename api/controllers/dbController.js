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
    return res.status(200).json({
        rank: [
            {
                username: 'testeBot',
                bestTime: 150,
            },
            {
                username: 'Lucas',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
            {
                username: 'testeBot2.0',
                bestTime: 0,
            },
        ],
    })
}