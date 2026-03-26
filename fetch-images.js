const https = require('https');
const fs = require('fs');

const queries = [
  "Ivory saree fashion", "Velvet lehenga blue", "Burgundy anarkali formal", 
  "Blush linen summer dress", "Sage green shirt dress", "black blazer women", 
  "Plum sequin gown", "Mustard yellow wrap dress", "Charcoal tailored suit men", 
  "Denim jacket men outdoor", "Plum silk gown", "Mens waistcoat suit", 
  "Pastel chiffon dress spring", "sports joggers street style", "linen pants casual women", 
  "velvet dinner jacket men", "Satin slip dress", "sweater and corduroy pants", 
  "mens pattern shirt grey suit", "Tropical maxi dress"
];

const urls = [];

function fetchUrl(q) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0].urls.raw + "&w=500&h=500&fit=crop");
          } else {
            resolve('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
          }
        } catch(e) {
          resolve('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
        }
      });
    }).on('error', () => {
      resolve('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
    });
  });
}

(async () => {
  for (const q of queries) {
    const u = await fetchUrl(q);
    urls.push(u);
  }
  fs.writeFileSync('urls.json', JSON.stringify(urls, null, 2));
  console.log('done');
})();
