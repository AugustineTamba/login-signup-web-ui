// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import UserMail from './userMail';

// function Inbox() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Simulated fetch of messages from API
//     const fetchMessages = async () => {
//         try {
//           const response = await fetch("http://localhost:5000/api/messages");
//           if (!response.ok) {
//             throw new Error("Failed to fetch messages");
//           }
//           const data = await response.json();
//           setMessages(data);
//           console.log(data)
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//     };

//     fetchMessages();
//   }, []);

//   const markAsRead = async (id) => {

//     // Make API call to mark message as read
//     const response = await fetch(`http://localhost:5000/api/messages/${id}/read`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ isRead: true }),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to mark message as read");
//     }

//     // Simulated API call to mark message as read
//     const updatedMessages = messages.map((message) => {
//       if (message._id === id) {
//         return { ...message, isRead: true };
//       }
//       return message;
//     });
//     setMessages(updatedMessages);
//   };

//   return (
//     <div>
//       <h1>Inbox</h1>
//       <ul>
//         {messages.map((message) => (
//           <li key={message._id}>
//             <Link
//               to={`/message/${message._id}`} // Corrected message ID here
//               onClick={() => markAsRead(message._id)}
//             >
//               <strong>{message.subject}</strong>
//             </Link>
//             <p>{message.content.substring(0, 50)}</p>
//             {message.isRead ? null : <span>[Unread]</span>}
//           </li>
//         ))}
//       </ul>
//       <br />
//       <button> <Link to="/usermail"> Home </Link> </button>
//     </div>
//   );
// }

// export default Inbox;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserMail from './userMail';

function Inbox() {
  const [messages, setMessages] = useState([]);
  //const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch messages from API
    // const fetchMessages = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/messages");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch messages");
    //     }
    //     const data = await response.json();
    //     setMessages(data);
    //     console.log(response)
    //     setLoading(false); // Update loading state
    //   } catch (error) {
    //     console.error("Error fetching messages:", error);
    //     setLoading(false); // Update loading state in case of error
    //   }
    // };
    // Simulated fetch of messages from API
    const fetchMessages = async () => {
        // Assuming messages are fetched from an API
        const response = await fetch("http://localhost:5000/api/messages", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }  
        });
        const data = await response.json();
        console.log(data);
        setMessages(data);
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      // Make API call to mark message as read
      const response = await fetch(`http://localhost:5000/api/messages/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark message as read");
      }

      // Update local state to mark message as read
      const updatedMessages = messages.map((message) => {
        if (message._id === id) {
          return { ...message, isRead: true };
        }
        return message;
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

//   if (loading) {
//     return <div>Loading...</div>; // Render loading state
//   }

  return (
    <div>
      <h1>Inbox</h1>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <Link
              to={`/message/${message._id}`}
              onClick={() => markAsRead(message._id)}
            >
              <strong>{message.subject}</strong>
            </Link>
            <p>{message.content.substring(0, 50)}</p>
            {message.isRead ? null : <span>[Unread]</span>}
          </li>
        ))}
      </ul>
      <br />
      <button><Link to="/usermail">Home</Link></button>
    </div>
  );
}

export default Inbox;
