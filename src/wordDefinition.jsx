export default function WordDefinition({ definition }) {
  let output = !definition.length ? (
    <div className="word-not-found">
      <p className = "emojie">&#128531;</p>
      <h2>{definition.title}</h2>
      <p>
        {definition.message} {definition.resolution}
      </p>
    </div>
  ) : (
    definition.map((def) => {
      let audio;  //the pronounciation audio url.
      let meanings = def.meanings;  //each word has multiple meanings so we map the array to render it.

      // loops through the phonetics of the definition and breaks when it finds a none-empty url
      for (let i = 0; i < def.phonetics.length; i++) {
        let phonetic = def.phonetics[i];
        if (phonetic.audio !== "") {
          audio = phonetic.audio;
          break;
        }
      }

      return (
        <>

          <div className="def-header">

            <div>
              <h2 className="word">{def.word}</h2>
              <p className="phonetic">{def.phonetic}</p>
            </div>

            <a
              className="pronounciation"
              onClick={() => document.getElementById("audio").play()}
              onMouseOver={() => {document.getElementById("svg").style.width = "80px"; document.getElementById("svg").style.height = "80px"}}
              onMouseOut={() => {document.getElementById("svg").style.width = "75px"; document.getElementById("svg").style.height = "75px"}}
            >
              <svg
                id="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 75 75"
                class="sc-dmctIk dHcLFp"
              >
                <g fill="#A445ED" fill-rule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity="0.25"></circle>
                  <path d="M29 27v21l21-10.5z"></path>
                </g>
              </svg>
            </a>

            <audio style={{ display: "none" }} id="audio" src={audio}></audio>

          </div>

          {meanings.map((meaning) => {
            return <Meaning meaning={meaning} />;
          })}

        </>
      );
    })
  );

  return <section className="word-definition">{output}</section>;
}

function Meaning({ meaning }) {
  const definitions = [];
  const synonyms = [];
  const antonyms = [];
  let synsExist = false,
    antsExist = false,
    syns,
    ants;

  meaning.definitions.forEach((def) => {
    let example;
    if (def.example === null || def.example === undefined) example = "";
    else example = '"' + def.example + '"';

    definitions.push(
      <li className="definition">
        <p>{def.definition}</p>
        <p className="example">{example}</p>
      </li>
    );
  });

  if (meaning.synonyms.length > 0) synsExist = true;
  meaning.synonyms.forEach((syn) => {
    synonyms.push(<li>{syn}</li>);
  });

  if (meaning.antonyms.length > 0) antsExist = true;
  meaning.antonyms.forEach((ant) => {
    antonyms.push(<li>{ant}</li>);
  });

  syns = synsExist ? (
    <div className="synonyms">
      {" "}
      <h5>synonyms :</h5> <ul className="synonyms">{synonyms}</ul>{" "}
    </div>
  ) : (
    <span></span>
  );

  ants = antsExist ? (
    <div className="antonyms">
      {" "}
      <h5>antonyms: </h5> <ul className="antonyms">{antonyms}</ul>{" "}
    </div>
  ) : (
    <span></span>
  );

  return (
    <div>
      <div className="part-of-speech">
        <h3>{meaning.partOfSpeech}</h3>
        <hr />
      </div>

      <div className="definitions">
        <h5 className="h5">Definition</h5>
        <ul className="defs-container">{definitions}</ul>
        {syns}
        {ants}
      </div>
    </div>
  );
}
