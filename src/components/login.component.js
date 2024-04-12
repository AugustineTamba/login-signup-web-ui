// import React, { Component } from 'react'

// export default class Login extends Component {

//   // create a state to get the value from the ui
//   constructor(props) {
//     super(props)
//     this.state={
//       email: "",
//       password: "",
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const {email, password} = this.state;
//     console.log(email, password);

//     // fetch("http://localhost:5000/login", {
//     //   method: "POST",
//     //   crossDomain: true,
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Accept: "application/json",
//     //     "Access-Control-Allow-Origin": "*",
//     //   }, 
//     //   body:JSON.stringify({
//     //     email,
//     //     password,
//     //   }),
//     // }).then((res) => res.json())
//     // .then((data) => {
//     //   console.log(data, "user Login");
//     //   if(data.status === "ok") {
//     //     alert(" Login Successfully ");
//     //     window.localStorage.setItem("token", data.data)
//     //     window.localStorage.setItem("loggedIn", true)
//     //     window.location.href = "./userdetails"
//     //   }
//     // });

//      // Send a POST request to the login endpoint with user credentials
// // Function to perform user login
// const loginUser = async (email, password) => {
//   try {
//       // Send a POST request to the login endpoint with user credentials
//       const response = await fetch("http://localhost:5000/login", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//       });

//       // Parse the response JSON
//       const data = await response.json();

//       // Check if login was successful
//       if (response.ok) {
//           // If login successful, return the authentication token or user data
//           return data;
//       } else {
//           // If login failed, throw an error with the error message
//           throw new Error(data.error || "Failed to login");
//       }
//   } catch (error) {
//       // If an error occurred during login, throw the error
//       throw error;
//   }
// };
  
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <h3>Sign In</h3>

//         <div className="mb-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             onChange={e => this.setState({ email:e.target.value })}
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             onChange={e => this.setState({ password:e.target.value })}
//           />
//         </div>

//         <div className="mb-3">
//           <div className="custom-control custom-checkbox">
//             <input
//               type="checkbox"
//               className="custom-control-input"
//               id="customCheck1"
//             />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Remember me
//             </label>
//           </div>
//         </div>

//         <div className="d-grid">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//         <p className="forgot-password text-right">
//           Don't have a account <a href="/sign-up">signup</a>
//         </p>
//         <p className="forgot-password text-right">
//           Forgot <a href="/reset">password?</a>
//         </p>
//       </form>
//     )
//   }
// }

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Login extends Component {

  // create a state to get the value from the ui
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false // Add loggedIn state to track login status
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);

      // Send a POST request to the login endpoint with user credentials
      fetch("http://localhost:5000/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json())
      .then((data) => {
        if(data.status == "ok"){
          alert("Login successful")
          console.log(data, "Login User");
          this.setState({ loggedIn: true });
        }else {
          console.log(data, "Wrong Login User");

        }
        
      })
  } 


  render() {
    // If logged in, redirect to another page (e.g., home page)
    if (this.state.loggedIn) {
      return <Navigate to="/userdetails" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have an account? <a href="/sign-up">Sign up</a>
        </p>
        <p className="forgot-password text-right">
          Forgot <a href="/reset">password?</a>
        </p>
      </form>
    );
  }
}
