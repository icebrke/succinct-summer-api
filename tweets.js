import fetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';

const proxyHost = 's-14189.sp6.ovh';
const proxyPort = '11002';
const proxyUser = 'vGL7v3mx_1';
const proxyPass = 'Z9RrXRFPRrtG';

const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
const agent = new HttpsProxyAgent(proxyUrl);

const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAACeX2wEAAAAAWwjmRxGrN6Tx1R7lgudBbcqqNiQ%3D7wZhFaDCLRpsH9jF4QVWvg5LpA76C0fdFegzgy418rF4jzRHot';

export default async function handler(req, res) {
  const { query } = req.query;
  const searchQuery = query || 'Succinct Summer';
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(searchQuery)}&max_results=5&expansions=attachments.media_keys,author_id&media.fields=url,type,preview_image_url&user.fields=username,profile_image_url,created_at`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      agent,
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
}
