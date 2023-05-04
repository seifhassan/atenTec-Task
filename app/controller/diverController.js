
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
    const diver =await db.collection("diver").find({diverNumber:req.body.diverNumber}).toArray();
    console.log(diver[0]);
    if (diver[0]) return res.status(400).send("diver number must be unique")  
    const dataJson = {
      name:req.body.name,
      diverNumber:req.body.diverNumber,
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
      await db.collection('diver').insertOne(dataJson);
      res.status(200).send("diver added Successfully");
    } catch (e) {
      res.status(500).send({
        data: e,
        message: e.message,
      });
    }
  
  }

 static getDiverFromDB = async (req, res) => {

  const diver =await db.collection("diver").find({diverNumber:req.params.diverNumber}).toArray();
  console.log(diver[0]);
  if (!diver[0]) return res.status(404).send("diver not found") 
  return res.status(200).send(diver[0]);

 

}
 }
module.exports = diver;
