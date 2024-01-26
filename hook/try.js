// let data;

// async function logMovies() {
//   const response = await fetch("https://api.thingspeak.com/channels/2125743/feeds.json?api_key=4L15DSU8CJBHK2UG&results=5");
//   const movies = await response.json();
//   console.log(movies.feeds);
//   return movies;
// }
//function to take the data and put it in an array of arrays format.



// logMovies().then(data => {
//   let info = {
//     Hb:[],
//     RBC:[],
//     Temperature:[],
//     SpO2:[],
//     Hr:[],
//   }
//   for(let obj of data.feeds) {
//     info.Hr.push(obj.field4);
//     info.Hb.push(obj.field6);
//     info.RBC.push(obj.field7);
//     info.Temperature.push(obj.field8);
//     info.SpO2.push(obj.field5);
//   }
//   console.log(info);
// });

// const getData = async () => {
//   const response = await fetch("https://api.thingspeak.com/channels/2125743/feeds.json?api_key=4L15DSU8CJBHK2UG&results=3");
//   const data = await response.json();
//   let info = {
//     Hb:['g/dl'],
//     RBC:['mcL'],
//     Temperature:['C'],
//     SpO2:['%'],
//     Hr:['bpm'],
//   }
//   for(let obj of data.feeds) {
//     info.Hr.splice(-1,0,obj.field4==null?0:obj.field4);
//     info.Hb.splice(-1,0,obj.field6==null?0:obj.field6);
//     info.RBC.splice(-1,0,obj.field7==null?0:obj.field7);
//     info.Temperature.splice(-1,0,obj.field8==null?0:obj.field8);
//     info.SpO2.splice(-1,0,obj.field5==null?0:obj.field5);
//   }
//   console.log(info);
// }

// getData();

import {v4 as uuid} from 'uuid';

console.log(typeof uuid())