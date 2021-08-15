import React, { useEffect, useState } from "react";

const Rules = ({ selectedRule, searchResults }) => {
  const [splittedRule, setSplittedRule] = useState("");

  useEffect(() => {
    const regex = /\r\n/g;
    if (
      selectedRule &&
      selectedRule !== "" &&
      selectedRule[1] &&
      selectedRule[1].includes(" ")
    ) {
      setSplittedRule(selectedRule[1].split(regex));
    }
  }, [selectedRule]);

  const rulesList = splittedRule
    ? splittedRule.map((item, i) => <p key={i}>{item}</p>)
    : "";

  const searchResultList = searchResults
    ? searchResults.map((item, i) => <p key={i}>{item}</p>)
    : "";

  return (
    <div className="rules">
      <h1>Rules</h1>
      <div className="rulesText">
        {searchResults && searchResults.length > 0
          ? searchResultList
          : rulesList}
      </div>
    </div>
  );
};

export default Rules;
