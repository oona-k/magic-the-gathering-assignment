import React, { useEffect, useState } from "react";

const TableOfContents = ({ headingsList }) => {

  return (
    <div className="tableOfContents">
      <h1>Table of Contents</h1>
      <div>{headingsList}</div>
    </div>
  );
};

export default TableOfContents;
