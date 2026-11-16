import { Category, Product, DeliveryArea, TimeSlot, SiteSettings } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-slabs",
    "name": "Brownie & Blondie Slabs",
    "slug": "brownie-blondie-slabs",
    "description": "Freshly baked whole-slab brownies, loaded blondies & celebration towers available in 250g, 500g, 1kg & 2kg sizes.",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "display_order": 1,
    "is_active": true
  },
  {
    "id": "cat-tubs",
    "name": "Dessert Tubs",
    "slug": "dessert-tubs",
    "description": "Decadent dessert tubs layered with rich fudge brownie, Nutella, Matilda chocolate, and irresistible crunch textures.",
    "image": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    "display_order": 2,
    "is_active": true
  },
  {
    "id": "cat-single-pieces",
    "name": "Single Pieces & Brownies",
    "slug": "single-pieces",
    "description": "Grab an individual artisan brownie square, molten lava piece, or savory Korean garlic cream cheese bun.",
    "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    "display_order": 3,
    "is_active": true
  },
  {
    "id": "cat-dream-cakes",
    "name": "Dream Cakes & Confections",
    "slug": "dream-cakes",
    "description": "Viral 5-in-1 chocolate Dream Cakes, Basque cheesecakes, Italian Tiramisu, and artisanal Cookie Tins.",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    "display_order": 4,
    "is_active": true
  },
  {
    "id": "cat-courier-slabs",
    "name": "Brownie Slabs (Courier Orders)",
    "slug": "brownie-slabs-courier",
    "description": "Thick, chocolate-filled fudgy brownie slabs securely packaged for courier delivery across Tamil Nadu & India.",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    "display_order": 5,
    "is_active": true
  },
  {
    "id": "cat-celebration-cakes",
    "name": "Celebration Cakes",
    "slug": "celebration-cakes",
    "description": "Multi-layered artisanal cakes baked to order for birthdays, anniversaries & milestones.",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    "display_order": 6,
    "is_active": true
  },
  {
    "id": "cat-bento-cakes",
    "name": "Bento & Petite Cakes",
    "slug": "bento-petite-cakes",
    "description": "Korean-style 4-inch mini cakes with delicate pastel piping, ideal for 1-2 sweet cravings.",
    "image": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    "display_order": 7,
    "is_active": true
  },
  {
    "id": "cat-brownies",
    "name": "Signature Brownies",
    "slug": "signature-brownies",
    "description": "Ultra-fudgy, crackly-top brownies handcrafted with 70% dark Belgian chocolate.",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "display_order": 8,
    "is_active": true
  },
  {
    "id": "cat-cupcakes",
    "name": "Artisanal Cupcakes",
    "slug": "artisanal-cupcakes",
    "description": "Delicately frosted gourmet cupcakes in boxes of 4, 6 and 12 with gold dust accents.",
    "image": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    "display_order": 9,
    "is_active": true
  },
  {
    "id": "cat-custom-cakes",
    "name": "Custom Bespoke Cakes",
    "slug": "custom-bespoke-cakes",
    "description": "Tailored designer creations, customized themes, fondant accents and fresh flower cascades.",
    "image": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
    "display_order": 10,
    "is_active": true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-slab-nutella-brownie",
    "name": "Nutella Brownie Slab",
    "slug": "nutella-brownie-slab",
    "description": "Rich, intensely fudgy dark chocolate brownie slab covered in a thick layer of creamy original Nutella hazelnut spread and cocoa nibs.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 350,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-slab-nut-250g",
        "name": "250g Slab (Serves 2-3)",
        "weight_label": "250g Slab",
        "price": 350,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-nut-500g",
        "name": "500g Slab (Serves 4-6)",
        "weight_label": "500g Slab",
        "price": 600,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-nut-1kg",
        "name": "1 Kg Grand Slab (Serves 10-12)",
        "weight_label": "1 Kg Grand Slab",
        "price": 1200,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "70% Belgian Chocolate",
      "Original Italian Nutella",
      "Pure Butter",
      "Flour",
      "Cocoa Powder"
    ],
    "storage_instructions": "Ambient safe for 7 days. Can be courier shipped or delivered locally across Coimbatore."
  },
  {
    "id": "prod-slab-biscoff-brownie",
    "name": "Biscoff Brownie Slab",
    "slug": "biscoff-brownie-slab",
    "description": "Fudgy chocolate brownie slab generously topped and swirled with spiced Lotus Biscoff speculoos spread and biscuit crumbles.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 350,
    "images": [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-slab-bisc-250g",
        "name": "250g Slab (Serves 2-3)",
        "weight_label": "250g Slab",
        "price": 350,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-bisc-500g",
        "name": "500g Slab (Serves 4-6)",
        "weight_label": "500g Slab",
        "price": 600,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-bisc-1kg",
        "name": "1 Kg Grand Slab (Serves 10-12)",
        "weight_label": "1 Kg Grand Slab",
        "price": 1200,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Lotus Biscoff Spread",
      "Lotus Biscuits",
      "Dark Chocolate",
      "Butter",
      "Cocoa"
    ],
    "storage_instructions": "Ambient safe for 7 days. Stays moist and chewy at room temperature."
  },
  {
    "id": "prod-slab-assorted-brownie",
    "name": "Assorted Brownie Slab",
    "slug": "assorted-brownie-slab",
    "description": "The best of all worlds in one single slab: split sections of Nutella, Lotus Biscoff, Belgian dark fudge, and roasted crunchy nuts.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 375,
    "images": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-slab-asst-250g",
        "name": "250g Assorted Slab (Serves 2-3)",
        "weight_label": "250g Assorted Slab",
        "price": 375,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-asst-500g",
        "name": "500g Assorted Slab (Serves 4-6)",
        "weight_label": "500g Assorted Slab",
        "price": 700,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-asst-1kg",
        "name": "1 Kg Grand Assorted Slab (Serves 10-12)",
        "weight_label": "1 Kg Grand Assorted Slab",
        "price": 1350,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Nutella",
      "Biscoff",
      "Belgian Chocolate",
      "Roasted Hazelnuts & Almonds",
      "Cocoa Butter"
    ],
    "storage_instructions": "Keep in cool dry place. 7 days freshness."
  },
  {
    "id": "prod-slab-nutty-nutella-crown",
    "name": "Nutty Nutella Crown Brownie Slab",
    "slug": "nutty-nutella-crown-brownie-slab",
    "description": "Thick Belgian fudge brownie slab crowned with toasted crunchy cashews, roasted hazelnuts, and a lavish Nutella waterfall finish.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 350,
    "images": [
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-slab-crown-250g",
        "name": "250g Crown Slab",
        "weight_label": "250g Crown Slab",
        "price": 350,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-crown-500g",
        "name": "500g Crown Slab",
        "weight_label": "500g Crown Slab",
        "price": 600,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-crown-1kg",
        "name": "1 Kg Grand Crown Slab",
        "weight_label": "1 Kg Grand Crown Slab",
        "price": 1000,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Nutella",
      "Toasted Hazelnuts",
      "California Almonds",
      "Dark Chocolate Fudge"
    ],
    "storage_instructions": "Ambient courier safe. Stays fresh for 7 days."
  },
  {
    "id": "prod-slab-milk-choco-loaded-brownie",
    "name": "Milk Chocolate Loaded Brownie Slab",
    "slug": "milk-chocolate-loaded-brownie-slab",
    "description": "Premium milk chocolate lovers delight: ultra-rich brownie loaded inside and topped outside with creamy melted milk chocolate ganache and chocolate chunks.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 450,
    "images": [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-slab-mcb-250g",
        "name": "250g Loaded Slab",
        "weight_label": "250g Slab",
        "price": 450,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-mcb-500g",
        "name": "500g Loaded Slab",
        "weight_label": "500g Slab",
        "price": 900,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-mcb-1kg",
        "name": "1 Kg Grand Loaded Slab",
        "weight_label": "1 Kg Grand Slab",
        "price": 1800,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Belgian Milk Chocolate",
      "Cream",
      "Cocoa Butter",
      "Pure Butter",
      "Vanilla"
    ],
    "storage_instructions": "Store at room temperature or chill slightly for fudge texture."
  },
  {
    "id": "prod-slab-milk-choco-loaded-blondie",
    "name": "Milk Chocolate Loaded Blondie Slab",
    "slug": "milk-chocolate-loaded-blondie-slab",
    "description": "Golden buttery brown-sugar vanilla blondie slab packed with caramelized edges and flooded with smooth creamy milk chocolate ganache.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 450,
    "images": [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-slab-mcbl-250g",
        "name": "250g Blondie Slab",
        "weight_label": "250g Blondie Slab",
        "price": 450,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-mcbl-500g",
        "name": "500g Blondie Slab",
        "weight_label": "500g Blondie Slab",
        "price": 900,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-mcbl-1kg",
        "name": "1 Kg Grand Blondie Slab",
        "weight_label": "1 Kg Grand Blondie Slab",
        "price": 1800,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Golden Brown Sugar",
      "French Butter",
      "Milk Chocolate Chips",
      "Madagascar Vanilla"
    ],
    "storage_instructions": "Ambient safe for 7 days."
  },
  {
    "id": "prod-slab-brownie-tower",
    "name": "Celebration Brownie Tower",
    "slug": "celebration-brownie-tower",
    "description": "A showstopping stacked pyramid of fudgy Belgian brownies drizzled with dark chocolate ganache, Nutella, and adorned with gold dust and edible pearls.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 1200,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 12,
    "min_order_hours": 8,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-slab-tower-1kg",
        "name": "1 Kg Celebration Tower (Serves 10-12)",
        "weight_label": "1 Kg Tower",
        "price": 1200,
        "serves_label": "Serves 10-12",
        "is_default": true
      },
      {
        "id": "var-slab-tower-2kg",
        "name": "2 Kg Grand Party Tower (Serves 20-25)",
        "weight_label": "2 Kg Tower",
        "price": 2000,
        "serves_label": "Serves 20-25"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 50
    },
    "ingredients": [
      "70% Callebaut Dark Chocolate",
      "Nutella Drip",
      "Butter",
      "Organic Cocoa",
      "Edible Gold Leaf"
    ],
    "storage_instructions": "Ready to display and celebrate. Keep at cool room temperature."
  },
  {
    "id": "prod-slab-red-velvet-blondie",
    "name": "Red Velvet Blondie Slab",
    "slug": "red-velvet-blondie-slab",
    "description": "Vibrant crimson velvet blondie slab layered with white chocolate chunks and tangy cream cheese swirl.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 300,
    "images": [
      "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-slab-rv-250g",
        "name": "250g Slab",
        "weight_label": "250g Slab",
        "price": 300,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-rv-500g",
        "name": "500g Slab",
        "weight_label": "500g Slab",
        "price": 600,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-rv-1kg",
        "name": "1 Kg Grand Slab",
        "weight_label": "1 Kg Grand Slab",
        "price": 1200,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Cocoa",
      "Cream Cheese",
      "White Chocolate",
      "Butter",
      "Vanilla"
    ],
    "storage_instructions": "Keep chilled for cream cheese firmness."
  },
  {
    "id": "prod-slab-rosemilk-blondie",
    "name": "Rosemilk Blondie Slab",
    "slug": "rosemilk-blondie-slab",
    "description": "Coimbatore artisanal specialty: fragrant rose milk infused blondie base swirled with pistachio crumble and white chocolate drizzle.",
    "category_id": "cat-slabs",
    "category_name": "Brownie & Blondie Slabs",
    "base_price": 300,
    "images": [
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-slab-rm-250g",
        "name": "250g Slab",
        "weight_label": "250g Slab",
        "price": 300,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-slab-rm-500g",
        "name": "500g Slab",
        "weight_label": "500g Slab",
        "price": 600,
        "serves_label": "Serves 4-6"
      },
      {
        "id": "var-slab-rm-1kg",
        "name": "1 Kg Grand Slab",
        "weight_label": "1 Kg Grand Slab",
        "price": 1200,
        "serves_label": "Serves 10-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Authentic Rose Milk Extract",
      "Iranian Pistachios",
      "White Chocolate Ganache",
      "Butter"
    ],
    "storage_instructions": "Stays fresh 7 days at room temperature."
  },
  {
    "id": "prod-tub-triple-choco",
    "name": "Triple Chocolate Brownie Tub",
    "slug": "triple-chocolate-brownie-tub",
    "description": "Layers of moist fudge brownie cubes soaked in three decadent chocolate ganaches: dark, milk, and white Belgian chocolate with crispy chocolate pearls.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-tcb-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Dark Chocolate",
      "Milk Chocolate",
      "White Chocolate",
      "Fudge Brownie",
      "Cream"
    ],
    "storage_instructions": "Refrigerate upon arrival. Best enjoyed slightly chilled or microwaved for 10 seconds."
  },
  {
    "id": "prod-tub-dunky-brownie",
    "name": "Dunky Brownie Tub",
    "slug": "dunky-brownie-tub",
    "description": "Chewy bite-sized brownie pieces submerged in warm velvety dipping chocolate fudge sauce. Made for dunking and spooning!",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-db-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Dunking Fudge Sauce",
      "Chocolate Brownie Cubes",
      "Cocoa",
      "Butter"
    ],
    "storage_instructions": "Keep chilled. Warm gently before eating."
  },
  {
    "id": "prod-tub-white-choco-dunky",
    "name": "White Chocolate Dunky Brownie Tub",
    "slug": "white-chocolate-dunky-brownie-tub",
    "description": "Dark fudgy brownie chunks drenched in silky sweet Belgian white chocolate sauce and topped with shaved ivory chocolate.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-wcd-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Belgian White Chocolate Sauce",
      "Fudge Brownie Pieces",
      "Ivory Curls"
    ],
    "storage_instructions": "Refrigerate. Serve chilled."
  },
  {
    "id": "prod-tub-nutella-brownie",
    "name": "Nutella Brownie Tub",
    "slug": "nutella-brownie-tub",
    "description": "Generous layers of fudgy chocolate brownie drowned in pure Italian Nutella hazelnut spread and crunchy roasted hazelnuts.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 200,
    "images": [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-tub-nb-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 200,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Italian Nutella",
      "Dark Fudgy Brownie",
      "Roasted Hazelnuts",
      "Cocoa"
    ],
    "storage_instructions": "Room temperature or lightly chilled."
  },
  {
    "id": "prod-tub-kinder-kitkat-nutella",
    "name": "Kinder Kitkat Nutella Brownie Tub",
    "slug": "kinder-kitkat-nutella-brownie-tub",
    "description": "The supreme chocolate indulgence: brownie cubes, creamy Nutella pool, crushed KitKat wafer crunch, and Kinder chocolate sticks.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-tub-kkn-std",
        "name": "Deluxe Dessert Tub",
        "weight_label": "Deluxe Tub",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Nutella",
      "KitKat Wafers",
      "Kinder Chocolate",
      "Fudge Brownie",
      "Milk Chocolate"
    ],
    "storage_instructions": "Keep chilled for wafer crispiness."
  },
  {
    "id": "prod-tub-matilda",
    "name": "Matilda Chocolate Tub",
    "slug": "matilda-chocolate-tub",
    "description": "Inspired by the iconic chocolate movie cake: intensely rich dark chocolate fudge sponge drenched in warm glossy chocolate ganache in a grab-and-go tub.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-mat-std",
        "name": "Deluxe Dessert Tub",
        "weight_label": "Deluxe Tub",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "70% Callebaut Ganache",
      "Moist Chocolate Sponge",
      "Fudge Sauce",
      "Butter"
    ],
    "storage_instructions": "Warm 15 seconds in microwave for molten decadence!"
  },
  {
    "id": "prod-tub-double-chocolate",
    "name": "Double Chocolate Brownie Tub",
    "slug": "double-chocolate-brownie-tub",
    "description": "Double the chocolate rush: rich cocoa fudge brownie chunks with milk chocolate ganache and dark chocolate drip.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-dc-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Double Dark Chocolate",
      "Milk Ganache",
      "Cocoa Brownie"
    ],
    "storage_instructions": "Store refrigerated."
  },
  {
    "id": "prod-tub-brownie-bites",
    "name": "Brownie Bites Tub",
    "slug": "brownie-bites-tub",
    "description": "Bite-sized crackly-topped brownie nuggets dusted in pure Dutch cocoa and drizzled with chocolate sauce. Easy to share and snack!",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-bb-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Brownie Bites",
      "Cocoa Powder",
      "Chocolate Drizzle"
    ],
    "storage_instructions": "Keep sealed at room temperature."
  },
  {
    "id": "prod-tub-mud-cookie",
    "name": "Mud Cookie Tub",
    "slug": "mud-cookie-tub",
    "description": "Crumbled dark chocolate mud cookies layered with chocolate mousse pudding and glossy dark ganache.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-mc-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Chocolate Mud Cookies",
      "Chocolate Cream Pudding",
      "Dark Ganache"
    ],
    "storage_instructions": "Keep chilled."
  },
  {
    "id": "prod-tub-feuilletine-crunch",
    "name": "Feuilletine Crunch Cake Tub",
    "slug": "feuilletine-crunch-cake-tub",
    "description": "Crispy caramelized French crêpe dentelle feuilletine flakes folded with Belgian praline ganache and chocolate sponge cake.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-tub-fc-std",
        "name": "Deluxe Dessert Tub",
        "weight_label": "Deluxe Tub",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "French Feuilletine Flakes",
      "Hazelnut Praline",
      "Belgian Chocolate",
      "Sponge"
    ],
    "storage_instructions": "Keep chilled to preserve crunchiness."
  },
  {
    "id": "prod-tub-hot-chocolate",
    "name": "Hot Chocolate Brownie Tub",
    "slug": "hot-chocolate-brownie-tub",
    "description": "Warm comfort in a tub: dark chocolate brownie drenched in steaming hot chocolate fudge sauce with mini marshmallows on top.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 165,
    "images": [
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-hc-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 165,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Hot Cocoa Sauce",
      "Fudge Brownie",
      "Marshmallows",
      "Cinnamon dusting"
    ],
    "storage_instructions": "Heat in microwave for 15 seconds before enjoying."
  },
  {
    "id": "prod-tub-choco-chips",
    "name": "Choco Chips Brownie Tub",
    "slug": "choco-chips-brownie-tub",
    "description": "Chocoholic heaven: dense fudge brownie packed with semi-sweet chocolate chips and topped with crunchy chocolate shavings.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 180,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-cc-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 180,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Callebaut Choco Chips",
      "Dark Cocoa Brownie",
      "Chocolate Ganache"
    ],
    "storage_instructions": "Keep at room temperature or chilled."
  },
  {
    "id": "prod-tub-fudge-brownie-ice-cream",
    "name": "Fudge Brownie with Ice Cream Tub",
    "slug": "fudge-brownie-with-ice-cream-tub",
    "description": "The classic restaurant dessert in a tub: warm fudgy brownie base topped with chilled vanilla cream mousse and chocolate fudge syrup.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 160,
    "images": [
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tub-fbic-std",
        "name": "Standard Dessert Tub",
        "weight_label": "Single Tub",
        "price": 160,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Vanilla Bean Cream Mousse",
      "Warm Fudge Brownie",
      "Chocolate Sauce"
    ],
    "storage_instructions": "Keep frozen/chilled until ready to consume."
  },
  {
    "id": "prod-tub-cheesecake-assorted",
    "name": "Gourmet Cheesecake Tub",
    "slug": "gourmet-cheesecake-tub",
    "description": "Velvety New York style cheesecake set on a buttery graham biscuit base, topped with your choice of gourmet compote or spread.",
    "category_id": "cat-tubs",
    "category_name": "Dessert Tubs",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-cheese-biscoff",
        "name": "Lotus Biscoff Cheesecake Tub",
        "weight_label": "Biscoff Tub",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      },
      {
        "id": "var-cheese-blueberry",
        "name": "Blueberry Compote Cheesecake Tub",
        "weight_label": "Blueberry Tub",
        "price": 250,
        "serves_label": "Serves 1-2"
      },
      {
        "id": "var-cheese-strawberry",
        "name": "Fresh Strawberry Cheesecake Tub",
        "weight_label": "Strawberry Tub",
        "price": 250,
        "serves_label": "Serves 1-2"
      },
      {
        "id": "var-cheese-nutella",
        "name": "Nutella Swirl Cheesecake Tub",
        "weight_label": "Nutella Tub",
        "price": 250,
        "serves_label": "Serves 1-2"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Philadelphia Cream Cheese",
      "Biscuit Crust",
      "Fruit Compote / Nutella / Biscoff",
      "Vanilla"
    ],
    "storage_instructions": "Always keep refrigerated at 2-4°C."
  },
  {
    "id": "prod-single-classic-fudge",
    "name": "Classic Fudge Brownie (Single Piece)",
    "slug": "classic-fudge-brownie-single",
    "description": "Our signature individual brownie square: crackly paper-thin crust with an intensely rich, molten cocoa center.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 50,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-cf-1pc",
        "name": "1 Piece (80g)",
        "weight_label": "1 Piece",
        "price": 50,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Cocoa",
      "Dark Chocolate",
      "Butter",
      "Flour"
    ],
    "storage_instructions": "Stays fresh 7 days at room temperature."
  },
  {
    "id": "prod-single-belgian-chocolate",
    "name": "Belgian Chocolate Brownie (Single Piece)",
    "slug": "belgian-chocolate-brownie-single",
    "description": "Baked exclusively with 70% Callebaut dark Belgian chocolate for deep chocolate connoisseurs.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 100,
    "images": [
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-bc-1pc",
        "name": "1 Piece (90g)",
        "weight_label": "1 Piece",
        "price": 100,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "70% Belgian Callebaut Chocolate",
      "French Butter",
      "Cocoa Butter"
    ],
    "storage_instructions": "Room temperature fresh for 7 days."
  },
  {
    "id": "prod-single-nutella-brownie",
    "name": "Nutella Brownie (Single Piece)",
    "slug": "nutella-brownie-single",
    "description": "Single brownie square generously slathered with pure Nutella spread and chocolate drizzle.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-sp-nut-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Nutella",
      "Fudge Brownie",
      "Cocoa"
    ],
    "storage_instructions": "Keep in cool dry place."
  },
  {
    "id": "prod-single-biscoff-brownie",
    "name": "Biscoff Brownie (Single Piece)",
    "slug": "biscoff-brownie-single",
    "description": "Single brownie square infused with caramel speculoos Lotus Biscoff spread and biscuit crumb.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-bisc-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Lotus Biscoff Spread",
      "Lotus Biscuits",
      "Fudge Brownie"
    ],
    "storage_instructions": "Room temperature safe."
  },
  {
    "id": "prod-single-pistachio-kunafa-brownie",
    "name": "Pistachio Kunafa Brownie (Single Piece)",
    "slug": "pistachio-kunafa-brownie-single",
    "description": "Crispy butter-toasted Turkish kunafa phyllo pastry topped with pure pistachio paste over a decadent brownie square.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-sp-pk-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Roasted Kunafa Kataifi",
      "Pure Iranian Pistachio Paste",
      "Fudge Brownie Base"
    ],
    "storage_instructions": "Keep chilled for crisp pastry texture."
  },
  {
    "id": "prod-single-caramel-brownie",
    "name": "Caramel Brownie (Single Piece)",
    "slug": "caramel-brownie-single",
    "description": "Single brownie square with gooey house-made salted butter caramel ribbon and sea salt flakes.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-car-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Salted Caramel Sauce",
      "Fudge Brownie",
      "Sea Salt Flakes"
    ],
    "storage_instructions": "Room temperature safe."
  },
  {
    "id": "prod-single-death-by-chocolate",
    "name": "Death by Chocolate Brownie (Single Piece)",
    "slug": "death-by-chocolate-brownie-single",
    "description": "Triple chocolate overload: dark brownie loaded with molten chocolate core and dark chocolate ganache glaze.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 100,
    "images": [
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-dbc-1pc",
        "name": "1 Piece (95g)",
        "weight_label": "1 Piece",
        "price": 100,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Dark Belgian Chocolate",
      "Chocolate Fudge Glaze",
      "Cocoa"
    ],
    "storage_instructions": "Ambient safe 7 days."
  },
  {
    "id": "prod-single-nuts-loaded-brownie",
    "name": "Nuts Loaded Brownie (Single Piece)",
    "slug": "nuts-loaded-brownie-single",
    "description": "Loaded with toasted California walnuts, crunchy almonds, and cashews baked right into the fudge brownie.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-sp-nl-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Walnuts",
      "Almonds",
      "Cashews",
      "Fudge Brownie"
    ],
    "storage_instructions": "Ambient safe 7 days."
  },
  {
    "id": "prod-single-triple-chocolate",
    "name": "Triple Chocolate Brownie (Single Piece)",
    "slug": "triple-chocolate-brownie-single",
    "description": "Folded with chunks of white, milk, and dark chocolate inside a fudgy chocolate square.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 75,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 2,
    "min_order_hours": 2,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-sp-tc-1pc",
        "name": "1 Piece (85g)",
        "weight_label": "1 Piece",
        "price": 75,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "White, Milk & Dark Chocolate Chunks",
      "Cocoa Brownie"
    ],
    "storage_instructions": "Ambient safe 7 days."
  },
  {
    "id": "prod-single-lava-brownie",
    "name": "Lava Brownie (Min 3 pcs)",
    "slug": "lava-brownie",
    "description": "Individual molten lava brownie squares with an eruption of warm liquid chocolate fudge center. (₹100 per piece, min 3 pieces).",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 300,
    "images": [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-lava-3pc",
        "name": "Box of 3 Pieces (Min Order)",
        "weight_label": "3 Pieces Box",
        "price": 300,
        "serves_label": "Serves 2-3",
        "is_default": true
      },
      {
        "id": "var-lava-6pc",
        "name": "Box of 6 Pieces (Family Pack)",
        "weight_label": "6 Pieces Box",
        "price": 590,
        "serves_label": "Serves 4-6"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Liquid Chocolate Ganache Center",
      "Fudge Brownie Shell",
      "Butter"
    ],
    "storage_instructions": "Warm in microwave for 15-20 seconds before eating for maximum molten lava flow!"
  },
  {
    "id": "prod-korean-garlic-cream-cheese-bun",
    "name": "Korean Garlic Cream Cheese Bun",
    "slug": "korean-garlic-cream-cheese-bun",
    "description": "Golden fluffy brioche bun sliced into petals, generously stuffed with sweetened cream cheese, and bathed in garlic parsley butter.",
    "category_id": "cat-single-pieces",
    "category_name": "Single Pieces & Brownies",
    "base_price": 80,
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 4,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-bun-1pc",
        "name": "1 Bun (Standard)",
        "weight_label": "1 Bun",
        "price": 80,
        "serves_label": "Serves 1",
        "is_default": true
      },
      {
        "id": "var-bun-2pc",
        "name": "Pack of 2 Buns",
        "weight_label": "2 Buns Pack",
        "price": 155,
        "serves_label": "Serves 2"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Brioche Bun",
      "Garlic Butter",
      "Cream Cheese",
      "Fresh Parsley"
    ],
    "storage_instructions": "Warm in oven or toaster for 2 minutes for crispy outside and creamy center."
  },
  {
    "id": "prod-dream-cake-classic",
    "name": "Classic 5-in-1 Chocolate Dream Cake",
    "slug": "classic-chocolate-dream-cake",
    "description": "Coimbatore viral sensation: 5 rich layers of moist chocolate sponge, dark chocolate mousse, silky ganache, crackable hard chocolate shell, and cocoa powder dusting.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 200,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-dc-classic-std",
        "name": "Petite Dream Cake Tin",
        "weight_label": "Petite Tin",
        "price": 200,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Dark Chocolate Shell",
      "Chocolate Mousse",
      "Ganache",
      "Sponge",
      "Cocoa Powder"
    ],
    "storage_instructions": "Keep chilled. Crack the top chocolate disk with a spoon before diving in!"
  },
  {
    "id": "prod-dream-cake-white-choco",
    "name": "White Chocolate Dream Cake",
    "slug": "white-chocolate-dream-cake",
    "description": "Delicate Madagascar vanilla sponge, whipped ivory white chocolate mousse, vanilla cream ganache, and a crackable white chocolate disk.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 225,
    "images": [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-dc-wc-std",
        "name": "Petite Dream Cake Tin",
        "weight_label": "Petite Tin",
        "price": 225,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Belgian White Chocolate",
      "Vanilla Sponge",
      "Ivory Mousse"
    ],
    "storage_instructions": "Keep refrigerated at 2-4°C."
  },
  {
    "id": "prod-dream-cake-nutella-brownie",
    "name": "Nutella Brownie Dream Cake",
    "slug": "nutella-brownie-dream-cake",
    "description": "Ultra-dense Nutella fudge brownie base, whipped Nutella mousse, roasted hazelnut crunch, and crackable dark chocolate top.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-dc-nb-std",
        "name": "Petite Dream Cake Tin",
        "weight_label": "Petite Tin",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Italian Nutella",
      "Fudge Brownie Base",
      "Dark Shell",
      "Hazelnuts"
    ],
    "storage_instructions": "Keep chilled. Crack and enjoy!"
  },
  {
    "id": "prod-dream-cake-pistachio-kunafa",
    "name": "Pistachio Kunafa Dream Cake",
    "slug": "pistachio-kunafa-dream-cake",
    "description": "Crunchy golden kunafa kataifi toasted in pure butter, layered with rich pistachio mousse, pistachio ganache, and crackable pistachio chocolate.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 250,
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-dc-pk-std",
        "name": "Petite Dream Cake Tin",
        "weight_label": "Petite Tin",
        "price": 250,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Turkish Kunafa Phyllo",
      "Pure Pistachio Paste",
      "White Chocolate Shell"
    ],
    "storage_instructions": "Keep refrigerated."
  },
  {
    "id": "prod-dream-cake-rose-milk",
    "name": "Rose Milk Dream Cake",
    "slug": "rose-milk-dream-cake",
    "description": "Fragrant rose milk soaked vanilla sponge, cardamom infused cream, pistachio nibs, and crackable white chocolate rose disk.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 220,
    "images": [
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-dc-rm-std",
        "name": "Petite Dream Cake Tin",
        "weight_label": "Petite Tin",
        "price": 220,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Rose Milk Soak",
      "Cardamom Cream",
      "Pistachios",
      "White Chocolate"
    ],
    "storage_instructions": "Keep chilled. Serve cold."
  },
  {
    "id": "prod-tin-cookie-500g",
    "name": "Artisanal Cookie Tin (500g)",
    "slug": "artisanal-cookie-tin-500g",
    "description": "Freshly baked melt-in-the-mouth French butter cookies and Belgian chocolate chunk cookies presented in an elegant airtight 500g tin.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 475,
    "images": [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-cookie-tin-500g",
        "name": "500g Keepsake Gift Tin",
        "weight_label": "500g Tin",
        "price": 475,
        "serves_label": "Serves 4-6",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 30
    },
    "ingredients": [
      "French Butter",
      "Flour",
      "Dark Chocolate Chunks",
      "Cane Sugar"
    ],
    "storage_instructions": "Keep airtight in keepsake tin. Stays crispy for 3 weeks."
  },
  {
    "id": "prod-tiramisu-pot",
    "name": "Artisanal Espresso Tiramisu",
    "slug": "artisanal-espresso-tiramisu",
    "description": "Traditional savoiardi ladyfingers steeped in freshly brewed dark espresso, layered with luscious mascarpone cream and dusted with Valrhona cocoa.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 150,
    "images": [
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 3,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-tiramisu-std",
        "name": "Individual Tiramisu Cup",
        "weight_label": "Single Cup",
        "price": 150,
        "serves_label": "Serves 1",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Italian Mascarpone",
      "Arabica Dark Espresso",
      "Ladyfingers",
      "Valrhona Cocoa"
    ],
    "storage_instructions": "Keep refrigerated at 2-4°C."
  },
  {
    "id": "prod-burnt-basque-cheesecake-250g",
    "name": "Burnt Basque Cheesecake (250g)",
    "slug": "burnt-basque-cheesecake-250g",
    "description": "Caramelized Spanish San Sebastián style cheesecake: deeply charred exterior crust with a gooey, molten custard center.",
    "category_id": "cat-dream-cakes",
    "category_name": "Dream Cakes & Confections",
    "base_price": 275,
    "images": [
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 4,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-basque-250g",
        "name": "250g Petite Basque Cake",
        "weight_label": "250g Petite",
        "price": 275,
        "serves_label": "Serves 1-2",
        "is_default": true
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": false,
      "max_message_chars": 0
    },
    "ingredients": [
      "Cream Cheese",
      "Heavy Dairy Cream",
      "Vanilla Bean",
      "Organic Sugar"
    ],
    "storage_instructions": "Always keep refrigerated."
  },
  {
    "id": "prod-courier-brownie-slab",
    "name": "Chocolate-Filled Fudgy Brownie Slab (Courier Special)",
    "slug": "chocolate-filled-fudgy-brownie-slab",
    "description": "Specially crafted for long-distance courier delivery across Tamil Nadu & Pan-India. A thick, intensely fudgy dark chocolate brownie slab covered and infused with rich Belgian chocolate filling. Securely vacuum-sealed in ambient-stable protective packaging with 7 days fresh shelf-life.",
    "category_id": "cat-courier-slabs",
    "category_name": "Brownie Slabs (Courier Orders)",
    "base_price": 550,
    "images": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-slab-500g",
        "name": "500g Slab (Serves 4-6)",
        "weight_label": "500g Slab",
        "price": 550,
        "serves_label": "Serves 4-6",
        "is_default": true
      },
      {
        "id": "var-slab-750g",
        "name": "750g Double Chocolate Stuffed Slab",
        "weight_label": "750g Stuffed Slab",
        "price": 790,
        "serves_label": "Serves 6-8"
      },
      {
        "id": "var-slab-1kg",
        "name": "1 Kg Grand Sharing Slab",
        "weight_label": "1 Kg Grand Slab",
        "price": 990,
        "serves_label": "Serves 10-14"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "70% Belgian Dark Chocolate",
      "Liquid Chocolate Fudge Filling",
      "Butter",
      "Cocoa Powder",
      "Flour",
      "Vanilla"
    ],
    "storage_instructions": "Ambient courier safe. Stays fresh for 7 days at room temperature. Warm for 15 seconds in microwave before eating for molten center!"
  },
  {
    "id": "prod-triple-ganache-brownie-slab",
    "name": "Triple Ganache Covered Brownie Slab Gift Box",
    "slug": "triple-ganache-covered-brownie-slab",
    "description": "Courier-ready dessert slab drenched in three layers of dark Callebaut chocolate filling, hazelnut crunch, and sea salt flakes. Arrives intact anywhere in Tamil Nadu and India in insulated courier gift packaging.",
    "category_id": "cat-courier-slabs",
    "category_name": "Brownie Slabs (Courier Orders)",
    "base_price": 620,
    "images": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 6,
    "min_order_hours": 6,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-triple-600g",
        "name": "600g Gift Slab Box",
        "weight_label": "600g Slab Box",
        "price": 620,
        "serves_label": "Serves 5-8",
        "is_default": true
      },
      {
        "id": "var-triple-1-2kg",
        "name": "1.2 Kg Deluxe Slab Box",
        "weight_label": "1.2 Kg Deluxe Slab",
        "price": 1190,
        "serves_label": "Serves 12-16"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 0,
      "allow_message": true,
      "max_message_chars": 40
    },
    "ingredients": [
      "Belgian Callebaut Ganache",
      "Fudge Brownie Base",
      "Roasted Hazelnuts",
      "Sea Salt",
      "Cocoa Butter"
    ],
    "storage_instructions": "Packaged for travel and courier shipping. 7 days freshness at room temperature."
  },
  {
    "id": "prod-belgian-truffle",
    "name": "Royal Belgian Dark Truffle Cake",
    "slug": "royal-belgian-dark-truffle-cake",
    "description": "Decadent layers of moist dark chocolate sponge filled and enrobed with silky 70% Callebaut chocolate ganache. Rich, luxurious, and finished with delicate chocolate curls.",
    "category_id": "cat-celebration-cakes",
    "category_name": "Celebration Cakes",
    "base_price": 850,
    "images": [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 18,
    "min_order_hours": 12,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-truffle-500g",
        "name": "500g (Serves 4-6)",
        "weight_label": "500g",
        "price": 850,
        "serves_label": "Serves 4-6",
        "is_default": true
      },
      {
        "id": "var-truffle-1kg",
        "name": "1 Kg (Serves 8-12)",
        "weight_label": "1 Kg",
        "price": 1550,
        "serves_label": "Serves 8-12"
      },
      {
        "id": "var-truffle-1-5kg",
        "name": "1.5 Kg (Serves 14-18)",
        "weight_label": "1.5 Kg",
        "price": 2250,
        "serves_label": "Serves 14-18"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 50,
      "allow_message": true,
      "max_message_chars": 35,
      "allow_topper": true
    },
    "ingredients": [
      "Belgian Dark Chocolate",
      "Dairy Butter",
      "Heavy Cream",
      "Cocoa Powder",
      "Flour",
      "Organic Sugar"
    ],
    "storage_instructions": "Keep refrigerated. Bring to room temperature 15 minutes before serving for optimal texture."
  },
  {
    "id": "prod-red-velvet-cream-cheese",
    "name": "Velvet Rose & Cream Cheese Cake",
    "slug": "velvet-rose-cream-cheese-cake",
    "description": "Silky red velvet crumb paired with Philadelphia-style tangy vanilla cream cheese frosting. Adorned with edible rose petals and blush chocolate pearls.",
    "category_id": "cat-celebration-cakes",
    "category_name": "Celebration Cakes",
    "base_price": 900,
    "images": [
      "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 24,
    "min_order_hours": 16,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-rv-500g",
        "name": "500g (Serves 4-6)",
        "weight_label": "500g",
        "price": 900,
        "serves_label": "Serves 4-6",
        "is_default": true
      },
      {
        "id": "var-rv-1kg",
        "name": "1 Kg (Serves 8-12)",
        "weight_label": "1 Kg",
        "price": 1650,
        "serves_label": "Serves 8-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 50,
      "allow_message": true,
      "max_message_chars": 35,
      "allow_topper": true
    },
    "ingredients": [
      "Philadelphia Cream Cheese",
      "Buttermilk",
      "Cocoa Powder",
      "Vanilla Bean",
      "Flour",
      "Butter"
    ],
    "storage_instructions": "Keep refrigerated until 20 minutes before serving."
  },
  {
    "id": "prod-blush-daisy-bento",
    "name": "Blush & Daisy Korean Bento Cake",
    "slug": "blush-daisy-korean-bento-cake",
    "description": "Aesthetic 4-inch mini bento cake styled in Korean vintage aesthetic with pastel pink buttercream and hand-piped white daisies. Packed in an eco-friendly sugarcane bento box with a wooden fork and candle.",
    "category_id": "cat-bento-cakes",
    "category_name": "Bento & Petite Cakes",
    "base_price": 490,
    "images": [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": true,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 12,
    "min_order_hours": 8,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-bento-vanilla",
        "name": "Madagascar Vanilla Sponge (350g)",
        "weight_label": "350g / 4 inch",
        "price": 490,
        "serves_label": "Serves 1-2",
        "is_default": true
      },
      {
        "id": "var-bento-choco",
        "name": "Dutch Chocolate Fudge (350g)",
        "weight_label": "350g / 4 inch",
        "price": 520,
        "serves_label": "Serves 1-2"
      },
      {
        "id": "var-bento-biscoff",
        "name": "Lotus Biscoff Crumble (350g)",
        "weight_label": "350g / 4 inch",
        "price": 560,
        "serves_label": "Serves 1-2"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 30,
      "allow_message": true,
      "max_message_chars": 20
    },
    "ingredients": [
      "Italian Buttercream",
      "Flour",
      "Vanilla Bean",
      "Butter",
      "Pastel Food Colors"
    ],
    "storage_instructions": "Best consumed within 48 hours. Keep refrigerated."
  },
  {
    "id": "prod-lotus-biscoff-torte",
    "name": "Lotus Biscoff Crunchy Torte",
    "slug": "lotus-biscoff-crunchy-torte",
    "description": "Layers of caramelized Biscoff spread mousse, spiced speculoos cookie crust, and brown butter sponge topped with a mirror Biscoff drip and whole lotus biscuits.",
    "category_id": "cat-celebration-cakes",
    "category_name": "Celebration Cakes",
    "base_price": 950,
    "images": [
      "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": true,
    "is_new": false,
    "is_available": true,
    "preparation_time_hours": 20,
    "min_order_hours": 14,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": false
    },
    "variants": [
      {
        "id": "var-biscoff-500g",
        "name": "500g (Serves 4-6)",
        "weight_label": "500g",
        "price": 950,
        "serves_label": "Serves 4-6",
        "is_default": true
      },
      {
        "id": "var-biscoff-1kg",
        "name": "1 Kg (Serves 8-12)",
        "weight_label": "1 Kg",
        "price": 1750,
        "serves_label": "Serves 8-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 50,
      "allow_message": true,
      "max_message_chars": 35,
      "allow_topper": true
    },
    "ingredients": [
      "Lotus Biscoff Spread",
      "Lotus Biscoff Biscuits",
      "Brown Butter Sponge",
      "Dairy Cream"
    ],
    "storage_instructions": "Keep chilled. Serve cold for the best mousse texture."
  },
  {
    "id": "prod-royal-pistachio-rose",
    "name": "Royal Persian Pistachio & Rose Cake",
    "slug": "royal-persian-pistachio-rose-cake",
    "description": "Fragrant natural pistachio sponge infused with pure damask rose essence and green cardamom, layered with whipped white chocolate pistachio praline cream.",
    "category_id": "cat-celebration-cakes",
    "category_name": "Celebration Cakes",
    "base_price": 1100,
    "images": [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=85"
    ],
    "is_featured": false,
    "is_bestseller": false,
    "is_new": true,
    "is_available": true,
    "preparation_time_hours": 24,
    "min_order_hours": 18,
    "dietary_flags": {
      "is_eggless_available": true,
      "contains_nuts": true
    },
    "variants": [
      {
        "id": "var-pistachio-500g",
        "name": "500g (Serves 4-6)",
        "weight_label": "500g",
        "price": 1100,
        "serves_label": "Serves 4-6",
        "is_default": true
      },
      {
        "id": "var-pistachio-1kg",
        "name": "1 Kg (Serves 8-12)",
        "weight_label": "1 Kg",
        "price": 1950,
        "serves_label": "Serves 8-12"
      }
    ],
    "customization": {
      "allow_eggless": true,
      "eggless_surcharge": 50,
      "allow_message": true,
      "max_message_chars": 35
    },
    "ingredients": [
      "Raw Iranian Pistachios",
      "Rose Water",
      "Green Cardamom",
      "Butter",
      "Flour",
      "Cream"
    ],
    "storage_instructions": "Keep refrigerated until ready to serve."
  }
];

