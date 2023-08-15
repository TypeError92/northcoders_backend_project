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

describe('GET /api/articles', () => {
    test('200: responds with an array of all currently stored article objects with .body removed and .comment_count added', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body: articles}) => {
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(Object.keys(article)).toEqual([
                    'author',
                    'title',
                    'article_id',
                    'topic',
                    'created_at',
                    'votes',
                    'article_img_url',
                    'comment_count'
                ])

                expect(article.article_id).toEqual(expect.any(Number))
                expect(article.title).toEqual(expect.any(String))
                expect(article.topic).toEqual(expect.any(String))
                expect(article.author).toEqual(expect.any(String))
                expect(article.created_at).toEqual(expect.any(String))
                expect(article.votes).toEqual(expect.any(Number))
                expect(article.article_img_url).toEqual(expect.any(String))
                expect(article.comment_count).toEqual(expect.any(Number))
            })
        
            expect(articles).toBeSortedBy('created_at', {descending: true})
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
    describe('400', () => {
        test('400: returs error for invalid :article_id', () => {
            return request(app)
            .get('/api/articles/forty-two')
            .expect(400)
            .then(({body}) => {
                expect(body).toEqual({msg: 'invalid_text_representation'})
            })
        })
    })
    describe('404', () => {
        test('404: returs error for valid but non-existent :article_id', () => {
            return request(app)
            .get('/api/articles/42')
            .expect(404)
            .then(({body}) => {
                expect(body).toEqual({msg: 'ID not found'})
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