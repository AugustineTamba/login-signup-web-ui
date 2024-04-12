import React from 'react'

function userHome() {
  return (
    <div className="mb-3">         
        <h5>First Name: {this.state.userData.firstName} </h5>
        <h5>Last Name: {this.state.userData.lastName} </h5>
        <h5>Email: {this.state.userData.email} </h5>    
        <br/>
        {/*Logout button below  */}
        <button type="submit" className="btn btn-primary" onClick= {this.logout}> Logout</button>
    </div>     
  )
}

export default userHome
