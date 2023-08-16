const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');
const { convertTimestampToDate } = require('../db/seeds/utils');
const endpoints = require('../endpoints.json');
const data = require('../db/data/test-data/');
const seed = require('../db/seeds/seed.js');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe('GET /api', () => {
  test('200: responds with an object describing all available endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});

describe('GET /api/articles', () => {
  test('200: responds with an array of all currently stored article objects with .body removed and .comment_count added', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(Object.keys(article)).toEqual([
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'article_img_url',
            'comment_count',
          ]);

          expect(article.article_id).toEqual(expect.any(Number));
          expect(article.title).toEqual(expect.any(String));
          expect(article.topic).toEqual(expect.any(String));
          expect(article.author).toEqual(expect.any(String));
          expect(article.created_at).toEqual(expect.any(String));
          expect(article.votes).toEqual(expect.any(Number));
          expect(article.article_img_url).toEqual(expect.any(String));
          expect(article.comment_count).toEqual(expect.any(Number));
        });

        expect(articles).toBeSortedBy('created_at', { descending: true });
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  describe('200', () => {
    test('200: responds with an article with the requested article_id', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(Object.keys(article)).toEqual([
            'article_id',
            'title',
            'topic',
            'author',
            'body',
            'created_at',
            'votes',
            'article_img_url',
          ]);

          expect(article.article_id).toBe(1);
          expect(article.title).toEqual(expect.any(String));
          expect(article.topic).toEqual(expect.any(String));
          expect(article.author).toEqual(expect.any(String));
          expect(article.body).toEqual(expect.any(String));
          expect(article.created_at).toEqual(expect.any(String));
          expect(article.votes).toEqual(expect.any(Number));
          expect(article.article_img_url).toEqual(expect.any(String));
        });
    });
  });
  describe('400', () => {
    test('400: returs error for invalid :article_id', () => {
      return request(app)
        .get('/api/articles/forty-two')
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: 'invalid_text_representation' });
        });
    });
  });
  describe('404', () => {
    test('404: returs error for valid but non-existent :article_id', () => {
      return request(app)
        .get('/api/articles/42')
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: 'Resource not found' });
        });
    });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
    describe('200', () => {
        test('200: responds with an array of comment objects for the given article_id', () => {
            return request(app)
              .get('/api/articles/9/comments')
              .expect(200)
              .then(({ body }) => {
                const comments = body.comments;
                expect(comments).toEqual(
                    [{
                        comment_id: 1,
                        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                        votes: 16,
                        author: "butter_bridge",
                        article_id: 9,
                        created_at: expect.any(String),
                    },
                    {
                        comment_id: 17,
                        body: "The owls are not what they seem.",
                        votes: 20,
                        author: "icellusedkars",
                        article_id: 9,
                        created_at: expect.any(String),
                    }]
                )
              });
        
        })
        test('200: sorts comments by creation date in descending order', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body }) => {
                const comments = body.comments;
                expect(comments.length).toBe(11)
                expect(comments).toBeSortedBy('created_at', {descending: true})
              });
        
        })
        test('200: returns [] if article exists but no comments are found', () => {
            return request(app)
              .get('/api/articles/2/comments')
              .expect(200)
              .then(({ body }) => {
                const comments = body.comments;
                expect(comments).toEqual([])
              });
        
        })
    
    });
    test('400: returns error for invalid :article_id', () => {
        return request(app)
          .get('/api/articles/forty-two/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body).toEqual({ msg: 'invalid_text_representation' });
          });
    });
    test('404: returs error for valid but non-existent :article_id', () => {
        return request(app)
          .get('/api/articles/42/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body).toEqual({ msg: 'Resource not found' });
          });
    });
});

describe('GET /api/topics', () => {
  test('200: responds with an array of all currently stored topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch',
          },
          {
            description: 'Not dogs',
            slug: 'cats',
          },
          {
            description: 'what books are made of',
            slug: 'paper',
          },
        ]);
      });
  });
});
