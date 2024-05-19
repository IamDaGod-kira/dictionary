import React, { useState } from "react";
import Axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-600 dark:text-green-300 mb-6">
        Free Dictionary
      </h1>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-green-600 dark:border-green-300 rounded-lg p-2 text-green-600 dark:text-green-300 bg-white dark:bg-black mb-2 md:mb-0 md:mr-2"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={getMeaning}
          className="flex items-center justify-center bg-green-600 dark:bg-green-300 text-white dark:text-black p-2 rounded-lg"
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-200 flex items-center mb-4">
            {data.word}{" "}
            <button
              onClick={playAudio}
              className="ml-2 text-green-700 dark:text-green-200"
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-300">
            Parts of speech:
          </h4>
          <p className="text-green-700 dark:text-green-200">
            {data.meanings[0].partOfSpeech}
          </p>
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-300 mt-4">
            Definition:
          </h4>
          <p className="text-green-700 dark:text-green-200">
            {data.meanings[0].definitions[0].definition}
          </p>
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-300 mt-4">
            Example:
          </h4>
          <p className="text-green-700 dark:text-green-200">
            {data.meanings[0].definitions[0].example}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;