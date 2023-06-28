const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res) => {
    const user = res.locals.result;

    try {
        const { username, password } = req.body;
        let token = null;

        if (username && password) {
            const { privateKey } = process.env;
            // let match = await bcrypt.compare(password, passwordHash)
            let match = password === user.password;
            
            if (username === user.username && match) {
                token = await jwt.sign({ username: username }, privateKey, { expiresIn: '1h' });
            }
        }
        if (token) {
            return res.json({ 
                find: true,
                token: token,
                user:{
                    username: username,
                    bestTime:user.bestTime,
                    idSkin:user.idSkin,
                },
            });
        }
        return res.status(200).json({ find: false });
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(500); //Internal Server Error
    }
}

exports.verifyToken = (req, res, next) => {
    req.user = { username: null, verified: false };
    const { privateKey } = process.env;
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, privateKey, function (err, data) {
            if (!(err && typeof data === 'undefined')) {
                req.user = { username: data.username, verified: true };
                next();
            }
            else {
                return res.status(200).json({ verified: false });
            }
        })
    }
    else {
        return res.status(200).json({ verified: false }); //Forbidden
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const { passwordHash } = process.env
        if (oldPassword && newPassword) {
            let match = await bcrypt.compare(oldPassword, passwordHash)
            if (match) {
                let hash = await bcrypt.hash(newPassword, saltRounds)
                return res.sendStatus(200) //OK
            }
        }
        return res.sendStatus(401); //Unauthorized
    } catch (err) {
        console.log(err)
        return res.sendStatus(500); //Internal Server Error
    }
}

exports.logout = (req, res) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        // console.log(bearerToken);
        //add bearerToken to blacklist
    }
    return res.sendStatus(200)
}

exports.returns = (req, res) => {
    return res.status(200).json({ verified: true });
}