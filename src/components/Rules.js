import React, { useEffect, useState } from "react";

const Rules = ({ selectedRule }) => {
  const [splittedRule, setSplittedRule] = useState("");

  useEffect(() => {
    const regex = /\r\n/g;
    if (selectedRule !== "") {
      setSplittedRule(selectedRule[1].split(regex));
    }
  }, [selectedRule]);

  const rulesList = splittedRule
    ? splittedRule.map((item) => <p>{item}</p>)
    : "";

  return (
    <div className="rules">
      <h1>Rules Component</h1>
      <div className="rulesText">{rulesList}</div>
    </div>
  );
};

export default Rules;
