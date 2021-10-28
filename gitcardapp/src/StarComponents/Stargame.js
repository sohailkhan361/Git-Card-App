//https://jscomplete.com/playground/rgs3.7

import React, { useState, useEffect } from 'react';
import styles from './Stargame.module.css';
import PlayNumber from './Number.js';
import StarDisplay from './StarDisplay.js';
import PlayAgain from './PlayAgain';
import useGameState from './UseGameState.js';
// STAR MATCH - Starting Template

const Game = props => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0
    ? 'won'
    : secondsLeft === 0 ? 'lost' : 'active'

  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className={styles.game}>

      <div className={styles.help}>
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay count={stars} />
          )}
        </div>
        <div className={styles.right}>
          {utils.range(1, 9).map(number => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className={styles.timer}>Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = (props) => {
  const [gameId, setGameId] = useState(1);
  return (
    <React.Fragment>
      <div className={styles.header}>{props.title}</div>
      <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
    </React.Fragment>

  );
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch;


/*
// Multiple tools
-APIs
-Configurations
-Releases

// Multiple Environments
-Developed
-Production
-Test

// Different renderers
-DOM
-SSR

//Create React App
>npm -v 
OR
>npx -v

>npm i -g create-react-app && create-react-app cra-test
OR
>npx create-react-app cra-test

-the x in npx is for execution, we are directly using the react-app current version directly from the registry
-npx will directly download and cache it the package and update it when we run it next time
-create-react-app will install its own dependencies namely react,react-dom and react-scripts 
 
we run different command in the newly created directory 
>npm start: for starting the development server and open the app in browser
>npm run eject: to eject the application from the internal abstraction, 
                it is permanent and will copy all configurations and scripts used by this tool locally to our project and we can modify this as we wish. 

//jscomplete.com/reactful

//Creating our own JS Development Environment
1. Initializing
>mkdir fulljs
>cd fulljs
>npm init

//will ask few questions so can pass 'y' for yes like: npm init -y
// it will generate package.json file

2.Installing the dependencies
>nom i express
//express is framework to create a nodejs webserver to do the server side rendering of your react application
// it will download express npm package and place it under node_modules folder (first to create) and save it in package.json file

>npm i react react-dom

>npm i webpack webpack-cli
//webpack is a module bundler, to bundle external modules into single file that can work in all browsers today

//These all so far are production dependencies,

>npm i babel-loader @babel/core @babel/node @babel/preset-env @babel/preset-react
//babel tells webpack while bundling the stuff that the jsx encountered are to be transformed into React API calls

3. Installing Development Dependencies 
>npm i -D nodemon
//Monitors any changs to file and restarts the node automatically

//Very Important
>npm i -D eslint babel-eslint eslint-plugin-react eslint-plugin-react-hooks 
//ESLInt will give best suggestions and recommendations
//create and add eslint file

//Add this file to main directory
.eslintrc.js
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // You can do your customizations here...
    // For example, if you don't want to use the prop-types package,
    // you can turn off that recommended rule with: 'react/prop-types': ['off']
  },
};

//To make your editor auto-format code for you on save as well using Prettier. Prettier works great with ESLint.

//The most popular testing library that’s usually used with React is Jest. 
//Install that if you plan to write tests for your React project (and you should!). 
//You’ll also need babel-jest and a test renderer like react-test-renderer:
>npm i -D jest babel-jest react-test-renderer

4. Creating an Initial Directory Structure:
//These are the defaults that webpack is gonna look for

fulljs/
  dist/
    main.js
  src/
    index.js
    components/
      App.js
    server/
      server.js

5. Configuring Webpack and Babel
//To configure Babel to compile JSX and modern JavaScript code, 
// create a babel.config.js file under the root of the project and put the following module.exports object in it:
//On top level only add these files:

//babel.config.js

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};

//webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

//Webpack has certain defaults on which JavaScript file to start with.
// It looks for a src/index.js file. It’ll also output the bundle to dist/main.js by default. 
//  If you need to change the locations of your src and dist files,
//   you’ll need a few more configuration entries in webpack.config.js

6. Creating npm Scripts for Development
// In package.json
scripts: {
  "test": "jest"
}

OR

"dev:server": "nodemon --exec babel-node src/server/server.js --ignore dist/" 
"dev:bundler": "webpack -w --mode=development"

// -w is for watch mode, --mode=development flag is to make Webpack generate a development-friendly bundle.

7. Testing Everything with a Sample React Application

//If you followed the exact configurations above, 
// you’ll need to place your ReactDOM.render call (or .hydrate for Server Side Render (SSR code) ) in src/index.js and 
//  serve dist/main.js in your root HTML response.
// Here is a sample server-side ready React application that you can test with:

// src/components/App.js
import React, { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      This is a sample stateful and server-side
      rendered React application.
      <br />
      <br />
      Here is a button that will track
      how many times you click it:
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
ReactDOM.hydrate(
  <App />,
  document.getElementById('mountNode'),
);

// src/server/server.js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';
const server = express();
server.use(express.static('dist'));
server.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Sample React App</title>
      </head>
      <body>
        <div id="mountNode">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `)
});

server.listen(4242, () => console.log('Server is running...'));

//Finally Run the following commands in two terminals separately
>npm run dev:server
and
>npm run dev:bundler 

//open up browser on http://localhost:4242
//Even after disabling javascript in browser, we will get the app running as it is server-side rendered

//Github.com/jscomplete/rgs-template

//To use the template for the app to customize and create your own app,
//  you can use the package by the author
>npx reactful star-match
//This is optimized, no extra features, files, SSR type

//References:
//Github.com/jscomplete/rgs-star-match
//jscomplete.com/react-beyond-basics 
//jscomplete.com/why-graphql

*/