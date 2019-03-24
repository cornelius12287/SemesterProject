// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    getAll(cb){
        conn.query("SELECT * FROM MyApp_Updates", (err, data) => {
            cb(err, data);
        })
    },
    get(id, cb){
        conn.query("SELECT * FROM MyApp_Updates WHERE Id=?", id, (err, data) => {
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
        conn.query("INSERT INTO MyApp_Updates (UpdateID,Type,Motion,Sets,Reps,UpdateText,created_at) VALUES (?)",
                    [[input.UpdateID, input.Type, input.Motion, input.Sets, input.Reps, input.UpdateText, new Date()]],
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
