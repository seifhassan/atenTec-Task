require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db("defaultDB");

class dive {
  static createNewDive = async (req, res) => {
    if (req.body.DiveDepth >= 40) return res.status(400).send("maxmum Depth 40 m");
    const diver = await db.collection('diver').find(
      {_id:new ObjectId(req.params.diverId)},
       {name:req.body.DiverName}
    ).toArray();
    if (req.body.DiveDepth >= diver[0].greatestDepth) return res.status(400).send(`maxmum Depth less than ${diver[0].greatestDepth}`);
    if (!diver) return res.status(404).send("wrong Id or name");
    const dt =await this.checkDiveProcessAndGetDt(diver,req.params.diverId,req.body.DiveDepth,req.body.DiveDate);
    if(dt.status=="FAILED") return res.status(404).send(dt.error);
    const dataJson=await this.preparDiveData(req.params.diverId,req.body,dt.data);
    try {
      const createDive = await db.collection("dive").insertOne(dataJson);
      await this.addDiveToDiverLog(diver[0],dataJson,createDive.insertedId);
      res.status(200).send(createDive);
    } catch (e) {
      res.status(500).send({
        data: e,
        message: e.message,
      });
    }
  };
  static addDiveToDiverLog= async (diver,diveData,diveId)=>{
    const newDive ={
      DiveDate:diveData.DiveDate,
      DiveDepth:diveData.DiveDepth,
      DiveId:diveId,
      diveDt:diveData.dt
    }
   const newdiverLogArray = diver.DiveLogs || [];
   newdiverLogArray.push(newDive);
   const newDiveNumber = diver.numberOfdives + 1 ;
   const greatestDiveDepth= diveData.DiveDepth>diver.greatestDepth? diveData.DiveDepth : diver.greatestDepth ; 
   await  db.collection('diver').findOneAndUpdate(
    { _id: diver._id },
    {"$set":{ numberOfdives: newDiveNumber , DiveLogs: newdiverLogArray, greatestDepth : greatestDiveDepth}} 
  )
  }
  static preparDiveData = async (diverId,diverData,dt) => {
    let dataJson={
      DiverName:diverData.DiverName,
      DiverId:diverId,
      DiveDepth:diverData.DiveDepth,
      DiveDate:diverData.DiveDate,
      dt:dt,
    } 
    return dataJson;
  }
  static checkDiveProcessAndGetDt = async (diverData,diverId,depth,DiveDate) => {
    if(diverData.numberOfdives==10) {
      return   {
        status: "FAILED",
        error: "maxmum allowed length for one diver is 10",
      };
    }
    const lastDiveandnumberOfDive = await this.getLastDiverDiveAndCount(diverId);
    const TimeToDive=await this.getMinTimeToDive(lastDiveandnumberOfDive.lastDive,lastDiveandnumberOfDive.diveCount,depth); 
    const requiredDiveTime= Date.parse(DiveDate);    
    if(requiredDiveTime < TimeToDive.nearestTimeToDive) {
      return   {
        status: "FAILED",
        error: `nearest time to dive is ${new Date(TimeToDive.nearestTimeToDive)}`,
      };
    }
    return  {
      status: "SUCCESS",
      data: TimeToDive.MinTimeToDive ,
    };
    
    }
    static getLastDiverDiveAndCount = async (diverId) => { 
      const diveCount = await db.collection('dive').find({DiverId:diverId}).count();
     const lastDive=await db.collection("dive").find({DiverId:diverId}).skip(diveCount - 1).toArray();
     return {
      lastDive: lastDive[0],
      diveCount: diveCount
    };
    }
  static getMinTimeToDive = async (lastDive,diveCount,depth) => {
   const MinTimeToDive= (lastDive.dt)+(depth*(2^diveCount));
   const nearestTimeToDive= MinTimeToDive + Date.parse(lastDive.DiveDate)
   return {
   nearestTimeToDive : nearestTimeToDive ,
   MinTimeToDive : MinTimeToDive,

  }
  }
}
module.exports = dive;
