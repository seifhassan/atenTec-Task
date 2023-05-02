// require('dotenv').config()
// const {MongoClient} = require('mongodb');
// const client = new MongoClient(process.env.DATABASE_URL);
// let dbb

// async function main(db){
//  let y ;
//     const client = new MongoClient(process.env.DATABASE_URL);
 
//     try {
//         await client.connect();
//         y= await  listDatabases(client);
  
//     } catch (e) {
//         console.error(e);
//         y= 0;
//     } finally {
//         await client.close();
//     }
//     return y
   
// }
//  async function listDatabases(client){
//     databasesList = await client.db();
//     y= databasesList;
 
// };
// // const x=async()=>{
// //     await main(dbb)
// // } 
// (async () => {
//     console.log(await main(dbb))
//   })()
// // console.log(x);
// module.exports = dbb;