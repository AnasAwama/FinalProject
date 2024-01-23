import React ,{Component}from "react"
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from 'react-router-dom';
import './Regist.css';

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
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleAgeChange = (e) => {
        this.setState({ age: parseInt(e.target.value) });
    }

    handleSubmit(e){
        e.preventDefault();
        const {name,email,password,age,gender} = this.state;
        console.log("Form Values: ",name,email,password,gender,age);
        fetch("http://localhost:9000/regist", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                age,
                gender,
            }),
            
        })
        .then((res) => {
            console.log("Res result: " ,res)
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data, "userRegister");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                            <input className="formInput" type="password" name="password" onChange={e=>this.setState({password:e.target.value})} placeholder="Create Password" required/>
                            <input className="formInput" type="password" name="confirmPassword" placeholder="Confirm Password" required/>
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
                        <input className="formbutReg" type="submit" value="Sign Up"/>
                    </form>
                </div>
            </body>
        )
    
    }
}
export default Regist;