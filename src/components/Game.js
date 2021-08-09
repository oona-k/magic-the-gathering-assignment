import React, { useEffect, useState } from "react";
import TableOfContents from "./TableOfContents";
import Rules from "./Rules";

const Game = () => {
  const [wholeText, setWholeText] = useState("");

  const startRegex = /Contents/;
  const endRegex = /Glossary/;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [headings, setHeadings] = useState([]);

  const fileUrl =
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"; // provide file location

  fetch(fileUrl)
    .then((r) => r.text())
    //.then( t => console.log(t) )
    .then((t) => setWholeText(t))
    .then((t) => setStartIndex(wholeText.search(startRegex)))
    .then((t) => setEndIndex(wholeText.search(endRegex)));
  //.then((t) => setContents(wholeText.slice(821, 3837)));

  return (
    <div>
      <h1>Game component</h1>
      <TableOfContents
        startIndex={startIndex}
        endIndex={endIndex}
        wholeText={wholeText}
      />
      <Rules wholeText={wholeText} endIndex={endIndex}/>
    </div>
  );
};

export default Game;
