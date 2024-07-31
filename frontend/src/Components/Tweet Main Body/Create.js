import React, { useState } from "react";
import './Create.css';

function Create({ onAdd }) {
  const [tweetContent, setTweetContent] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setTweetContent(value);
  }

  function submit(event) {
    event.preventDefault();
    if (tweetContent.trim()) {
      onAdd({ content: tweetContent });
      setTweetContent("");
    }
  }

  return (
    <div className="create-tweet p-3 border rounded">
      <form onSubmit={submit}>
        <div>
          <textarea
            name="content"
            onChange={handleChange}
            value={tweetContent}
            placeholder="What's happening?"
            rows="3"
            className="form-control mb-2"
          />
        </div>
        <button type="submit" className="btn btn-primary">Tweet</button>
      </form>
    </div>
  );
}

export default Create;