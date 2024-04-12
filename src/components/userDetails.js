import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class userDetails extends Component {

    // create a state to get the value from the ui
    constructor(props) {
        super(props)
        this.state={
            userData: {},
            error: ""
        }
    }

    componentDidMount() {
        // Fetch user data using session cookie
        this.fetchUserData();
    }

    fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/userdata", {
                method: "POST",
                credentials: 'include', // Include credentials to send session cookies
            });
            const data = await response.json();

            if (response.ok) {
                this.setState({ userData: data.data });
                console.log({userData: data.data});
            } else {
                throw new Error(data.error || "Failed to fetch user data");
            }
        } catch (error) {
            this.setState({ error: error.message || "Internal Server Error" });
        }
    }


    logout = () => {
        //window.localStorage.removeItem('token');
        window.localStorage.clear();
        alert(" Logout Successfully ");
        window.location.href = "./sign-in"
    }
 
  render() {

    const { userData, error } = this.state;

    const handleLogout = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/logout", {
            method: "POST",
          });
          if (response.ok) {
            window.localStorage.clear();
            window.location.href = "./sign-in";
          } else {
            throw new Error("Failed to logout");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
    };

    return (

        <div className="mb-3">  
        {error && <p>{error}</p>}       
          <h5>First Name: {userData.firstName} </h5>
          <h5>Last Name: {userData.lastName} </h5>
          <h5>Email: {userData.email} </h5>    
          <br/>
            {/*Logout button below  */}
            <button type="submit" className="btn btn-primary" onClick= {handleLogout}> Logout</button>
            <br/>
            <Link to="/usermail"> Mail </Link>
        </div>     
    )
  }
}

