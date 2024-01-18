// import React,{useEffect,useState} from "react"
// import './weather.css';

// class Weather2 extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
//             temperature: [21, 24, 21, 24],
//             key: '56102d169a542b0bd2015403e7e860d6',
//             dataApi: null,
//             search: ""
//         };
//         }
//     componentDidMount() {
//         this.fetchWeather();
//     }
// //https://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&cnt=5&appid=${this.state.key}
//     fetchWeather = async () => {
//         try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search}&cnt=5&appid=${this.state.key}`);
//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             this.setState({ dataApi: data });
//         }
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     handleSearchChange = (e) => {
//         this.setState({ search: e.target.value },()=>{
//             this.componentDidMount();
//         });
//     }
    
//     render(){

//         return(
//             <body>
//             <div className="formCent">
//                 <form>
//                     <input type="text" placeholder="Enter City" onChange={this.handleSearchChange} value={this.state.search}/>
//                 </form>
//             </div>
//             <div className="Cent">
//                 <div className="Border">
//                 <table>
//                     <tr>
//                     <td><div className="imagePosition">
//                             <img src={require(`./image/rain.png`)} className="imageSize"/>
//                         </div></td>
//                         <td><div className="text">
//                             <p className="text-margin">Today</p>
//                             <h1 className="text-margin">London</h1>
//                             <p className="text-margin">Temperature: 20<sup>°</sup> C</p>
//                             <p className="text-margin">Something</p>
//                         </div></td>
//                     </tr>
//                 </table>
//                 </div>
//             </div>
//             <div className="alignBox">
//             {this.state.day.map((day, index) => (
//             <div key={index}>
//                 <div className={"smallBorder smallText"}>
//                     <p style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '7px' }}>{day}</p>
//                     <img src={require(`./image/rain.png`)} alt={`Weather for ${day}`} />
//                     <p style={{ marginTop: '-2px' }} >20<sup>°</sup> C</p>
//                 </div>
//             </div>
                
//             ))}
//             </div>
//             </body>
//         )
//     }

// }
// export default Weather2;