import React from "react"
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './Login.css';
class LogIn extends React.Component{



    render(){

        return(
            <body className="imageLog">
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
            <div className="margtop">
                <div className="BorderLog">
                    
                    <form action="http://localhost:9000/logIn" method="post">
                        <h1 className="Logh1">Log In Page</h1>
                        <input className="formMid" type="Text" name="email" placeholder="Enter Your Email"/><br/>
                        <input className="formMid" type="Password" name="pass" placeholder="Enter Your Password"/><br/>
                        <input className="formbut" type="Submit" name="submit"/>
                    </form>
                </div>
                </div>
            </body>
        )
    
    }
}
export default LogIn;