
require('dotenv').config()
//var db = require('../../connection');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DATABASE_URL)
const db = client.db('defaultDB');


// const getDbInstance = (config) => new Promise((resolve,reject) => {
//     const client = new MongoClient(config.dbUrl, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     console.log(config);
//     client.connect((error) => {
//         if(error){
//             console.error(error);
//             reject(error);
//         }
//         let db = client.db(config.dbName);

//         resolve(db);
//     })
// })

class diver {
  static addDiverToDB = async (req, res) => {
    const dataJson = {
      name:req.body.name,
      DiveLogs:[],
      numberOfdives:0,
      greatestDepth:0,
    }
   
  //   const config = {
  //     dbUrl: 'mongodb+srv://seiffhassann:NzJLPfB0ent9uVyU@divetask.ltsom0s.mongodb.net/test',
  //     dbName: "task"
  // }; 
    try { 
      //const db = await getDbInstance(config);
      const createDiver = await db.collection('diver').insertOne(dataJson);
      res.status(200).send(createDiver);
    } catch (e) {
      res.status(500).send({
        data: e,
        message: e.message,
      });
    }
  
 }
}
module.exports = diver;
