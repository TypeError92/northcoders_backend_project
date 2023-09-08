const { checkExists } = require('./utils.models');

const db = require('../db/connection');

function fetchArticleById(article_id) {
  return db
    .query(
      `
        SELECT *
        FROM articles
        WHERE article_id = $1;
        `,
      [article_id]
    )
    .then(({ rows }) => {
      return rows.length
        ? rows[0]
        : Promise.reject({ status: 404, msg: 'Resource not found.' });
    });
}

function readArticles(sort_by = 'created_at', order = 'desc', topic) {
  if (
    !['author', 'title', 'article_id', 'created_at', 'votes', 'comment_by'].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: "${sort_by}" is not a valid sort key.`,
    });
  }

  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: "${order}" is not a valid order.`,
    });
  }

  const queryValues = topic ? [topic] : [];

  let queryStr = `
        SELECT
            articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.article_id)::int AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        `;
  if (topic) queryStr += 'WHERE articles.topic = $1';
  queryStr += `
        GROUP BY articles.article_id
        ORDER BY articles.${sort_by} ${order}
            `;

  return db.query(queryStr, queryValues);
}

function updateArticleVotes(inc_votes, article_id) {
  return checkExists('articles', 'article_id', article_id).then(() => {
    return db.query(
      `
            UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;
            `,
      [inc_votes, article_id]
    );
  });
}

module.exports = { fetchArticleById, readArticles, updateArticleVotes };
