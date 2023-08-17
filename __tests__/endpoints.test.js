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
    test('400: returns error for invalid :article_id', () => {
      return request(app)
        .get('/api/articles/forty-two')
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: 'Bad request.' });
        });
    });
  });
  describe('404', () => {
    test('404: returns error for valid but non-existent :article_id', () => {
      return request(app)
        .get('/api/articles/42')
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: 'Resource not found.' });
        });
    });
  });
});

describe('PATCH /api/articles/:article_id', () => {
    describe('200', () => {
        test("200: increments an article's vote count an integer given in the request body, returns updated article", () => {
            const requestBody = {inc_votes: 11}
            return request(app)
            .patch('/api/articles/1')
            .send(requestBody)
            .expect(200)
            .then(({body}) => {
                const article = body.article
                expect(article.article_id).toEqual(1);
                expect(article.title).toEqual("Living in the shadow of a great man");
                expect(article.topic).toEqual("mitch");
                expect(article.author).toEqual("butter_bridge");
                expect(article.created_at).toEqual(expect.any(String));
                expect(article.votes).toEqual(111);
                expect(article.article_img_url).toEqual(expect.any(String));
            })
        })
        test("200: works for negative increments", () => {
            const requestBody = {inc_votes: -1}
            return request(app)
            .patch('/api/articles/1')
            .send(requestBody)
            .expect(200)
            .then(({body}) => {
                const article = body.article
                expect(article.article_id).toEqual(1);
                expect(article.title).toEqual("Living in the shadow of a great man");
                expect(article.topic).toEqual("mitch");
                expect(article.author).toEqual("butter_bridge");
                expect(article.created_at).toEqual(expect.any(String));
                expect(article.votes).toEqual(99);
                expect(article.article_img_url).toEqual(expect.any(String));
            })
        })
        test('200: ignores surplus properties in the request body', () => {
            const requestBody = {inc_votes: -1, surplus: 'property'}
            return request(app)
            .patch('/api/articles/1')
            .send(requestBody)
            .expect(200)
            .then(({body}) => {
                const article = body.article
                expect(article.article_id).toEqual(1);
                expect(article.title).toEqual("Living in the shadow of a great man");
                expect(article.topic).toEqual("mitch");
                expect(article.author).toEqual("butter_bridge");
                expect(article.created_at).toEqual(expect.any(String));
                expect(article.votes).toEqual(99);
                expect(article.article_img_url).toEqual(expect.any(String));
            })
        })
    });
    describe('400', () => {
        test('400: returs error for missing inc_vote', () => {
            const requestBody = {other: 'property'}
            return request(app)
            .patch('/api/articles/1')
            .send(requestBody)
            .expect(400)
            .then(({ body }) => {
              expect(body).toEqual({ msg: 'Bad request.' });
            });
        });
        test('400: returs error for invalid inc_vote', () => {
            const requestBody = {inc_votes: 'invalid'}
            return request(app)
            .patch('/api/articles/1')
            .send(requestBody)
            .expect(400)
            .then(({ body }) => {
              expect(body).toEqual({ msg: 'Bad request.' });
            });
        });
        test('400: returs error for invalid :article_id', () => {
            const requestBody = {inc_votes: -1}
            return request(app)
            .patch('/api/articles/forty-two')
            .send(requestBody)
            .expect(400)
            .then(({ body }) => {
              expect(body).toEqual({ msg: 'Bad request.' });
            });
        });
      });
    describe('404', () => {
        test('404: returs error for valid but non-existent :article_id', () => {
            const requestBody = {inc_votes: -1}
            return request(app)
            .patch('/api/articles/99')
            .send(requestBody)
            .expect(404)
            .then(({ body }) => {
              expect(body).toEqual({ msg: 'Resource not found.' });
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
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    describe('201', () => {
        test('201: posts a new comment and responds with an object representing the new comment', () => {
            return request(app)
            .post('/api/articles/2/comments')
            .send({username: 'lurker', body: "I can't even..."})
            .expect(201)
            .then(({body}) => {
                expect(body.new_comment).toEqual({
                    comment_id: 19,
                    votes: 0,
                    body: "I can't even...",
                    author: 'lurker',
                    created_at: expect.any(String),
                    article_id: 2
                });
            });
          });
        test('201: ignores surplus properties in the request body', () => {
        return request(app)
        .post('/api/articles/2/comments')
        .send({username: 'lurker', body: "I can't even...", surplus: 'property'})
        .expect(201)
        .then(({body}) => {
            expect(body.new_comment).toEqual({
                comment_id: 19,
                votes: 0,
                body: "I can't even...",
                author: 'lurker',
                created_at: expect.any(String),
                article_id: 2
            });
        });
        });
})
    
    describe('400', () => {
        test('400: returns error for request body with incorrect/missing keys', () => {
            return request(app)
          .post('/api/articles/2/comments')
          .send({username: 'lurker', boddy: "I can't even..."})
          .expect(400)
          .then(({body}) => {
              expect(body.msg).toEqual('Bad request.');
            });
        });
        test('400: returns error for request body with invalid article_id', () => {
            return request(app)
          .post('/api/articles/invalid/comments')
          .send({username: 'lurker', body: "I can't even..."})
          .expect(400)
          .then(({body}) => {
              expect(body.msg).toEqual('Bad request.');
            });
        });
        test('400: returns error for request body with invalid username', () => {
            return request(app)
          .post('/api/articles/2/comments')
          .send({username: 0, body: "I can't even..."})
          .expect(400)
          .then(({body}) => {
              expect(body.msg).toEqual('Bad request.');
            });
        });
        test('400: returns error for request body with invalid body', () => {
            return request(app)
          .post('/api/articles/2/comments')
          .send({username: 'lurker', body: []})
          .expect(400)
          .then(({ body }) => {
            expect(body).toEqual({ msg: 'Bad request.' });
          });
        });
    });
    describe('404', () => {
        test('404: returns error for valid but non-existent article_id', () => {
            return request(app)
          .post('/api/articles/99/comments')
          .send({username: 'lurker', body: "I can't even..."})
          .expect(404)
          .then(({body}) => {
              expect(body.msg).toEqual('Resource not found.');
            });
        });
        test('404: returns error for valid but non-existent username', () => {
            return request(app)
          .post('/api/articles/2/comments')
          .send({username: 'me', body: "I can't even..."})
          .expect(404)
          .then(({body}) => {
              expect(body.msg).toEqual('Resource not found.');
            });
        });
        
    });
});

describe('DELETE /api/comments/:comment_id', () => {
    describe('204', () => {
        test('delets the comment with the comment for the given comment_id and responds with no content', () => {
            return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then((res) => {
                expect(res.body).toEqual({})
            })
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