export const INITIAL_DELIVERY_AREAS: DeliveryArea[] = [
  {
    "id": "area-podanur",
    "pincode": "641023",
    "area_name": "Podanur / Chettipalayam Road",
    "delivery_fee": 50,
    "min_order_amount": 350,
    "is_active": true
  },
  {
    "id": "area-ramanathapuram",
    "pincode": "641045",
    "area_name": "Ramanathapuram / Sungam",
    "delivery_fee": 70,
    "min_order_amount": 400,
    "is_active": true
  },
  {
    "id": "area-rspuram",
    "pincode": "641002",
    "area_name": "RS Puram / DB Road",
    "delivery_fee": 90,
    "min_order_amount": 450,
    "is_active": true
  },
  {
    "id": "area-gandhipuram",
    "pincode": "641012",
    "area_name": "Gandhipuram / Cross Cut Road",
    "delivery_fee": 80,
    "min_order_amount": 400,
    "is_active": true
  },
  {
    "id": "area-peelamedu",
    "pincode": "641004",
    "area_name": "Peelamedu / Avinashi Road",
    "delivery_fee": 100,
    "min_order_amount": 500,
    "is_active": true
  },
  {
    "id": "area-saravanampatti",
    "pincode": "641035",
    "area_name": "Saravanampatti / IT Corridor",
    "delivery_fee": 130,
    "min_order_amount": 600,
    "is_active": true
  },
  {
    "id": "area-madukkarai",
    "pincode": "641105",
    "area_name": "Madukkarai / SIDCO",
    "delivery_fee": 60,
    "min_order_amount": 350,
    "is_active": true
  },
  {
    "id": "area-singanallur",
    "pincode": "641005",
    "area_name": "Singanallur / Trichy Road",
    "delivery_fee": 75,
    "min_order_amount": 400,
    "is_active": true
  },
  {
    "id": "area-saibaba",
    "pincode": "641011",
    "area_name": "Saibaba Colony / NSR Road",
    "delivery_fee": 95,
    "min_order_amount": 450,
    "is_active": true
  },
  {
    "id": "area-racecourse",
    "pincode": "641018",
    "area_name": "Race Course / Red Fields",
    "delivery_fee": 80,
    "min_order_amount": 450,
    "is_active": true
  }
];

