const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'buildCatalog.cjs');
let content = fs.readFileSync(catalogPath, 'utf8');

// Category mappings
const categoryImageMap = {
  "'cat-slabs'": "'/images/products/nutty-nutella-crown-brownie.jpg'",
  "'cat-tubs'": "'/images/products/kinder-kitkat-nutella-brownie-tub.jpg'",
  "'cat-single-pieces'": "'/images/products/nutella-brownie-tub.jpg'",
  "'cat-dream-cakes'": "'/images/products/rose-milk-dream-cake.jpg'",
  "'cat-courier-slabs'": "'/images/products/biscoff-caramel-brownie-slab.jpg'",
  "'cat-brownies'": "'/images/products/biscoff-caramel-brownie-slab.jpg'",
};

// Product mappings
const productImageMap = {
  // Slabs
  'prod-slab-nutella-brownie': [
    '/images/products/nutella-brownie-tub.jpg',
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-slab-biscoff-brownie': [
    '/images/products/biscoff-caramel-brownie-slab.jpg',
    '/images/products/biscoff-cheesecake-tub.jpg'
  ],
  'prod-slab-assorted-brownie': [
    '/images/products/biscoff-caramel-brownie-slab.jpg',
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-slab-nutty-nutella-crown': [
    '/images/products/nutty-nutella-crown-brownie.jpg',
    '/images/products/nutella-brownie-tub.jpg'
  ],
  'prod-slab-milk-choco-loaded-brownie': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-slab-milk-choco-loaded-blondie': [
    '/images/products/biscoff-caramel-brownie-slab.jpg',
    '/images/products/cookie-tin-500g.jpg'
  ],
  'prod-slab-brownie-tower': [
    '/images/products/nutty-nutella-crown-brownie.jpg',
    '/images/products/kinder-kitkat-nutella-brownie-tub.jpg'
  ],
  'prod-slab-red-velvet-blondie': [
    '/images/products/strawberry-cheesecake-tub.jpg',
    '/images/products/rose-milk-dream-cake.jpg'
  ],
  'prod-slab-rosemilk-blondie': [
    '/images/products/rose-milk-dream-cake.jpg',
    '/images/products/strawberry-cheesecake-tub.jpg'
  ],

  // Tubs
  'prod-tub-triple-choco': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-tub-dunky-brownie': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/choco-chips-brownie-tub.jpg'
  ],
  'prod-tub-white-choco-dunky': [
    '/images/products/white-chocolate-dunky-brownie-tub.jpg',
    '/images/products/white-chocolate-dream-cake.jpg'
  ],
  'prod-tub-nutella-brownie': [
    '/images/products/nutella-brownie-tub.jpg',
    '/images/products/kinder-kitkat-nutella-brownie-tub.jpg'
  ],
  'prod-tub-kinder-kitkat-nutella': [
    '/images/products/kinder-kitkat-nutella-brownie-tub.jpg',
    '/images/products/nutella-brownie-tub.jpg'
  ],
  'prod-tub-matilda': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/choco-chips-brownie-tub.jpg'
  ],
  'prod-tub-double-chocolate': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-tub-brownie-bites': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/choco-chips-brownie-tub.jpg'
  ],
  'prod-tub-mud-cookie': [
    '/images/products/cookie-tin-500g.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-tub-feuilletine-crunch': [
    '/images/products/pistachio-cheesecake-tub.jpg',
    '/images/products/kinder-kitkat-nutella-brownie-tub.jpg'
  ],
  'prod-tub-hot-chocolate': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-tub-choco-chips': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-tub-fudge-brownie-ice-cream': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/white-chocolate-dunky-brownie-tub.jpg'
  ],
  'prod-tub-cheesecake-assorted': [
    '/images/products/biscoff-cheesecake-tub.jpg',
    '/images/products/strawberry-cheesecake-tub.jpg',
    '/images/products/blueberry-cheesecake-tub.jpg',
    '/images/products/nutella-cheesecake-tub.jpg',
    '/images/products/pistachio-cheesecake-tub.jpg'
  ],

  // Single Pieces
  'prod-single-classic-fudge': [
    '/images/products/nutella-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-single-belgian-chocolate': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/choco-chips-brownie-tub.jpg'
  ],
  'prod-single-nutella-brownie': [
    '/images/products/nutella-brownie-tub.jpg',
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-single-biscoff-brownie': [
    '/images/products/biscoff-cheesecake-tub.jpg',
    '/images/products/biscoff-caramel-brownie-slab.jpg'
  ],
  'prod-single-pistachio-kunafa-brownie': [
    '/images/products/pistachio-cheesecake-tub.jpg'
  ],
  'prod-single-caramel-brownie': [
    '/images/products/biscoff-caramel-brownie-slab.jpg'
  ],
  'prod-single-death-by-chocolate': [
    '/images/products/choco-chips-brownie-tub.jpg',
    '/images/products/dunky-brownie-tub.jpg'
  ],
  'prod-single-nuts-loaded-brownie': [
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-single-triple-chocolate': [
    '/images/products/choco-chips-brownie-tub.jpg'
  ],
  'prod-single-lava-brownie': [
    '/images/products/dunky-brownie-tub.jpg',
    '/images/products/choco-chips-brownie-tub.jpg'
  ],

  // Dream Cakes & Confections
  'prod-dream-cake-classic': [
    '/images/products/rose-milk-dream-cake.jpg',
    '/images/products/white-chocolate-dream-cake.jpg'
  ],
  'prod-dream-cake-white-choco': [
    '/images/products/white-chocolate-dream-cake.jpg',
    '/images/products/rose-milk-dream-cake.jpg'
  ],
  'prod-dream-cake-nutella-brownie': [
    '/images/products/nutella-brownie-tub.jpg',
    '/images/products/white-chocolate-dream-cake.jpg'
  ],
  'prod-dream-cake-pistachio-kunafa': [
    '/images/products/pistachio-cheesecake-tub.jpg',
    '/images/products/rose-milk-dream-cake.jpg'
  ],
  'prod-dream-cake-rose-milk': [
    '/images/products/rose-milk-dream-cake.jpg',
    '/images/products/strawberry-cheesecake-tub.jpg'
  ],
  'prod-tin-cookie-500g': [
    '/images/products/cookie-tin-500g.jpg'
  ],
  'prod-burnt-basque-cheesecake-250g': [
    '/images/products/nutella-cheesecake-tub.jpg',
    '/images/products/biscoff-cheesecake-tub.jpg'
  ],

  // Courier Brownie Slabs
  'prod-courier-brownie-slab': [
    '/images/products/biscoff-caramel-brownie-slab.jpg',
    '/images/products/nutty-nutella-crown-brownie.jpg'
  ],
  'prod-triple-ganache-brownie-slab': [
    '/images/products/nutty-nutella-crown-brownie.jpg',
    '/images/products/biscoff-caramel-brownie-slab.jpg'
  ]
};

// Replace category images
for (const [catId, imgUrl] of Object.entries(categoryImageMap)) {
  const catRegex = new RegExp(`(id:\\s*${catId}[\\s\\S]*?image:\\s*)'[^']+'`, 'm');
  if (catRegex.test(content)) {
    content = content.replace(catRegex, `$1${imgUrl}`);
    console.log(`Updated category ${catId}`);
  }
}

// Replace product images
for (const [prodId, imgArr] of Object.entries(productImageMap)) {
  const prodRegex = new RegExp(`(id:\\s*'${prodId}'[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`, 'm');
  const formattedImages = '\n' + imgArr.map(url => `      '${url}',`).join('\n') + '\n    ';
  if (prodRegex.test(content)) {
    content = content.replace(prodRegex, `$1${formattedImages}$2`);
    console.log(`Updated product ${prodId}`);
  } else {
    console.warn(`Product ${prodId} NOT found in catalog`);
  }
}

fs.writeFileSync(catalogPath, content, 'utf8');
console.log('Finished updating buildCatalog.cjs');
