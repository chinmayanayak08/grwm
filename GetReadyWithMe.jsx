import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const css = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  
  :root {
    --cream: #FAF7F2;
    --blush: #E8C4B8;
    --dusty: #C4A882;
    --deep: #1A1412;
    --plum: #3D1F2E;
    --sage: #7A8C6E;
    --gold: #C9A84C;
    --rose: #C17D6A;
    --mist: #D4CFC8;
    --ink: #2C2420;
  }

  .app {
    min-height: 100vh;
    background: var(--cream);
    color: var(--deep);
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2.5rem;
    border-bottom: 1px solid var(--mist);
    background: var(--cream);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.08em;
    color: var(--plum);
  }
  .logo span { font-style: italic; color: var(--rose); }
  .mode-toggle {
    width: 42px; height: 22px;
    border-radius: 11px;
    border: 1px solid var(--mist);
    background: var(--plum);
    cursor: pointer;
    position: relative;
    transition: background 0.3s;
  }
  .mode-toggle::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--cream);
    transition: transform 0.3s;
  }
  .mode-toggle.day { background: var(--gold); }
  .mode-toggle.day::after { transform: translateX(20px); }

  /* Hero */
  .hero {
    padding: 4rem 2.5rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .hero-label {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 0.75rem;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.15;
    color: var(--plum);
    margin-bottom: 0.5rem;
  }
  .hero-title em { font-style: italic; color: var(--rose); }
  .hero-sub {
    font-size: 0.9rem;
    color: var(--dusty);
    font-weight: 300;
    max-width: 420px;
  }

  /* Main layout */
  .main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2.5rem 4rem;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  /* Form Panel */
  .form-panel {
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid var(--mist);
    position: sticky;
    top: 80px;
  }
  .panel-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--plum);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--mist);
  }
  .form-group { margin-bottom: 1.25rem; }
  .form-label {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--dusty);
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  /* Chip selectors */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chip {
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid var(--mist);
    font-size: 0.78rem;
    cursor: pointer;
    background: transparent;
    color: var(--ink);
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .chip:hover { border-color: var(--rose); color: var(--rose); }
  .chip.selected { background: var(--plum); color: var(--cream); border-color: var(--plum); }

  /* Color palette */
  .palette {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .swatch {
    width: 28px; height: 28px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.2s, border-color 0.2s;
  }
  .swatch:hover { transform: scale(1.15); }
  .swatch.selected { border-color: var(--plum); transform: scale(1.15); }

  /* Text input */
  .text-input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--mist);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    background: var(--cream);
    color: var(--deep);
    outline: none;
    transition: border-color 0.2s;
  }
  .text-input:focus { border-color: var(--rose); }
  .text-input::placeholder { color: var(--mist); }

  /* CTA */
  .cta-btn {
    width: 100%;
    padding: 14px;
    background: var(--plum);
    color: var(--cream);
    border: none;
    border-radius: 12px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: 0.08em;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s, transform 0.15s;
  }
  .cta-btn:hover { background: var(--rose); transform: translateY(-1px); }
  .cta-btn:active { transform: translateY(0); }
  .cta-btn.loading { opacity: 0.7; cursor: not-allowed; }

  /* Results area */
  .results-area { min-height: 400px; }
  .results-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .results-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--plum);
  }
  .results-count {
    font-size: 0.78rem;
    color: var(--dusty);
    letter-spacing: 0.1em;
  }

  /* Outfit card grid */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  /* Outfit card */
  .outfit-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--mist);
    transition: transform 0.25s, box-shadow 0.25s;
    cursor: pointer;
    animation: fadeUp 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .outfit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(61,31,46,0.12);
  }
  .card-visual {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .card-visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.3));
  }
  .card-body { padding: 1.25rem; }
  .card-occasion {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rose);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--plum);
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .card-desc {
    font-size: 0.8rem;
    color: var(--dusty);
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 0.75rem;
  }
  .card-tag {
    font-size: 0.68rem;
    padding: 2px 8px;
    border-radius: 10px;
    background: var(--cream);
    color: var(--dusty);
    border: 1px solid var(--mist);
  }
  .card-actions {
    display: flex;
    gap: 8px;
  }
  .card-btn {
    flex: 1;
    padding: 7px;
    border-radius: 8px;
    font-size: 0.75rem;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    border: 1px solid var(--mist);
    background: transparent;
    color: var(--ink);
  }
  .card-btn:hover { border-color: var(--rose); color: var(--rose); }
  .card-btn.saved { background: var(--plum); color: var(--cream); border-color: var(--plum); }
  .card-btn.primary {
    background: var(--plum);
    color: var(--cream);
    border-color: var(--plum);
  }
  .card-btn.primary:hover { background: var(--rose); border-color: var(--rose); }

  /* Color tip */
  .color-tip {
    background: linear-gradient(135deg, #FDF6EF, #F5E8E0);
    border: 1px solid var(--blush);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--plum);
  }
  .color-tip strong { font-family: 'Cormorant Garamond', serif; font-size: 1rem; display: block; margin-bottom: 2px; }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--mist);
  }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
  .empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: var(--dusty);
    margin-bottom: 0.5rem;
  }
  .empty-sub { font-size: 0.85rem; color: var(--mist); }

  /* Loading skeleton */
  .skeleton-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--mist);
  }
  .skeleton-vis { height: 180px; background: linear-gradient(90deg, #f0ebe6 25%, #e8e2dc 50%, #f0ebe6 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
  .skeleton-body { padding: 1.25rem; }
  .skeleton-line { height: 10px; border-radius: 5px; background: linear-gradient(90deg, #f0ebe6 25%, #e8e2dc 50%, #f0ebe6 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; margin-bottom: 10px; }
  @keyframes shimmer { to { background-position: -200% 0; } }

  /* Detail modal */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(26,20,18,0.5);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } }
  .modal {
    background: var(--cream);
    border-radius: 24px;
    max-width: 520px;
    width: 100%;
    padding: 2.5rem;
    position: relative;
    animation: slideUp 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } }
  .modal-close {
    position: absolute;
    top: 1.25rem; right: 1.25rem;
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid var(--mist);
    background: transparent;
    cursor: pointer;
    font-size: 1rem;
    color: var(--dusty);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .modal-close:hover { background: var(--plum); color: var(--cream); }
  .modal-emoji { font-size: 3.5rem; margin-bottom: 1rem; }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--plum);
    margin-bottom: 0.5rem;
  }
  .modal-body { font-size: 0.88rem; color: var(--dusty); line-height: 1.7; margin-bottom: 1.25rem; }
  .modal-section { margin-bottom: 1rem; }
  .modal-section-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rose);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .modal-section-text { font-size: 0.88rem; color: var(--ink); line-height: 1.6; }
  .modal-color-strip {
    display: flex;
    gap: 8px;
    margin-top: 0.5rem;
  }
  .modal-swatch {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .share-row { display: flex; gap: 8px; margin-top: 1.5rem; }
  .share-btn {
    flex: 1; padding: 10px;
    border-radius: 10px;
    font-size: 0.82rem;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    border: 1px solid var(--mist);
    background: transparent;
    color: var(--ink);
    transition: all 0.2s;
  }
  .share-btn.primary { background: var(--plum); color: var(--cream); border-color: var(--plum); }
  .share-btn:hover { opacity: 0.85; }

  /* Festival banner */
  .festival-banner {
    background: linear-gradient(135deg, var(--plum), var(--rose));
    color: var(--cream);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .festival-icon { font-size: 2rem; }
  .festival-text { flex: 1; }
  .festival-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; }
  .festival-sub { font-size: 0.78rem; opacity: 0.8; }

  /* Saved section */
  .saved-badge {
    position: absolute;
    top: 10px; right: 10px;
    z-index: 2;
    background: var(--gold);
    color: #fff;
    border-radius: 50%;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem;
  }

  /* Day/Night indicator */
  .time-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 8px;
  }
  .time-pill.day { background: #FEF3C7; color: #92400E; }
  .time-pill.night { background: #1E1B4B; color: #C7D2FE; }

  /* Responsive */
  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr; padding: 0 1.25rem 3rem; }
    .form-panel { position: static; }
    .cards-grid { grid-template-columns: 1fr; }
    .hero { padding: 2rem 1.25rem 1.5rem; }
    .header { padding: 1rem 1.25rem; }
  }
