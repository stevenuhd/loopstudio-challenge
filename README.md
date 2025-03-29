# loopstudio-challenge
loopstudio next.js/react challenge

## Getting Started

First, run the development server:

1.- clone the repositorie in your local
git clone <URL_DEL_REPO>

2.- cd country-vote-app
3.- install dependencies 
npm install or yarn install

4.- Run the proyect in your terminal (dev)
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


5.- Open [http://localhost:3000](http://localhost:3000)

6.- If you want to check the tests use
    npm test

## A brief explanation of my approach

My goal with this application is to make a simple, ordered and maintainable code. Decisions of more generalized folders were taken since the amount of components is reduced. For this application it was decided to handle the state locally (props and custom hooks) since it is not justified to useContext or redux for this kind of small application. The points that were analyzed are:
Data is only needed at a few component levels.
The structure of the component tree is not deep.
The information does not need to be shared among many components.
