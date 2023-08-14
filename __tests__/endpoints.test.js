const app = require('../app')
const connection = require('../db/connection')
const data = require("../db/data/test-data/")
const request = require('supertest')
const seed = require('../db/seeds/seed.js')

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return connection.end()
})

describe('GET /api/topics', () => {
    test('200: responds with an array of all currently stored topic objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual([
                {
                  description: 'The man, the Mitch, the legend',
                  slug: 'mitch'
                },
                {
                  description: 'Not dogs',
                  slug: 'cats'
                },
                {
                  description: 'what books are made of',
                  slug: 'paper'
                }
              ])
        })
    });
    
});