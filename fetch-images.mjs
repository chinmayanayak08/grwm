import fs from 'fs';

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

for (const q of queries) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=1`);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        let u = data.results[0].urls.raw;
        urls.push(u + "&w=500&h=500&fit=crop");
      } else {
        urls.push('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
      }
    } else {
      urls.push('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
    }
  } catch (err) {
    urls.push('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop');
  }
}

fs.writeFileSync('urls.json', JSON.stringify(urls, null, 2));
