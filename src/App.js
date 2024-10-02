import React, { useState } from "react";
import axios from "axios";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  // Send the Markdown to the backend for conversion
  const convertMarkdown = async (markdownText) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/convert",
        { markdown: markdownText },
        { headers: { "Content-Type": "application/json" } } // Ensure the content type is set to JSON
      );
      setHtmlOutput(response.data.html);
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };

  // Handle user input and convert Markdown
  const handleInputChange = (e) => {
    const markdownText = e.target.value;
    setMarkdown(markdownText);
    convertMarkdown(markdownText); // Send the updated Markdown to the server
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Markdown Input Area */}
      <div style={{ width: "48%" }}>
        <h2>Markdown Input</h2>
        <textarea
          value={markdown}
          onChange={handleInputChange}
          style={{ width: "100%", height: "300px" }}
          placeholder="Type Markdown here..."
        />
      </div>

      {/* HTML Output Pane */}
      <div style={{ width: "48%" }}>
        <h2>HTML Output</h2>
        <div
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            height: "300px",
            overflowY: "auto",
            backgroundColor: "#f7f7f7",
            whiteSpace: "pre-wrap",
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
