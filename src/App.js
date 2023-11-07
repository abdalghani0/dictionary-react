import { useState } from "react";
import WordDefinition from "./wordDefinition";
import "./App.css";

export default function App() {
  const [word, setWord] = useState("");
  const [output, setOutput] = useState();
  
  const fetchWord = async (e) => {
    e.preventDefault();
    try {
      // assign loading to output while fetching;
      setOutput(<div id="loading"></div>);
      console.log(output);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      // assign value to output after fetching the data for best performance.
      setOutput(<WordDefinition definition={data} />);
      console.log(output);
    } 
    catch (error) {
      console.log(error);
    }
  };

  function handleSearch(event) {
    setWord(event.target.value);
  }

  return (
    <main className="app">
      <form className="form" onSubmit={(e) => fetchWord(e)}>
        <input
          className="search-bar"
          type="text"
          placeholder="search for any word..."
          onChange={(e) => handleSearch(e)}
        />
        <button className="search-btn" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 18 18"
            class="sc-gikAfH hOcekV"
          >
            <path
              fill="none"
              stroke="#A445ED"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            ></path>
          </svg>
        </button>
      </form>
      {output}
    </main>
  );
}
