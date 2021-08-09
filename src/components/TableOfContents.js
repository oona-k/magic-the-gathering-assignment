import React, { useEffect, useState } from "react";

const TableOfContents = ({ startIndex, endIndex, wholeText }) => {
  const [contents, setContents] = useState("");
  const [splitted, setSplitted] = useState([]);

  useEffect(() => {
    setContents(
      wholeText.slice(startIndex, endIndex)
      //wholeText.slice(startIndex, endIndex).replaceAll("\r\n", "")
    );

    //setContents(contents.replace("\n", "<br/>"));
  }, [wholeText, startIndex, endIndex]);

  useEffect(() => {
    // const regex = /Step/g;
    const regex = /\r\n/g;
    const numberOfLineBreaks = contents.search(regex);
    setSplitted(contents.split(regex));
    console.log(splitted);
    console.log(numberOfLineBreaks);
    //setHeadings([]);
  }, [contents, splitted]);

  const headingsList = splitted.map((item) => <p>{item}</p>);

  return (
    <div>
      <h1>Table of Contents</h1>
      {/* <p>{startIndex}</p> */}
      {/* <p>{endIndex}</p> */}
      <div>{headingsList}</div>
    </div>
  );
};

export default TableOfContents;
