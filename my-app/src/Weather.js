import React,{useEffect,useState} from "react"
import './weather.css';

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
            search: ""
        };
        }
    componentDidMount() {
        this.fetchWeather();
    }
//https://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&cnt=5&appid=${this.state.key}
    fetchWeather = async () => {
        try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search}&cnt=5&appid=${this.state.key}`);
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
        await this.setState({ search: newSearchValue });
        this.componentDidMount();
        this.fetchWeather();
    }
    
    render(){

        return(
            <body>
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
                index > 0 && index < 5 && (
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
            </body>
        )
    }

}
export default Weather;