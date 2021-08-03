import React, {useState} from 'react';

const TableOfContents = () => {
    const [rules, setRules] = useState('')

    const fileUrl = 'https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt' // provide file location

fetch(fileUrl)
   .then( r => r.text() )
   //.then( t => console.log(t) )
   .then( t  => setRules(t))

    return (
        <div>
            <h1>Table of Contents</h1>
            <p>{rules}</p>
        </div>
    );
}

export default TableOfContents;
