import React, { useState, useEffect } from 'react';
import ActorScriptNav from './actorScriptNav';

const Script = ({ actors, scriptOption }) => {
  const [script, setScript] = useState([]);
  const [currentActor, setCurrentActor] = useState([]);
  const [currentCharacters, setCurrentCharacters] = useState([]);

  // fetch the specified script
  useEffect(() => {
    fetch('/script/' + scriptOption)
      .then((response) => response.json())
      .then((fetchedScript) => {
        setScript([...fetchedScript]);
      })
      .catch((error) => {
        console.error(`error: ${error} when fetching script`);
      });
  }, [scriptOption]);

  // create div and p elements for each chunk of lines
  const lineChunks = [];
  const characterSet = new Set(currentCharacters);
  let currentActorCharacter;

  for (let i = 0; i < script.length; i++) {
    // assign the character name as the className for the div
    const name = script[i][0].replace('.', '').toLowerCase();
    if (characterSet.has(name.toUpperCase())) {
      currentActorCharacter = `currentActor`;
    } else {
      currentActorCharacter = 'notCurrentActor';
    }
    lineChunks.push(
      <div className={(name, currentActorCharacter)}>
        <blockquote>
          {script[i].map((lines) => (
            <span>
              {lines}
              <br></br>
            </span>
          ))}
        </blockquote>
      </div>
    );
  }

  return (
    <div id='scriptPage'>
      <ActorScriptNav
        actors={actors}
        setCurrentActor={setCurrentActor}
        setCurrentCharacters={setCurrentCharacters}
        scriptOption={scriptOption}
      />
      <h2>script</h2>
      <h5>
        Current Actor: {currentActor[0]} {currentActor[1]}
      </h5>
      <div id='scriptDiv'>{lineChunks}</div>
    </div>
  );
};

export default Script;
