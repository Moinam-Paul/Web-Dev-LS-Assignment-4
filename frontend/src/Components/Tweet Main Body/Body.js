import React, { useState, useEffect } from "react";
import Create from "./Create";
import api from "../../utils/api";
import './Body.css';

function Body() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // Fetch tweets when the component mounts
    async function fetchTweets() {
      try {
        const response = await api.get("/tweets/");
        setTweets(response.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    }

    fetchTweets();
  }, []);

  async function addTweet(newTweet) {
    try {
      const response = await api.post("/tweets/", newTweet);
      setTweets((previous) => [...previous, response.data]);
    } catch (error) {
      console.error("Error adding tweet:", error);
    }
  }

  async function deleteTweet(id) {
    try {
      await api.delete(`/tweets/${id}/`);
      setTweets((previous) => previous.filter(tweet => tweet.id !== id));
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  }

  return (
    <div>
      <Create onAdd={addTweet} />
      <div className="tweets-container">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet m-2 p-3 border rounded">
            <p>{tweet.content}</p>
            <button
              className="btn custom-button"
              onClick={() => deleteTweet(tweet.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;