export const INITIAL_TIME_SLOTS: TimeSlot[] = [
  {
    "id": "slot-morning",
    "label": "Morning Slot (10:00 AM – 01:00 PM)",
    "start_time": "10:00",
    "end_time": "13:00",
    "max_orders": 10,
    "is_active": true
  },
  {
    "id": "slot-afternoon",
    "label": "Afternoon Slot (01:00 PM – 05:00 PM)",
    "start_time": "13:00",
    "end_time": "17:00",
    "max_orders": 12,
    "is_active": true
  },
  {
    "id": "slot-evening",
    "label": "Evening Celebration Slot (05:00 PM – 08:30 PM)",
    "start_time": "17:00",
    "end_time": "20:30",
    "max_orders": 15,
    "is_active": true
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  "store_name": "Cakes & Dessert",
  "tagline": "Made with Love. Baked for Beautiful Moments.",
  "hero_headline": "Every Celebration Deserves Something Sweet.",
  "hero_description": "Discover beautifully crafted artisanal cakes, loaded brownie slabs, dessert tubs, and confections, made fresh to order in Coimbatore.",
  "phone_numbers": [
    "+91 86374 78423",
    "+91 78417 16999",
    "+91 95333 08332"
  ],
  "whatsapp_number": "918637478423",
  "email": "cakesanddessert1@gmail.com",
  "address_pickup": "Podanur Main Road, Coimbatore, Tamil Nadu 641023 (Exact studio pickup instructions shared upon order confirmation)",
  "operating_hours": "Daily: 10:00 AM – 09:00 PM",
  "instagram_url": "https://instagram.com/cakesanddessert.in",
  "min_advance_order_hours": 6,
  "same_day_cutoff_hour": 14,
  "upi_id": "cakesanddessert@upi",
  "upi_recipient_name": "Cakes and Dessert Coimbatore",
  "bank_transfer_details": "Account Name: Cakes and Dessert | Bank: HDFC Bank, Podanur Branch, Coimbatore | Account verification & transfer instructions shared upon WhatsApp confirmation",
  "cash_on_pickup_enabled": true,
  "cash_on_delivery_enabled": true,
  "free_delivery_threshold": 1200,
  "swiggy_direct_url": "https://www.swiggy.com/direct/brand/708273?source=swiggy-direct&subSource=whatsapp",
  "courier_delivery_enabled": true
};
