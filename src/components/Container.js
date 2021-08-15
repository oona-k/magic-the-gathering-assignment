import React, { useEffect, useState } from "react";
import TableOfContents from "./TableOfContents";
import Rules from "./Rules";
import SearchBox from "./SearchBox";

const Container = () => {
  const [wholeText, setWholeText] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [chapterNumber, setChapterNumber] = useState();
  const [selectedRule, setSelectedRule] = useState("");
  const [rulesText, setRulesText] = useState("");
  const [splittedRulesText, setSplittedRulesText] = useState([]);
  const [contents, setContents] = useState("");
  const [splitted, setSplitted] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [indexOfFirst, setIndexOfFirst] = useState(0);
  const [indexOfSecond, setIndexOfSecond] = useState(1);

  const startRegex = /Contents/;
  const endRegex = /Glossary/;

  const fileUrl =
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"; // file location

  useEffect(() => {
    if (wholeText === "") {
      fetch(fileUrl)
        .then((r) => r.text())
        //.then( t => console.log(t) )
        .then((t) => setWholeText(t));
      //.then((t) => setStartIndex(wholeText.search(startRegex)))
      //.then((t) => setEndIndex(wholeText.search(endRegex)));
      //.then((t) => setContents(wholeText.slice(821, 3837)));
    }
  });

  useEffect(() => {
    if (wholeText !== "") {
      setStartIndex(wholeText.search(startRegex));
      setEndIndex(wholeText.search(endRegex));
      //console.log(wholeText.indexOf("Glossary"));
    }
  }, [wholeText]);

  useEffect(() => {
    if (endIndex > 0) {
      console.log(wholeText.indexOf("Glossary", endIndex + 1));
      setIndexOfSecond(wholeText.indexOf("Glossary", endIndex + 1));
    }
  }, [endIndex]);

  useEffect(() => {
    setContents(
      wholeText.slice(startIndex, endIndex)
      //wholeText.slice(startIndex, endIndex).replaceAll("\r\n", "")
    );
    //setContents(contents.replace("\n", "<br/>"));
  }, [wholeText, startIndex, endIndex]);

  useEffect(() => {
    const regex = /\r\n/g;
    setSplitted(contents.split(regex));
    console.log(splitted);
  }, [contents]);

  const chapterClicked = (itemNumber) => {
    setSearchResults([]);
    setChapterNumber(itemNumber);
    const startMemberIndex = splittedRulesText.findIndex(
      (i) => i === "\r\n" + itemNumber
    );
    console.log(itemNumber, startMemberIndex, startMemberIndex + 2);
    setSelectedRule(
      splittedRulesText.slice(startMemberIndex, startMemberIndex + 2)
    );
  };

  const headingsList = splitted.map((item, i) => (
    <p
      className={item[1] === "." ? "chapter chapterHeading" : "chapter"}
      onClick={() => chapterClicked(item.substring(0, 3))}

      /* onClick={chapterClicked(item.substring(0, 3))} */
    >
      {item}
    </p>
  ));

  useEffect(() => {
    if (wholeText && endIndex > 0 && indexOfSecond > endIndex) {
      setRulesText(wholeText.slice(endIndex, indexOfSecond));
      console.log(rulesText);
    }
  }, [wholeText, endIndex, indexOfSecond]);

  useEffect(() => {
    const regex = /(\r\n[0-9]{3})\.\s/g;
    setSplittedRulesText(rulesText.split(regex));
    console.log(rulesText.split(regex));
  }, [rulesText]);

  /*   const rulesList = splittedRulesText.map((item, i) => (
    <div id={item.substring(0, 3)}>{item}</div>
  )); */

  const onSearchClick = (chaptersWithKeyword) => {
    console.log(chaptersWithKeyword);
    setSearchResults(chaptersWithKeyword);
  };

  return (
    <div className="container">
      <h1>Magic the Gathering</h1>
      <SearchBox rules={splittedRulesText} onSearchClick={onSearchClick} />
      <div className="game">
        <TableOfContents headingsList={headingsList} />
        <Rules selectedRule={selectedRule} searchResults={searchResults} />
      </div>
    </div>
  );
};

export default Container;