`;

// ── Data ──────────────────────────────────────────────────────────────
const SWATCHES = [
  { name: 'Blush', hex: '#E8C4B8' },
  { name: 'Navy', hex: '#1B3A5C' },
  { name: 'Gold', hex: '#C9A84C' },
  { name: 'Sage', hex: '#7A8C6E' },
  { name: 'Ivory', hex: '#F9F5EC' },
  { name: 'Burgundy', hex: '#6E1D2E' },
  { name: 'Slate', hex: '#5C6B7A' },
  { name: 'Coral', hex: '#D4725A' },
  { name: 'Plum', hex: '#4A1942' },
  { name: 'Mint', hex: '#A8C5B8' },
  { name: 'Camel', hex: '#C4956A' },
  { name: 'Onyx', hex: '#1A1412' },
];

const OUTFIT_DB = [
  {
    id: 1, emoji: '👘', bg: 'linear-gradient(135deg,#e8d5c4,#c9a08a)',
    name: 'Ivory Silk Saree', occasion: 'Wedding',
    desc: 'Ivory georgette draped elegantly with gold zari border. Timeless and ethereal.',
    pairing: 'Gold jhumkas, strappy heels, embroidered clutch',
    colorTip: 'Layer warm tones — champagne, ivory, and gold create a luminous bridal palette.',
    colors: ['#F9F5EC','#C9A84C','#D4B896'],
    tags: ['Formal','Evening','Traditional'], season: ['winter','autumn'], timeOfDay: 'night',
    occasions: ['wedding','formal'],
    matchesAccessory: ['gold','earring','necklace','bangles','silver'],
    colorPref: ['warm','monochrome'],
  },
  {
    id: 2, emoji: '👗', bg: 'linear-gradient(135deg,#1b3a5c,#2d5986)',
    name: 'Navy Velvet Lehenga', occasion: 'Celebration',
    desc: 'Deep navy velvet lehenga with intricate golden embroidery. Regal winter wedding attire.',
    pairing: 'Gold chandelier earrings, statement necklace, heels',
    colorTip: 'Navy and gold is a timeless pairing — add cream dupatta to soften.',
    colors: ['#1B3A5C','#C9A84C','#F9F5EC'],
    tags: ['Glamorous','Winter','Festive'], season: ['winter'], timeOfDay: 'night',
    occasions: ['wedding','party','festival'],
    matchesAccessory: ['gold','earring','necklace'],
    colorPref: ['contrasting','bold'],
  },
  {
    id: 3, emoji: '✨', bg: 'linear-gradient(135deg,#6E1D2E,#9E3355)',
    name: 'Burgundy Anarkali', occasion: 'Festival',
    desc: 'Floor-length anarkali in deep burgundy with mirror work. Perfect for festive evenings.',
    pairing: 'Oxidised silver jewellery, kolhapuri sandals',
    colorTip: 'Silver on burgundy creates a stunning contrast. Avoid gold — it muddles the richness.',
    colors: ['#6E1D2E','#8C9BAA','#F9F5EC'],
    tags: ['Festive','Ethnic','Evening'], season: ['winter','autumn'], timeOfDay: 'night',
    occasions: ['festival','party'],
    matchesAccessory: ['silver','necklace','earring'],
    colorPref: ['bold','contrasting'],
  },
  {
    id: 4, emoji: '🌸', bg: 'linear-gradient(135deg,#E8C4B8,#d4a090)',
    name: 'Blush Linen Co-ord', occasion: 'Casual',
    desc: 'Breezy blush linen matching set. Effortlessly chic for warm afternoons.',
    pairing: 'Nude mules, minimalist gold chain, canvas tote',
    colorTip: 'Stay in soft pastels — blush, ivory, and warm whites feel harmonious and fresh.',
    colors: ['#E8C4B8','#F9F5EC','#C9A84C'],
    tags: ['Casual','Day','Summer'], season: ['summer','spring'], timeOfDay: 'day',
    occasions: ['casual','outing'],
    matchesAccessory: ['gold','bracelet','chain','necklace'],
    colorPref: ['pastel','monochrome','warm'],
  },
  {
    id: 5, emoji: '🌿', bg: 'linear-gradient(135deg,#7A8C6E,#9aad8a)',
    name: 'Sage Shirt Dress', occasion: 'Casual',
    desc: 'A crisp sage shirt-dress with a belted waist. Versatile from brunch to gallery visits.',
    pairing: 'Tan leather belt, white sneakers or block heels',
    colorTip: 'Earth tones pair beautifully — terracotta, ivory, and sage together evoke nature.',
    colors: ['#7A8C6E','#C4956A','#F9F5EC'],
    tags: ['Casual','Day','Earthy'], season: ['spring','summer'], timeOfDay: 'day',
    occasions: ['casual','brunch'],
    matchesAccessory: ['leather','bracelet','earring'],
    colorPref: ['earthy','warm','contrasting'],
  },
  {
    id: 6, emoji: '🖤', bg: 'linear-gradient(135deg,#1A1412,#2c2420)',
    name: 'Black Crepe Blazer Set', occasion: 'Formal',
    desc: 'Tailored black crepe blazer with wide-leg trousers. Corporate power dressing done right.',
    pairing: 'Pearl studs, classic heels, structured handbag',
    colorTip: 'Black is your canvas. A single metallic accessory — gold or silver — elevates the look instantly.',
    colors: ['#1A1412','#C9A84C','#F9F5EC'],
    tags: ['Formal','Office','Minimal'], season: ['all'], timeOfDay: 'day',
    occasions: ['formal','office','interview'],
    matchesAccessory: ['pearl','gold','silver','necklace','earring'],
    colorPref: ['monochrome','bold','contrasting'],
  },
  {
    id: 7, emoji: '🌙', bg: 'linear-gradient(135deg,#4A1942,#7B2D74)',
    name: 'Plum Sequin Gown', occasion: 'Party',
    desc: 'Floor-length plum sequin gown. A head-to-toe statement for milestone evenings.',
    pairing: 'Diamond drop earrings, metallic clutch, strappy sandals',
    colorTip: 'Plum and silver is electric. Avoid prints — let the sequins do the talking.',
    colors: ['#4A1942','#C0C0C0','#C9A84C'],
    tags: ['Glam','Night','Party'], season: ['winter'], timeOfDay: 'night',
    occasions: ['party','gala','birthday'],
    matchesAccessory: ['diamond','silver','earring','bracelet'],
    colorPref: ['bold','contrasting'],
  },
  {
    id: 8, emoji: '☀️', bg: 'linear-gradient(135deg,#F7D794,#e5b84e)',
    name: 'Mustard Wrap Dress', occasion: 'Summer',
    desc: 'Flowy mustard wrap dress in lightweight fabric. Ideal for outdoor summer events.',
    pairing: 'Espadrilles, wicker bag, minimal gold hoops',
    colorTip: 'Mustard loves white and terracotta. Avoid black — it drags down the warmth.',
    colors: ['#C9A84C','#C4956A','#F9F5EC'],
    tags: ['Summer','Day','Flowy'], season: ['summer'], timeOfDay: 'day',
    occasions: ['casual','outdoor','festival'],
    matchesAccessory: ['gold','hoop','earring'],
    colorPref: ['warm','pastel'],
  },
];

const FESTIVALS = {
  Diwali: { icon: '🪔', tip: 'Opt for vibrant silks — marigold, deep red, or emerald. Mirror work and gold accents catch the diya light beautifully.' },
  Christmas: { icon: '🎄', tip: 'Classic festive palette: deep red, forest green, or midnight blue. Velvet and metallic accents are perfect for the season.' },
  Eid: { icon: '🌙', tip: 'Pastel sherwanis and anarkalis in mint, lilac, and peach are traditionally elegant. Rich embroidery and pearls complete the look.' },
  Holi: { icon: '🎨', tip: 'Wear whites or light pastels you don\'t mind getting colorful! Comfortable kurtas and cotton fabrics work best.' },
  Birthday: { icon: '🎂', tip: 'Make it personal — your birthstone color or a shade that lights you up. Sequins and bold prints say \'celebrate me\'.' },
};

// ── AI suggestion engine ──────────────────────────────────────────────
async function getAISuggestions(params) {
  const prompt = `You are a fashion stylist AI for the app "Get Ready With Me".

