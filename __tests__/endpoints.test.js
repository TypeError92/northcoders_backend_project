const request = require('supertest')

const app = require('../app')
const connection = require('../db/connection')
const {convertTimestampToDate} = require('../db/seeds/utils')
const endpoints = require('../endpoints.json')
const data = require("../db/data/test-data/")
const seed = require('../db/seeds/seed.js')

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return connection.end()
})

describe('GET /api', () => {
    test('200: responds with an object describing all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(endpoints)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    describe('200', () => {
        test('200: responds with an article with the requested article_id', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
                expect(Object.keys(body)).toEqual([
                    'article_id',
                    'title',
                    'topic',
                    'author',
                    'body',
                    'created_at',
                    'votes',
                    'article_img_url'
                ])

                expect(body.article_id).toBe(1)
                expect(body.title).toEqual(expect.any(String))
                expect(body.topic).toEqual(expect.any(String))
                expect(body.author).toEqual(expect.any(String))
                expect(body.body).toEqual(expect.any(String))
                expect(body.created_at).toEqual(expect.any(String))
                expect(body.votes).toEqual(expect.any(Number))
                expect(body.article_img_url).toEqual(expect.any(String))
            })
        })
    })
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