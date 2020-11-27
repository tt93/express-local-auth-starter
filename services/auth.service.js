const getDataContext = require('../data/get-data-context');
const { Op } = require("sequelize");
const lib = require('../lib');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

const authenticateLocal = async (userData) => {
    let { email, password } = userData;
    email = lib.normalizeStr(email);

    const db = await getDataContext();
    const existing = await db.models.User.findOne({
        where: {
            email: email
        }
    });

    if (!existing) {
        return {
            success: false,
            error: 'INVALID_CREDENTIALS'
        }
    }

    const same = await bcrypt.compare(password, existing.passwordHash);
    if (same) {
        return {
            success: true,
            token: jwt.sign({ 
                id: existing.id, 
                email: existing.email, 
                username: existing.username, 
                role: existing.role 
            }, 
            config.auth.jwtSecret, { 
                expiresIn: '24h' 
            })
        }
    } else {
        return {
            success: false,
            error: 'INVALID_CREDENTIALS'
        }
    }

};

const registerLocal = async (userData) => {
    let { email, username, password } = userData;
    email = lib.normalizeStr(email);
    username = lib.normalizeStr(username);
    const saltRounds = config.auth.passwordSaltRounds;

    const db = await getDataContext();
    const existing = await db.models.User.findOne({
        where: {
            [Op.or]: [
                {
                    email: email
                },
                {
                    username: username
                }
            ]
        }
    });

    if (existing) {
        // TODO: if someone switches to a different provider
        // using an email already registered, 
        // we can switch authProvider for the account
        let error = 'UNKNOWN';
        if (existing.email === email) {
            error = 'EMAIL_ALREADY_REGISTERED';
        } else if (lib.normalizeStr(existing.username) === username) {
            error = 'USERNAME_ALREADY_REGISTERED';
        }
        return {
            success: false,
            error: error
        };
    } else {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        try {
            const result = await db.models.User.create({
                email,
                username,
                passwordHash,
                authProvider: 'local',
            });

            if (!result) {
                console.warn('result was null when creating a user');
            }

            return authenticateLocal({ email, password });
        }
        catch (err) {
            console.error(err);
        }
    }
};


module.exports = {
    authenticateLocal,
    registerLocal
}