Given:
- Weather/Season: ${params.season || 'any'}
- Occasion: ${params.occasion || 'any'}
- Time of day: ${params.timeOfDay || 'any'}
- Festival/Event: ${params.festival || 'none'}
- Color preference: ${params.colorPref || 'any'}
- User's item: ${params.accessory || 'none specified'}

Suggest 2 outfit ideas. Respond ONLY with valid JSON (no markdown, no explanation):
{
  "suggestions": [
    {
      "name": "outfit name",
      "desc": "2 sentence description",
      "pairing": "accessories and shoes to pair",
      "colorTip": "color styling tip",
      "tags": ["tag1","tag2","tag3"],
      "emoji": "single relevant emoji"
    }
  ],
  "overallTip": "one sentence general styling advice for these conditions"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content?.map(b => b.text || '').join('');
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [season, setSeason] = useState('');
  const [occasion, setOccasion] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [festival, setFestival] = useState('');
  const [colorPref, setColorPref] = useState('');
  const [colorSwatch, setColorSwatch] = useState('');
  const [accessory, setAccessory] = useState('');
  const [results, setResults] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  const [aiTip, setAiTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [modal, setModal] = useState(null);
  const [isDayMode, setIsDayMode] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef(null);

  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);

  const handleSuggest = async () => {
    setLoading(true);
    setHasSearched(true);

    // Local filter
    let filtered = OUTFIT_DB.filter(o => {
      if (season && !o.season.includes(season) && !o.season.includes('all')) return false;
      if (occasion && !o.occasions.includes(occasion)) return false;
      if (timeOfDay && o.timeOfDay !== timeOfDay) return false;
      if (accessory) {
        const a = accessory.toLowerCase();
        if (!o.matchesAccessory.some(k => a.includes(k))) return false;
      }
      if (colorPref && !o.colorPref.includes(colorPref)) return false;
      return true;
    });

    if (!season && !occasion && !timeOfDay && !accessory) filtered = OUTFIT_DB.slice(0, 4);
    setResults(filtered);

    // AI suggestions
    try {
      const ai = await getAISuggestions({ season, occasion, timeOfDay, festival, colorPref, accessory });
      setAiResults(ai.suggestions || []);
      setAiTip(ai.overallTip || '');
    } catch {
      setAiResults([]);
      setAiTip('');
    }

    setLoading(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const allResults = [
    ...results,
    ...aiResults.map((r, i) => ({
      id: `ai-${i}`, emoji: r.emoji, bg: 'linear-gradient(135deg,#C4A882,#A0846A)',
      name: r.name, occasion: occasion || 'Curated',
      desc: r.desc, pairing: r.pairing, colorTip: r.colorTip,
      tags: r.tags, colors: [colorSwatch || '#C9A84C','#F9F5EC','#1A1412'],
      isAI: true,
    })),
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="logo">Get <span>Ready</span> With Me</div>
          <button
            className={`mode-toggle ${isDayMode ? 'day' : ''}`}
            onClick={() => setIsDayMode(d => !d)}
            title="Toggle day/night mode"
          />
        </header>

        {/* Hero */}
        <section className="hero">
          <p className="hero-label">Your personal styling companion</p>
          <h1 className="hero-title">Dress for the<br /><em>moment.</em></h1>
          <p className="hero-sub">Tell us where you're going, what you have, and we'll build the perfect look.</p>
        </section>

        {/* Main */}
        <main className="main">
          {/* Form Panel */}
          <div className="form-panel">
            <div className="panel-title">Style Filters</div>

            <div className="form-group">
              <label className="form-label">Season / Weather</label>
              <div className="chips">
                {['summer','winter','rainy','spring','autumn'].map(s => (
                  <button key={s} className={`chip ${season===s?'selected':''}`} onClick={() => setSeason(s===season?'':s)}>
                    {{'summer':'☀️ Summer','winter':'❄️ Winter','rainy':'🌧 Rainy','spring':'🌸 Spring','autumn':'🍂 Autumn'}[s]}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Occasion</label>
              <div className="chips">
                {['casual','formal','party','wedding','festival','office'].map(o => (
                  <button key={o} className={`chip ${occasion===o?'selected':''}`} onClick={() => setOccasion(o===occasion?'':o)}>
                    {o.charAt(0).toUpperCase()+o.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Time of Day</label>
              <div className="chips">
                {['day','night'].map(t => (
                  <button key={t} className={`chip ${timeOfDay===t?'selected':''}`} onClick={() => setTimeOfDay(t===timeOfDay?'':t)}>
                    {t==='day'?'☀️ Day':'🌙 Night'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Festival / Event</label>
              <div className="chips">
                {Object.keys(FESTIVALS).map(f => (
                  <button key={f} className={`chip ${festival===f?'selected':''}`} onClick={() => setFestival(f===festival?'':f)}>
                    {FESTIVALS[f].icon} {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Color preference</label>
              <div className="chips" style={{marginBottom:'0.75rem'}}>
                {['warm','cool','pastel','bold','monochrome','contrasting','earthy'].map(c => (
                  <button key={c} className={`chip ${colorPref===c?'selected':''}`} onClick={() => setColorPref(c===colorPref?'':c)}>
                    {c.charAt(0).toUpperCase()+c.slice(1)}
                  </button>
                ))}
              </div>
              <div className="palette">
                {SWATCHES.map(s => (
                  <div
                    key={s.hex}
                    className={`swatch ${colorSwatch===s.hex?'selected':''}`}
                    style={{background:s.hex}}
                    title={s.name}
                    onClick={() => setColorSwatch(s.hex===colorSwatch?'':s.hex)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">I have this piece…</label>
              <input
                className="text-input"
                value={accessory}
                onChange={e => setAccessory(e.target.value)}
                placeholder="e.g. black jeans, gold earrings, silk blouse…"
              />
            </div>

            <button
              className={`cta-btn ${loading?'loading':''}`}
              onClick={handleSuggest}
              disabled={loading}
            >
              {loading ? 'Finding your look…' : 'Suggest My Outfit ✦'}
            </button>
          </div>

          {/* Results */}
          <div className="results-area" ref={resultsRef}>
            {festival && hasSearched && (
              <div className="festival-banner">
                <span className="festival-icon">{FESTIVALS[festival]?.icon}</span>
                <div className="festival-text">
                  <div className="festival-title">{festival} Styling Tip</div>
                  <div className="festival-sub">{FESTIVALS[festival]?.tip}</div>
                </div>
              </div>
            )}

            {aiTip && (
              <div className="color-tip" style={{marginBottom:'1.25rem'}}>
                <strong>✦ Stylist's Note</strong>
                {aiTip}
              </div>
            )}

            {!hasSearched && (
              <div className="empty-state">
                <span className="empty-icon">👗</span>
                <div className="empty-title">Your wardrobe awaits</div>
                <div className="empty-sub">Set your filters and let us curate the perfect look for you.</div>
              </div>
            )}

            {hasSearched && !loading && allResults.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <div className="empty-title">No exact matches</div>
                <div className="empty-sub">Try removing a filter or broadening your selection.</div>
              </div>
            )}

            {(hasSearched || loading) && (
              <>
                {!loading && allResults.length > 0 && (
                  <div className="results-header">
                    <div className="results-title">Your looks</div>
                    <div className="results-count">{allResults.length} suggestion{allResults.length!==1?'s':''}</div>
                    {timeOfDay && (
                      <span className={`time-pill ${timeOfDay}`}>
                        {timeOfDay==='day'?'☀️ Day':'🌙 Night'} looks
                      </span>
                    )}
                  </div>
                )}
                <div className="cards-grid">
                  {loading
                    ? [1,2,3,4].map(i => (
                        <div key={i} className="skeleton-card">
                          <div className="skeleton-vis"/>
                          <div className="skeleton-body">
                            <div className="skeleton-line" style={{width:'60%'}}/>
                            <div className="skeleton-line" style={{width:'90%'}}/>
                            <div className="skeleton-line" style={{width:'75%'}}/>
                          </div>
                        </div>
                      ))
                    : allResults.map((outfit, idx) => (
                        <div
                          key={outfit.id}
                          className="outfit-card"
                          style={{animationDelay:`${idx*0.08}s`, position:'relative'}}
                        >
                          {saved.includes(outfit.id) && (
                            <div className="saved-badge">♥</div>
                          )}
                          <div className="card-visual" style={{background:outfit.bg}}>
                            {outfit.emoji}
                            {outfit.isAI && (
                              <span style={{position:'absolute',top:10,left:10,background:'rgba(0,0,0,0.3)',color:'#fff',fontSize:'0.65rem',padding:'2px 8px',borderRadius:10,letterSpacing:'0.08em'}}>✦ AI Pick</span>
                            )}
                          </div>
                          <div className="card-body">
                            <div className="card-occasion">{outfit.occasion}</div>
                            <div className="card-name">{outfit.name}</div>
                            <div className="card-desc">{outfit.desc}</div>
                            <div className="card-tags">
                              {outfit.tags?.map(t=><span key={t} className="card-tag">{t}</span>)}
                            </div>
                            <div className="card-actions">
                              <button
                                className={`card-btn ${saved.includes(outfit.id)?'saved':''}`}
                                onClick={() => toggleSave(outfit.id)}
                              >
                                {saved.includes(outfit.id)?'♥ Saved':'♡ Save'}
                              </button>
                              <button
                                className="card-btn primary"
                                onClick={() => setModal(outfit)}
                              >
                                View Look →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  }
                </div>
              </>
            )}
          </div>
        </main>

        {/* Modal */}
        {modal && (
          <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setModal(null)}}>
            <div className="modal">
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              <div className="modal-emoji">{modal.emoji}</div>
              <div className="modal-title">{modal.name}</div>
              <div className="modal-body">{modal.desc}</div>
              <div className="modal-section">
                <div className="modal-section-label">Pair with</div>
                <div className="modal-section-text">{modal.pairing}</div>
              </div>
              <div className="modal-section">
                <div className="modal-section-label">Color palette</div>
                <div className="modal-color-strip">
                  {modal.colors?.map((c,i)=>(
                    <div key={i} className="modal-swatch" style={{background:c}} title={c}/>
                  ))}
                </div>
              </div>
              <div className="color-tip">
                <strong>Color tip</strong>
                {modal.colorTip}
              </div>
              <div className="share-row">
                <button className="share-btn" onClick={() => { toggleSave(modal.id); }}>
                  {saved.includes(modal.id)?'♥ Saved':'♡ Save Look'}
                </button>
                <button
                  className="share-btn"
                  onClick={() => navigator.clipboard?.writeText(`Check out this outfit from Get Ready With Me: ${modal.name}! ${modal.desc}`)}
                >
                  📋 Copy
                </button>
                <button
                  className="share-btn primary"
                  onClick={() => {
                    const text = encodeURIComponent(`✨ Outfit Idea: ${modal.name}\n${modal.desc}\nPair with: ${modal.pairing}`);
                    window.open(`https://wa.me/?text=${text}`,'_blank');
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
