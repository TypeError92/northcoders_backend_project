# NC News API

## About
This repo is the product of a 1-week backend project phase within [Northcoders](https://northcoders.com/)'
award-winning 13-week [Skills Bootcamp in Software Development](https://northcoders.com/our-courses/skills-bootcamp-in-software-development).
The goal of this project was the creation of an examplary Express API server. "Northcoders News" or "NC News" is a fictional news service that publishes articles and allows users to comment on them.

## Using this repository
### Test / Development

1. Navigate to the desired location on your device via:  
`cd /path/to/desidered/location`

2. Clone this repository onto your device via:  
`git clone https://github.com/TypeError92/northcoders_backend_project.git`  

3. Install all dependencies via `npm install` or simply `npm i`.

4. Set up environment variables for the test and development environemen by adding the following two files to the root directory of your cloned repository:

    | path | content |
    | :--- | :--- |
    | ./.env.development| `PGDATABASE=nc_news` |
    | ./.env.test| `PGDATABASE=nc_news_test` |

5. Hide your environment files by making sure your ./.gitignore file contains the line:  
`.env.*`

6. Setup your databases via `npm run setup-dbs`.

#### Tests
Test-Driven Devlopment (TDD) is a core component of Northcoders' curriculum. Careful tests have been designed using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) and can be found under ./\_\_tests__.

You can rull all tests via `npm run test` or simply `npm t`. To run only enpoint/utility tests, use `npm t ./__tests__/endpoints.test.js` or `npm t ./__tests__/utils.test.js`, respectively. To isolate individual tests or test blocks, add `.only` to the relevant call of `test` or `describe`, e.g.:  

    test('{response code}: {test description}', () => {
        expect(things).toHappen()
    });

To:

    test.only('{response code}: {test description}', () => {
        expect(things).toHappen()
    });

### Production

You can find a hosted version of the app at https://nc-news-yxyq.onrender.com. 


To make a GET request, simply type a complete URL into your browser (you may want to use a JSON formatter such as [Basic JSON Formatter](https://github.com/DoctorMcKay/firefox-json-formatter/blob/master/README.md) for improved readability). To make POST, PATCH, or DELETE requests, you can use an API development platform like [Insomnia](https://insomnia.rest/).

For an overview of all available endpoints, see [/api](https://nc-news-yxyq.onrender.com/api).



**Note:** POST /api/articles/:article_id_comments will only accept comments from "registred" users. For valid usernames you can use to test this endpoint, see [/api/users](https://nc-news-yxyq.onrender.com/api/users).


## Updates
- 18/08/2023: v1 hosted!