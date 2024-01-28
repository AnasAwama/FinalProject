import React from "react"
import { BrowserRouter as Router, Routes, Route ,Link , useHistory} from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            showPassword: false,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    handleSubmit = async (e) => {
        
        e.preventDefault();
        const { email, password} = this.state;
        //const navigate = useNavigate();
        console.log("Form Values: ", email, password,);
        try {
            const res = await fetch("http://localhost:9000/logIn", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status==401){
                    alert("User not found, Please sign up if you don't have account.");
                }
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            if (data.error) {
                alert(data.error);
            } else if (data.user) {
                this.setState(
                    {
                        email: data.user.email,
                        password: data.user.password,
                    },
                    () => {
                        console.log("Updated state:", this.state);
                        window.location.href = '/';
                    }
                );
    
                console.log("User LogedIn successfully");
            } else {
                console.error('User data not found in the response');
            }
        } catch (error) {
            console.error('Error:', error);
            
        }
    };

    render(){

        return(
            <body className="imageLog">
                <nav class="navbar navbar-expand-lg ">
                    <div class="container-fluid ">
                    <Link to="/" class="navbar-brand " >Weather App</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            <div className="margtop">
                <div className="BorderLog">
                    
                    <form onSubmit={this.handleSubmit} method="post">
                        <h1 className="Logh1">Log In Page</h1>
                        <input className="formMid" type="Text" name="email" onChange={e=>this.setState({email:e.target.value})} placeholder="Enter Your Email"/><br/>
                        <input className="formMid" type={this.state.showPassword ? "text" : "password"} name="password" onChange={e=>this.setState({password:e.target.value})} placeholder="Enter Your Password"/>
                        <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} onClick={this.togglePasswordVisibility} />
                        <br/>
                        <input className="btn btn-light formbut" type="Submit" name="submit"/>
                        <div className="FontSize">If you do not have an account <Link className="FontColor" to="/Regist">Sing-Up Here</Link></div>
                    </form>
                </div>
                </div>
            </body>
        )
    
    }
}
export default LogIn;