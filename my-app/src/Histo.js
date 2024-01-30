import React ,{Component}from "react"
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './histo.css';

class Histo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            getHistory:[],
            currentPage: 1,
            itemsPerPage: 6,
        };
        
    }

    menuToggle() {
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
    }

    componentDidMount() {
        this.getUserName();
        this.getHistoryValue();
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
    getHistoryValue=async()=>{
        try {
            const getHistory = await fetch("http://localhost:9000/getHist", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            console.log("Username response status:", getHistory.status);
            const data = await getHistory.json();
            console.log("getHistory ", data)
            if (getHistory.ok) {
                this.setState({ getHistory: data.getHistory })
            }
        } catch (error) {
            console.log(error)
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
    clearHistory=async()=>{
        try {
            const response = await fetch("http://localhost:9000/clearHistory", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ name: this.state.username }),
            });
            if (response.ok) {
                console.log("History cleared successfully");
                this.getHistoryValue();
            } else {
                console.error("Failed to clear history");
            }
        } catch (error) {
            console.error("Error during clearing history:", error);
            }
        };
    
    
    render(){
        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = this.state.getHistory.slice(indexOfFirstItem, indexOfLastItem);

        return(
            <body className="imageHist">
            
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid ">
                <Link to="/" style={{fontSize:"xx-Large"}} class="fontFamily navbar-brand " >Weather App</Link>
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
                            <p style={{fontSize:"x-Large"}} class="fontFamily Text navbar-text">Welcome, {this.state.username}</p>
                        </div>
                        <div className="menu">
                        <ul>
                            <li>
                                <img className="img2" src={require("./image/edit-profile.png")}/><Link to="/Edit" style={{fontSize:"Large"}} className="fontFamily">Edit Profile</Link>
                            </li>
                            <li>
                            <img className="img2" src={require("./image/logout.png")} /><input type="button" style={{fontSize:"Large"}} className="fontFamily logoutButton" value="Logout" onClick={this.handleLogout}/>
                            </li>
                        </ul>
                        </div>
                    </div>
            ) : (
                <>
                    <Link to="/LogIn" type="button" style={{fontFamily:"poor story", fontSize:"large",fontWeight:"500"}} class="btn btn-outline-dark Lright">Log-In</Link>
                    <Link to="/Regist" type="button" style={{fontFamily:"poor story", fontSize:"large",fontWeight:"500"}} class="btn btn-outline-light Sright">Sign-Up</Link>
                </>
            )}
                    </div>
                </div>
            </nav>
            <div className="CentHist">
                <div className="BorderHist">
                <div className="txtPosition">User history</div>
                    <div className="textHist">
                    <ol className="history-list">
                    {currentItems.map((entry, index) => (
                        <li key={index} className="text-marginHist">
                            <span className="history-number">{indexOfFirstItem + index + 1}.</span>
                            City: {entry.city}, Temperature: {entry.temperature}, Timestamp: {entry.timestamp}
                        </li>
                        ))}
                    </ol>
                    </div>
                    
                    <div className="pagination">
                    {Array.from({ length: Math.ceil(this.state.getHistory.length / this.state.itemsPerPage) }).map((_, i) => (
                        <Link
                        key={i}
                        to="/Histo"
                        onClick={() => this.setState({ currentPage: i + 1 })}
                        className={this.state.currentPage === i + 1 ? "active" : ""}
                        >
                        {i + 1}
                        </Link>
                    ))}
                    
                    </div>
                    <form onSubmit={this.clearHistory}>
                        <input className="btn btn-light formbutHisr" type="submit" value="Clear History"/>
                    </form>
                </div>
            </div>
            </body>
        )
    
    }
}
export default Histo;