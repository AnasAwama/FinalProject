import React ,{Component}from "react"
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './Edit.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            gender:"",
            age:0,
            showPassword: false,
        };
        this.handleUpdate=this.handleUpdate.bind(this);
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };
    
    handleAgeChange = (e) => {
        this.setState({ age: parseInt(e.target.value) });
    }
    menuToggle() {
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
    }

    componentDidMount() {
        this.getUserName();
        this.getUserData();
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

    getUserData = async () => {
        try {
            const response = await fetch("http://localhost:9000/userData", {
                method: 'GET',
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        console.log("User data response status:", response.status);
        const userData = await response.json();
        console.log("User data: ", userData);
        if (response.ok) {
            const { name, email, password, gender, age } = userData;
            this.setState({
                name: name || "",
                email: email || "",
                password: password || "",
                gender: gender || "",
                age: age || 0,
        });
        console.log("User data: ",  name, email, password, gender, age);
        }
        } catch (error) {
            console.log(error);
        }
    }

    handleUpdate = async (e) => {
        e.preventDefault();
        const { name, email, password, age, gender} = this.state;

        console.log("Form Values: ", name, email, password, gender, age);

        try {
            const res = await fetch("http://localhost:9000/UpdateProfile", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    gender: gender,
                }),
            });
            if (res.status===400){
                alert('User with this email is already registered')
            }
            const data = await res.json();
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            if (data.success) {
                console.log("Profile updated successfully");
                this.setState({
                    name: data.user.name,
                    email: data.user.email,
                    password: data.user.password,
                    age: data.user.age,
                    gender: data.user.gender,
                }, () => {
                    console.log("Updated state:", this.state);
                });
                // Redirect to the Edit page if needed
                // window.location.href = '/Edit';
            } else {
                console.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
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
            <body className="imageReg">
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
                        <Link to="/Histo"  class="nav-link active" aria-current="page">History</Link>
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
                                <img className="img2" src={require("./image/edit-profile.png")}/><Link to="/Edit">Edit Profile</Link>
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
                <div className="BorderReg">
                    <form onSubmit={this.handleUpdate} method="post">
                        <h1 className="Regh1">Edit your Profile</h1>
                        <div class="formInputGroup">
                        <label>Change your Name: </label>
                            <input className="formInput" type="text" name="name"  value={this.state.name||"Full Name"} onChange={e=>this.setState({name:e.target.value})} p required/>
                            <label>Change your Email: </label>
                            <input className="formInput" type="email" name="email"  value={this.state.email || "Email Address"} onChange={e=>this.setState({email:e.target.value})}  required/>
                        </div><br/>
                        <div class="formInputGroup">
                        <label>Change yor Password: </label>
                            <input className="formInput" type={this.state.showPassword ? "text" : "password"} name="password"  value={this.state.password ||"Create Password"} onChange={e=>this.setState({password:e.target.value})} required/>
                            <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} onClick={this.togglePasswordVisibility} />
                        </div><br/>
                        <label>Age: </label>
                        <input type="range" className="formInput" min="0" max="100" value={this.state.age} onChange={this.handleAgeChange} name="age" />
                            <output>{this.state.age}</output><br/><br/>
                        <label>Gender:</label>
                        <div className="formRadioGroup">
                        <input type="radio" name="gender" value="male" checked={this.state.gender === "male"} onChange={e=>this.setState({gender:e.target.value})} required/> Male
    <input type="radio" name="gender" value="female" checked={this.state.gender === "female"} onChange={e=>this.setState({gender:e.target.value})} required/> Female
    <input type="radio" name="gender" value="other" checked={this.state.gender === "other"} onChange={e=>this.setState({gender:e.target.value})}  required/> Other
                        </div><br/>
                        <input className="btn btn-light formbutReg" type="submit" value="Submit"/>
                    </form>
                </div>
            </body>
        )
    
    }
}
export default Edit;