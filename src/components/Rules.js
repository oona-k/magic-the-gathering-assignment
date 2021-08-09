import React, { useEffect, useState } from "react";

const Rules = ({ wholeText, endIndex }) => {
  const [rulesText, setRulesText] = useState("");
  const [splittedText, setSplittedText] = useState([]);

  useEffect(() => {
    setRulesText(wholeText.slice(endIndex));
  }, [wholeText, endIndex]);

  useEffect(() => {
    const regex = /\r\n/g;
    setSplittedText(rulesText.split(regex));
  }, [rulesText]);

  const rulesList = splittedText.map((item) => <p>{item}</p>);

  return (
    <div>
      <h1>Rules Component</h1>
      <p>{rulesList}</p>
    </div>
  );
};

export default Rules;
