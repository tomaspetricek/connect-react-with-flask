import React, { useEffect, useState } from 'react';
import { RANDOM_NUMBER_URL, GREETING_URL, PROCESS_FORM_URL, RANDOM_NUMBER_REFRESH_RATE_SECONDS } from './config';


function App() {
  const [greeting, setGreeting] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const fetchGreeting = () => {
      fetch(GREETING_URL)
        .then(response => response.json())
        .then(greeting => setGreeting(greeting))
        .catch(error => console.error("Error fetching greeting:", error));
    };
    fetchGreeting();

    const fetchRandomNumber = () => {
      fetch(RANDOM_NUMBER_URL)
        .then((response) => response.json())
        .then((data) => setRandomNumber(data))
        .catch((error) => console.error("Error fetching random number:", error));
    };
    const randomNumberIntervalId = setInterval(fetchRandomNumber, RANDOM_NUMBER_REFRESH_RATE_SECONDS);

    fetchRandomNumber();
    return () => clearInterval(randomNumberIntervalId);
  }, []);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Data to send to the backend
    const formData = { name, number };

    // Send a POST request to the backend
    fetch(PROCESS_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data); // Handle the response data here
      })
      .catch((error) => {
        console.error('Error:', error); // Handle any errors here
      });
  };

  return (
    <div className="App">
      <h1>React & Flask Integration</h1>
      {greeting ? <p>{greeting.message}</p> : <p>Loading...</p>}
      <h1>Submit Your Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h1>Periodic Data Fetch</h1>
      <p>Data: {randomNumber ? JSON.stringify(randomNumber.value) : "Loading..."}</p>
    </div>
  );
}

export default App;