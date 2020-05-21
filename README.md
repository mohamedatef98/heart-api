# API for storing heart data

## To run this locally on your machine
1. Clone the repo.
2. run `npm i`.
3. get a mongodb server running.
4. create a new .env file inside the repo and add values to the variables there (refer to the .env.example file).
5. run `npm run dev`.

## You can check the production version of this at https://heart-api-2020.herokuapp.com/

## Endpoints
1. `get /heart` gives you list of all the records stored and sorted by time.

2. `get /heart/:_id` gives you a specfic record with `record._id = url._id`.

3. `post /heart` creates a new recored with following data `( time: Date, rate: Number )`.
