'use strict';

const get = require('lodash').get;
const isEmpty = require('lodash').isEmpty;
const parseStringPromise = require('xml2js').parseStringPromise;
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
  /**
   * Override the find() function for this Controller to fetch Medium articles
   */
  async find () {
    // Fetch 'cached' RSS feed results from the database
    const results = await strapi.query('articles').find();

    if (!isEmpty(results)) {
      if (get(results, '0.created_at', null)) {
        // Grab the 'updated_at' info from the first entry to check when it was inserted
        const updatedAt = results[0].created_at;
        const date = moment(updatedAt).format('X');
        const now = moment().utc().format('X');

        // If the insertion happened over 3 hours ago, redo RSS call
        if ((parseInt(date) + 10800) > now) {
          return results;
        }
      }
    }

    const dbArticles = await strapi.query('articles').find();

    // Delete any previous entries if we reached this far
    dbArticles.forEach((entry) => strapi.query('articles').delete({ id: entry.id }));

    // Do an HTTP request and parse the XML
    const articles = await fetch('https://medium.com/feed/' + process.env.STRAPI_MEDIUM_USERNAME)
      .then(response => response.text())
      .then(str => parseStringPromise(str))
      .then(result => {
        return get(result, 'rss.channel[0].item', '');
      });

    if (articles) {
      // Safely loop the articles and insert to DB,
      // The RSS feed is quite limited and only returns ~10 latest entries
      for (let article of articles) {
        if (get(article, 'description[0]', false)) {
          let pubDate = get(article, 'pubDate[0]', null);

          if (pubDate) {
            pubDate = dateToMysqlDatetime(new Date(pubDate));
          }

          const obj = {
            title: get(article, 'title[0]', ''),
            description: get(article, 'description[0]', null),
            link: get(article, 'link[0]', null),
            published_at: pubDate
          };

          await strapi.query('articles').create(obj);
        }
      }

      return await strapi.query('articles').find();
    }

    return [];
  }
};

/**
 * Parses a Date object to MySQL Datetime column format
 */
function dateToMysqlDatetime (date) {
  return date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
}
