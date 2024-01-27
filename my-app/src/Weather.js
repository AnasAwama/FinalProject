import React,{useEffect,useState} from "react"
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './nav.css';
import './weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const formatDay = (dateString) => {
    const options = { weekday: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            key: '56102d169a542b0bd2015403e7e860d6',
            dataApi: {},
            search: "",
            username:"",
            newSearchValue:"",
            
        };
        this.handleLogout = this.handleLogout.bind(this);
    }
    
        menuToggle() {
            const toggleMenu = document.querySelector(".menu");
            toggleMenu.classList.toggle("active");
        }

    componentDidMount() {
        this.getUserName();
        this.fetchWeather();
    }
    
    getUserName=async()=>{
        try{
            const userName= await fetch("http://localhost:9000/user",{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            console.log("Username response status:", userName.status);
            const data = await userName.json();
            console.log("Username: ",data)
            if(userName.ok){
                this.setState({username : data.username})
            }
        }catch (error){
            console.log(error)
        }

    }

    
//https://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&cnt=6&appid=${this.state.key}
    fetchWeather = async () => {
        try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search}&cnt=7&appid=${this.state.key}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            this.setState({ dataApi: data });
        }
        } catch (error) {
            console.error(error);
        }
    }
    handleSearchChange = async (e) => {
        const newSearchValue = e.target.value;
        console.log("Searchsad result: ",newSearchValue)
        await this.setState({
            search: newSearchValue,
            newSearchValue: newSearchValue,
        });
        this.componentDidMount();
        this.fetchWeather();
    }
    handleHistory=async(e)=>{
        try{
            const hist = await fetch("http://localhost:9000/History", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({history: this.state.newSearchValue}),
        });
    
        if (hist.ok) {
            console.log("data Stored successfully");
            
        } else {
            console.error("No Data Stored");
        }
        } catch (error) {
        console.error("Error during Storing:", error);
        }
    }

    handleLogout = async () => {
        try {
            console.log("Logout button pressed");
            const response = await fetch("http://localhost:9000/logOut", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({name: this.state.username}),
        });
    
        if (response.ok) {
            console.log("Logout successful");
            window.location.href = '/';
        } else {
            console.error("Logout failed");
        }
        } catch (error) {
        console.error("Error during logout:", error);
        }
    }
    
    render(){
        return(
            
            <body className="image">
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid ">
                <Link to="/" class="navbar-brand " >Weather App</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        {/* add item */}
                        </li>
                    </ul>
                    {this.state.username ? (
                    <div className="action">
                        <div className="profile" onClick={()=>this.menuToggle()}>
                            <p class="Text navbar-text">Welcome, {this.state.username}</p>
                        </div>
                        <div className="menu">
                        <ul>
                            <li>
                                <img className="img2" src={require("./image/edit-profile.png")}/><Link to="/">Edit Profile</Link>
                            </li>
                            <li>
                            <img className="img2" src={require("./image/logout.png")} /><input type="button" className="logoutButton" value="Logout" onClick={this.handleLogout}/>
                            </li>
                        </ul>
                        </div>
                    </div>
            ) : (
                <>
                    <Link to="/LogIn" type="button" class="btn btn-outline-dark Lright">Log-In</Link>
                    <Link to="/Regist" type="button" class="btn btn-outline-light Sright">Sign-Up</Link>
                </>
            )}
                    </div>
                </div>
            </nav>
            {/* </form> */}
            <div className="formCent">
                <form>
                    <input type="text" placeholder="Enter City" onChange={this.handleSearchChange} value={this.state.search}/>
                </form>
            </div>
            <div className="Cent">
                <div className="Border">
                <table>
                    <tr>
                    <td><div className="imagePosition">
                                    {this.state.dataApi && this.state.dataApi.list && this.state.dataApi.list[0] && this.state.dataApi.list[0].weather[0] && (
                                        <img src={require(`./image/${this.state.dataApi.list[0].weather[0].icon}.png`)} className="imageSize" alt="Weather Icon" />
                                    )}
                                </div></td>
                        <td><div className="text">
                        {this.state.dataApi && this.state.dataApi.list && this.state.dataApi.list[0] && (
                                        <>
                                            <p className="text-margin">{formatDay(this.state.dataApi.list[0].dt_txt)} {new Date(this.state.dataApi.list[0].dt_txt).toLocaleTimeString()}</p>
                                            <h1 className="text-margin">{this.state.dataApi.city.name}</h1>
                                            <p className="text-margin">Temperature: {Math.round(this.state.dataApi.list[0].main.temp - 273.15)}<sup>°</sup> C</p>
                                            <p className="text-margin">{this.state.dataApi.list[0].weather[0].description}</p>
                                        </>
                                    )}
                        </div></td>
                    </tr>
                </table>
                </div>
            </div>
            <div className="alignBox">
            {this.state.dataApi.list && this.state.dataApi.list.map((day, index) => (
                index > 0 && index < 6 && (
                    <div key={index}>
                        <div className={"smallBorder smallText"}>
                            <p style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '7px' }}>{formatDay(day.dt_txt)}</p>
                            {day.weather.map((weatherEntry, weatherIndex) => (
                                <React.Fragment key={weatherIndex}>
                                    <img src={require(`./image/${weatherEntry.icon}.png`)} alt={`Weather`} />
                                </React.Fragment>
                            ))}
                            <p style={{ marginTop: '-2px' }}>{Math.round(day.main.temp - 273.15)}<sup>°</sup> C</p>
                        </div>
                    </div>
                )
            ))}
            </div>
            {/* </form> */}
            </body>
        )
    }

}
export default Weather;