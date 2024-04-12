// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// function Home({ unreadCount, userName }) {
//   return (
//     <div>
//       <h1>Welcome, {userName}</h1>
//       <p>You have {unreadCount} unread messages.</p>
//     </div>
//   );
// }

// function UserMail() {

//   const [userName, setUserName] = useState('');
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Fetch user data
//   fetch("http://localhost:5000/userdata", {
//     method: "POST",
//     crossDomain: true,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//     }, 
//     body:JSON.stringify({
//         token : window.localStorage.getItem("token"),
//     }),
//   }).then((res) => res.json())
//   .then((data) => {
//       console.log(data, "userData");
//       if(data.data === "Token expired") {
//           alert("Token have expired you have to login again")
//           window.localStorage.clear();
//           window.location.href = "./sign-in"
//       }else {
//         setUserName(data.data.firstName + ' ' + data.data.lastName); // Update userName state with data from the API
//       }
    
//   });

//   // Fetch messages
//   fetch("http://localhost:5000/api/messages", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   }).then((res) => res.json())
//   .then((messages) => {
//     console.log(messages, "messages");
//     const unreadMessages = messages.filter(message => !message.isRead);
//     setUnreadCount(unreadMessages.length);
//   })
//   .catch((error) => {
//     console.error("Error fetching messages:", error);
//   });

//   useEffect(() => {
//   // Fetch unread count
//   const fetchUnreadCount = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/messages/unread/count");
//       if (!response.ok) {
//         throw new Error("Failed to fetch unread count");
//       }
//       const data = await response.json();
//       setUnreadCount(data.count);
//     } catch (error) {
//       console.error("Error fetching unread count:", error);
//     }
//   };

//   fetchUnreadCount();
// }, []);

    



//   return (



//     <>
    
//       <Home unreadCount={unreadCount} userName={userName} />

//       <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/inbox">Inbox</Link></li>
//       </ul>

//     </>     
//   )
// }

// export default UserMail


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ unreadCount, userName }) {
  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <p>You have {unreadCount} unread messages.</p>
    </div>
  );
}

function UserMail() {
  const [userName, setUserName] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        if (data.data === "Token expired") {
          alert("Token has expired. Please login again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        } else {
          setUserName(`${data.data.firstName} ${data.data.lastName}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUnreadMessagesCount = async () => {
      try {
        const [messagesResponse, unreadCountResponse] = await Promise.all([
          fetch("http://localhost:5000/api/messages"),
          fetch("http://localhost:5000/api/messages/unread/count"),
        ]);
        const [messages, unreadCountData] = await Promise.all([
          messagesResponse.json(),
          unreadCountResponse.json(),
        ]);
        const unreadMessages = messages.filter(message => !message.isRead);
        setUnreadCount(unreadCountData.count || unreadMessages.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages or unread count:", error);
      }
    };

    fetchUserData();
    fetchUnreadMessagesCount();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Home unreadCount={unreadCount} userName={userName} />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
      </ul>

      <br/>
      <button onClick={handleLogout}> Logout </button>
    </>
  );
}

export default UserMail;
