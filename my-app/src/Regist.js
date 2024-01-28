import React ,{Component}from "react"
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './Regist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class Regist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            gender:"",
            age:0,
            flag:0,
            history: [],
            showPassword: false,
            showConfPassword:false,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };
    toggleConfPasswordVisibility = () => {
        this.setState((prevState) => ({
            showConfPassword: !prevState.showConfPassword,
        }));
    };

    handleAgeChange = (e) => {
        this.setState({ age: parseInt(e.target.value) });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, age, gender, confirmPassword} = this.state;
        console.log("Form Values: ", name, email, password, gender, age);

        try {
            const res = await fetch("http://localhost:9000/regist", {
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
            
            if (data.user) {
                this.setState({
                    name: data.user.name,
                    email: data.user.email,
                    password: data.user.password,
                    age: data.user.age,
                    gender: data.user.gender,
                }, () => {
                    console.log("Updated state:", this.state);
                    window.location.href = '/';
                });
    
                console.log("User registered successfully");
            } else {
                console.error('User data not found in the response');
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
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
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
                <div className="BorderReg">
                    <form onSubmit={this.handleSubmit} method="post">
                        <h1 className="Regh1">Registration Page</h1>
                        <div class="formInputGroup">
                            <input className="formInput" type="text" name="name" onChange={e=>this.setState({name:e.target.value})} placeholder="Full Name" required/>
                            <input className="formInput" type="email" name="email" onChange={e=>this.setState({email:e.target.value})} placeholder="Email Address" required/>
                        </div><br/>
                        <div class="formInputGroup">
                            <input className="formInput" type={this.state.showPassword ? "text" : "password"} name="password" onChange={e=>this.setState({password:e.target.value})} placeholder="Create Password" required/>
                            <FontAwesomeIcon className="EyeMargin" icon={this.state.showPassword ? faEye : faEyeSlash} onClick={this.togglePasswordVisibility} />
                            <input className="formInput" type={this.state.showConfPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" required/>
                            <div className="EyeMargin">
                                <FontAwesomeIcon icon={this.state.showConfPassword ? faEye : faEyeSlash} onClick={this.toggleConfPasswordVisibility} />
                            </div>
                        </div><br/>
                        <label>Age: </label>
                        <input
                                type="range"
                                className="formInput"
                                min="0"
                                max="100"
                                value={this.state.age}
                                name="age"
                                onChange={this.handleAgeChange}
                            />
                            <output>{this.state.age}</output><br/><br/>
                        <label>Gender:</label>
                        <div className="formRadioGroup">
                            <input type="radio" name="gender" onChange={e=>this.setState({gender:e.target.value})} value="male" required/> Male
                            <input type="radio" name="gender" onChange={e=>this.setState({gender:e.target.value})} value="female" required/> Female
                            <input type="radio" name="gender" onChange={e=>this.setState({gender:e.target.value})} value="other" required/> Other
                        </div><br/>
                        {/* <Link to="/" className="btn btn-light formbutReg">Submit</Link> */}
                        <input className="btn btn-light formbutReg" type="submit" value="Sign Up"/>
                        <div className="FontSize">Already have an account? <Link className="FontColor" to="/Login">LogIn Here</Link></div>
                    </form>
                </div>
            </body>
        )
    
    }
}
export default Regist;