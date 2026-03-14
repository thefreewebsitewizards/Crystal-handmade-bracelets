import keychainsImg from './assets/keychains.png'
import beadedPensImg from './assets/beaded_pens.png'
import braceletComboImg from './assets/bracelet_combo.png'
import necklacesImg from './assets/necklaces.png'
import earringsImg from './assets/earrings.png'
import customOrdersImg from './assets/custom_orders.png'

/* ===== Types ===== */
export interface Category {
  id: string
  title: string
  description: string
  image: string
  priceLabel: string
}

export interface Product {
  id: string
  categoryId: string
  name: string
  description: string
  price: number
  priceLabel: string
  image: string
}

/* ===== Categories ===== */
export const categories: Category[] = [
  {
    id: 'keychains',
    title: 'Mystery Keychain & Straw Charms',
    description: 'Each mystery keychain could have silicone beads, glow in the dark beads, hard plastic beads, color changing beads, and mini flashlights. Every one is a surprise!',
    image: keychainsImg,
    priceLabel: 'Starting at $8',
  },
  {
    id: 'pens',
    title: 'Mystery Beaded Pens',
    description: 'Starting with a beadable pen, each one is loaded with a unique mix of silicone beads, glow in the dark beads, hard plastic beads, and color changing beads.',
    image: beadedPensImg,
    priceLabel: 'Starting at $12',
  },
  {
    id: 'bracelet-combo',
    title: 'Bracelet & Earring Combo',
    description: 'Beautiful matching bracelet and earring sets, each handmade with love. Every combo is $25 for the full set.',
    image: braceletComboImg,
    priceLabel: '$25 per set',
  },
  {
    id: 'necklaces',
    title: 'Necklaces',
    description: 'Handcrafted beaded necklaces in vibrant styles. New designs coming soon!',
    image: necklacesImg,
    priceLabel: 'Coming Soon',
  },
  {
    id: 'earrings',
    title: 'Earrings',
    description: 'Unique handmade earrings for every occasion. New designs coming soon!',
    image: earringsImg,
    priceLabel: 'Coming Soon',
  },
  {
    id: 'custom',
    title: 'Custom Orders',
    description: 'See something you like but want it in a different color? Have a special request? Let me create something just for you!',
    image: customOrdersImg,
    priceLabel: 'Request a Quote',
  },
]

/* ===== Products ===== */
export const products: Product[] = [
  // Keychains
  {
    id: 'keychain-1pack',
    categoryId: 'keychains',
    name: 'Mystery Keychain — 1 Pack',
    description: 'One surprise mystery keychain! Each one could have silicone beads, glow in the dark beads, hard plastic beads, color changing beads, and a mini flashlight.',
    price: 8.00,
    priceLabel: '$8.00',
    image: keychainsImg,
  },
  {
    id: 'keychain-5pack',
    categoryId: 'keychains',
    name: 'Mystery Keychains — 5 Pack',
    description: 'Five surprise mystery keychains! Great value bundle. Each one could have silicone beads, glow in the dark beads, hard plastic beads, color changing beads, and a mini flashlight.',
    price: 35.00,
    priceLabel: '$35.00',
    image: keychainsImg,
  },
  {
    id: 'keychain-10pack',
    categoryId: 'keychains',
    name: 'Mystery Keychains — 10 Pack',
    description: 'Ten surprise mystery keychains! Best value bundle — perfect for gifts or party favors. Each one could have silicone beads, glow in the dark beads, hard plastic beads, color changing beads, and a mini flashlight.',
    price: 75.00,
    priceLabel: '$75.00',
    image: keychainsImg,
  },
  // Pens
  {
    id: 'pen-1pack',
    categoryId: 'pens',
    name: 'Mystery Beaded Pen — 1 Pack',
    description: 'One beautiful beaded pen! Starting with a beadable pen, each one is loaded with silicone beads, glow in the dark beads, hard plastic beads, and color changing beads.',
    price: 12.00,
    priceLabel: '$12.00',
    image: beadedPensImg,
  },
  {
    id: 'pen-3pack',
    categoryId: 'pens',
    name: 'Mystery Beaded Pens — 3 Pack',
    description: 'Three beautiful beaded pens! Each one is loaded with silicone beads, glow in the dark beads, hard plastic beads, and color changing beads.',
    price: 25.00,
    priceLabel: '$25.00',
    image: beadedPensImg,
  },
  {
    id: 'pen-5pack',
    categoryId: 'pens',
    name: 'Mystery Beaded Pens — 5 Pack',
    description: 'Five beautiful beaded pens! Best value bundle. Each one is loaded with silicone beads, glow in the dark beads, hard plastic beads, and color changing beads.',
    price: 40.00,
    priceLabel: '$40.00',
    image: beadedPensImg,
  },
  // Bracelet Combos
  {
    id: 'combo-set-1',
    categoryId: 'bracelet-combo',
    name: 'Bracelet & Earring Combo Set #1',
    description: 'A beautiful matching bracelet and earring set, handmade with colorful beads. Each set is one of a kind!',
    price: 25.00,
    priceLabel: '$25.00',
    image: braceletComboImg,
  },
  {
    id: 'combo-set-2',
    categoryId: 'bracelet-combo',
    name: 'Bracelet & Earring Combo Set #2',
    description: 'A beautiful matching bracelet and earring set, handmade with colorful beads. Each set is one of a kind!',
    price: 25.00,
    priceLabel: '$25.00',
    image: braceletComboImg,
  },
  {
    id: 'combo-set-3',
    categoryId: 'bracelet-combo',
    name: 'Bracelet & Earring Combo Set #3',
    description: 'A beautiful matching bracelet and earring set, handmade with colorful beads. Each set is one of a kind!',
    price: 25.00,
    priceLabel: '$25.00',
    image: braceletComboImg,
  },
]

/* ===== Helpers ===== */
export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
