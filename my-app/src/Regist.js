import React ,{useState}from "react"
import { BrowserRouter as Router, Routes, Route ,Link,withRouter  } from 'react-router-dom';

import './Regist.css';
class Regist extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    dob: this.state.dob,
                    gender: this.state.gender,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData.message);
                this.props.history.push('/Weather');
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Internal server error');
        }
    };

    render(){

        return(
            <body className="imageReg">
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid ">
                <Link to="/Weather" class="navbar-brand " >Weather App</Link>
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
                    <form action="http://localhost:9000/register" onSubmit={this.handleSubmit} method="post">
                        <h1 className="Regh1">Registration Page</h1>
                        <div class="formInputGroup">
                            <input className="formInput" type="text" name="name" placeholder="Full Name" required/>
                            <input className="formInput" type="email" name="email" placeholder="Email Address" required/>
                        </div><br/>
                        <div class="formInputGroup">
                            <input className="formInput" type="password" name="password" placeholder="Create Password" required/>
                            <input className="formInput" type="password" name="confirmPassword" placeholder="Confirm Password" required/>
                        </div><br/>
                        <label>Date of Birth:</label>
                        <input className="formInputDate" type="date" name="dob" required/><br/>
                        <label>Gender:</label>
                        <div className="formRadioGroup">
                            <input type="radio" name="gender" value="male" required/> Male
                            <input type="radio" name="gender" value="female" required/> Female
                            <input type="radio" name="gender" value="other" required/> Other
                        </div><br/>
                        <input className="formbutReg" type="submit" value="Sign Up"/>
                    </form>
                </div>
            </body>
        )
    
    }
}
export default Regist;