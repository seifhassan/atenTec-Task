
require('dotenv').config()
//var db = require('../../connection');
const MongoClient = require('mongodb').MongoClient;
//const client = new MongoClient(process.env.DATABASE_URL)
//const db = client.db('defaultDB');


const getDbInstance = (config) => new Promise((resolve,reject) => {
    const client = new MongoClient(config.dbUrl);
    
        let db = client.db(config.dbName);        
        resolve(db);
        if(!db) reject(new Error);
    
})

class diver {
  static addDiverToDB = async (req, res) => {

    const dataJson = {
      name:req.body.name,
      diverNumber:req.body.diverNumber,
      DiveLogs:[],
      numberOfdives:0,
      greatestDepth:0,
    }
   
  

       await getDbInstance(config).then((db)=>{
         db.collection('diver').insertOne(dataJson);
         res.status(200).send("diver added Successfully");
       }).catch((error)=>{
        res.status(500).send({
          data: error,
          message: e.message,
        });
       });
      
      
  
  
  }

 static getDiverFromDB = async (req, res) => {
  const config = {
    dbUrl: process.env.DATABASE_URL,
    dbName: "defaultDB"
};
  console.log(req.params.diverNumber);
  await getDbInstance(config).then((db)=>{
     db.collection("diver").find({diverNumber:req.params.diverNumber}).toArray().then((diver)=>{    
      return res.status(200).send(diver);
     }).catch((error)=>{
      return res.status(404).send("not found");
     });
     
  }).catch((error)=>{
    res.status(500).send({
      data: error,
      message: e.message,
    });
  })
  
  
 
  

 

}
 }
module.exports = diver;
