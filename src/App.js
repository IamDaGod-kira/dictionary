import React, { useState } from "react";
import Axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  function getMeaning() {
    Axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchWord}?key=a2d3b46e-d8db-458c-9e3a-a10b3a9ddf79`
    ).then((response) => {
      if (response.data.length > 0 && typeof response.data[0] === "object") {
        setData(response.data[0]);
      } else {
        setData(null);
      }
    });
  }

  function playAudio() {
    if (
      data &&
      data.hwi &&
      data.hwi.prs &&
      data.hwi.prs[0] &&
      data.hwi.prs[0].sound
    ) {
      let audio = new Audio(
        `https://media.merriam-webster.com/audio/prons/en/us/mp3/${data.hwi.prs[0].sound.audio}.mp3`
      );
      audio.play();
    }
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
            {data.meta.id}{" "}
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
          <p className="text-green-700 dark:text-green-200">{data.fl}</p>
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-300 mt-4">
            Definition:
          </h4>
          {data.def[0].sseq.map((sseqItem, index) => (
            <p key={index} className="text-green-700 dark:text-green-200">
              {sseqItem[0][1].dt[0][1].replace(/\{.*?\}/g, "")}
            </p>
          ))}
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-300 mt-4">
            Examples:
          </h4>
          {data.def[0].sseq.map(
            (sseqItem, index) =>
              sseqItem[0][1].dt[1] &&
              sseqItem[0][1].dt[1][1].map((exampleItem, exampleIndex) => (
                <p
                  key={exampleIndex}
                  className="text-green-700 dark:text-green-200"
                >
                  {exampleItem.t}
                </p>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;

