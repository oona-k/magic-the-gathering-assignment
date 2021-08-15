import React, { useState } from "react";

const SearchBox = ({ rules, onSearchClick }) => {
  const [keyword, setKeyword] = useState("");

  const searchClicked = () => {
    const chaptersWithKeyword = [];
    let splittedChapters = [];
    const searchResults = [];

    const regex = /\r\n/g;

    for (var j = 0; j < rules.length; j++) {
      if (rules[j].toLowerCase().match(keyword)) {
        chaptersWithKeyword.push(rules[j]);
      }
    }
    for (var i = 0; i < chaptersWithKeyword.length; i++) {
      splittedChapters.push(chaptersWithKeyword[i].split(regex));
    }

    for (var h = 0; h < splittedChapters.length; h++) {
      splittedChapters[h] = splittedChapters[h].filter((item) => item !== "");

      for (var g = 0; g < splittedChapters[h].length; g++) {
        if (splittedChapters[g]) {
          const matchesFound = splittedChapters[g].filter((found) =>
            found.match(keyword)
          );
          for (var f = 0; f < matchesFound.length; f++) {
            if (
              !searchResults.includes(matchesFound[f]) &&
              !matchesFound[f].startsWith("Example:")
            ) {
              searchResults.push(matchesFound[f]);
            }
          }
        }
      }
    }
    onSearchClick(searchResults);
  };

  return (
    <div className="searchBox">
      <input
        key="searchRules"
        value={keyword}
        placeholder={"Enter keyword"}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <button onClick={() => searchClicked()}>Search</button>
    </div>
  );
};

export default SearchBox;
