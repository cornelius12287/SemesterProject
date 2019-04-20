// imports mysql connection
const conn = require('./mysql_connection')
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 8;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'some long string here';

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Users")
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Users WHERE id=?", id);
        if(!data){
            throw Error('User Not Found');
        }
        return data[0];
    },

    async add(input){
        if(!input.Password){
            throw Error('Password Required');
        }
        if(input.Password.length < 8){
            throw Error('A Longer Password Is Required');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query("INSER INTO MyApp_Users (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
        [[inout.FirstName, input.LastName, input.Birthday, hashedPassword, new Date()]]
        );
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },

    async login(email, password){
        const data = await conn.query(`SELECT * FROM MyApp_Users P Join MyApp_ContactMethods CM On CM.UserId = P.id WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].password);
        if(x){
            const user = {...data[0], password: null};
            return {user, token: jwt.sign(user, JWT_SECRET)};
        }else{
            throw Error('Wrong Password');
        }
    },

    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM MyApp_Users P Join MyApp_ContactMethods CM On CM.UserId = P.id WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update MyApp_Users P Set ? WHERE P.id=?`, [ {Password: hashedPassword}, data[0].id]);
            return { status: "success", message: "Passowrd Successfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }
};

// returns above model object
module.exports = model;
