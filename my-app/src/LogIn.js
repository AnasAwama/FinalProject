import React from "react"

class LogIn extends React.Component{



    render(){

        return(
            <body>
                <div>
                    <form action="" method="post">
                        <h1>Log In Page</h1>
                        <input type="Text" name="email" placeholder="Enter Your Email"/>
                        <input type="Password" name="pass" placeholder="Enter Your Password"/>
                        <input type="Submit" name="submit"/>
                    </form>
                </div>
            </body>
        )
    
    }
}
export default LogIn;