const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      params: {
        query,
        'tweet.fields': 'created_at,author_id,attachments',
        'expansions': 'author_id,attachments.media_keys',
        'user.fields': 'username,profile_image_url',
        'media.fields': 'url,preview_image_url,media_key,type',
        max_results: 10,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching tweets:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch tweets', details: error.message });
  }
};
