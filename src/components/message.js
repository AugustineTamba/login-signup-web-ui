import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Inbox from './inbox';

function Message() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Simulated fetch of a single message from API
    const fetchMessage = async () => {
      // Assuming message is fetched from an API using the message ID
      const response = await fetch(`http://localhost:5000/api/${id}`);
      const data = await response.json();
      setMessage(data);
    };

    fetchMessage();
  }, [id]);

  if (!message) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{message.subject}</h1>
      <p>{message.content}</p>
      <br/>
      <button> <Link to="/inbox"> Home </Link> </button>
    </div>
  );
}

export default Message;
