// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    getAll(cb){
        conn.query("SELECT * FROM MyApp_Likes", (err, data) => {
            cb(err, data);
        })
    },
    get(id, cb){
        conn.query("SELECT * FROM MyApp_Likes WHERE Id=?", id, (err, data) => {
            cb(err, data[0]);
        });
    },

    add(input, cb){
        if(!input.Password){
            cb(Error('Password Required'));
            return;
        }
        if(input.Password < 8){
            cb(Error('A Longer Password is Required'));
            return;
        }
        conn.query("INSERT INTO MyApp_Likes (CommentID,LikerID,LikeID,created_at) VALUES (?)",
                    [[input.CommentID, input.LikerID, input.LikeID, new Date()]],
                    (err, data) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        model.get(data.insertId, (err, data) => {
                            cb(err, data);
                        })
                    });
    }
};

// returns above model object
module.exports = model;