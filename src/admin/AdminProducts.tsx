import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Sparkles,
  Upload,
  Search,
  Check,
  X,
  Cake,
  Clock,
  Eye,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Product, Category, ProductVariant } from '@/types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Editing / Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [basePrice, setBasePrice] = useState(650);
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [prepTimeHours, setPrepTimeHours] = useState(12);
  const [minOrderHours, setMinOrderHours] = useState(8);
  const [isEgglessAvailable, setIsEgglessAvailable] = useState(true);
  const [variants, setVariants] = useState<ProductVariant[]>([
    { id: 'var-1', name: '500g (Serves 4-6)', weight_label: '500g', price: 650, serves_label: 'Serves 4-6', is_default: true },
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        dataProvider.getProducts(),
        dataProvider.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      console.error('Failed to load products', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setCategoryId(categories[0]?.id || 'cat-celebration-cakes');
    setBasePrice(650);
    setImageUrl('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80');
    setIsFeatured(false);
    setIsBestseller(false);
    setIsNew(true);
    setIsAvailable(true);
    setPrepTimeHours(12);
    setMinOrderHours(8);
    setIsEgglessAvailable(true);
    setVariants([
      { id: 'v-' + Date.now(), name: '500g (Serves 4-6)', weight_label: '500g', price: 650, serves_label: 'Serves 4-6', is_default: true },
    ]);
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setDescription(prod.description);
    setCategoryId(prod.category_id);
    setBasePrice(prod.base_price);
    setImageUrl(prod.images[0] || '');
    setIsFeatured(prod.is_featured);
    setIsBestseller(prod.is_bestseller);
    setIsNew(prod.is_new);
    setIsAvailable(prod.is_available);
    setPrepTimeHours(prod.preparation_time_hours);
    setMinOrderHours(prod.min_order_hours);
    setIsEgglessAvailable(prod.dietary_flags.is_eggless_available);
    setVariants(prod.variants.length > 0 ? prod.variants : [
      { id: 'v-' + Date.now(), name: 'Standard Portion', weight_label: 'Standard', price: prod.base_price, is_default: true },
    ]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this dessert from the active catalog?')) {
      await dataProvider.deleteProduct(id);
      loadData();
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await dataProvider.uploadImage(e.target.files[0], 'products');
        setImageUrl(url);
      } catch (err: any) {
        alert('Image upload failed: ' + err.message);
      }
    }
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: 'var-' + Date.now(),
        name: '1 Kg (Serves 8-12)',
        weight_label: '1 Kg',
        price: basePrice + 600,
        serves_label: 'Serves 8-12',
      },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === categoryId);

    const payload: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name,
      slug: editingProduct?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      category_id: categoryId,
      category_name: cat ? cat.name : 'Artisanal Bakes',
      base_price: Number(basePrice),
      images: [imageUrl],
      is_featured: isFeatured,
      is_bestseller: isBestseller,
      is_new: isNew,
      is_available: isAvailable,
      preparation_time_hours: Number(prepTimeHours),
      min_order_hours: Number(minOrderHours),
      dietary_flags: {
        is_eggless_available: isEgglessAvailable,
      },
      variants,
      customization: {
        allow_eggless: isEgglessAvailable,
        eggless_surcharge: 50,
        allow_message: true,
        max_message_chars: 35,
      },
    };

    try {
      await dataProvider.saveProduct(payload);
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
            Dessert Menu &amp; Catalogue
          </h1>
          <p className="text-xs text-[#8A554D] mt-1">
            Manage celebration cakes, brownies, variants, prices, and eggless availability.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#4B2923] text-white py-3 px-5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#2F1916] shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-[#E9AEBB]" />
          Add New Dessert
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-[#D7BFAE]/30 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A554D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by bake name or category..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-[#4B2923] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#D7BFAE]/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider border-b border-[#D7BFAE]/30">
              <tr>
                <th className="p-4">Dessert</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Lead Time</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Availability</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FFF7F0]/40 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#D7BFAE]/30"
                    />
                    <div>
                      <span className="font-bold text-[#4B2923] block text-sm">{prod.name}</span>
                      <span className="text-[10px] text-[#8A554D] line-clamp-1">{prod.description}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#4B2923]">{prod.category_name}</td>
                  <td className="p-4 font-bold text-[#4B2923]">₹{prod.base_price}</td>
                  <td className="p-4">{prod.variants.length} portion sizes</td>
                  <td className="p-4">{prod.min_order_hours}h advance</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {prod.is_bestseller && (
                        <span className="bg-[#4B2923] text-white text-[9px] px-1.5 py-0.5 rounded font-semibold">
                          Bestseller
                        </span>
                      )}
                      {prod.is_featured && (
                        <span className="bg-[#E9AEBB] text-[#2F1916] text-[9px] px-1.5 py-0.5 rounded font-semibold">
                          Featured
                        </span>
                      )}
                      {prod.dietary_flags.is_eggless_available && (
                        <span className="bg-emerald-50 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded border border-emerald-200">
                          Eggless
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      prod.is_available ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {prod.is_available ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 rounded-lg hover:bg-[#FFF7F0] text-[#4B2923]"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#D7BFAE]/50 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#D7BFAE]/30 mb-6">
              <h3 className="font-serif font-bold text-xl text-[#4B2923]">
                {editingProduct ? 'Edit Dessert Bake' : 'Add New Dessert to Menu'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-[#8A554D]" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Belgian Dark Truffle Cake"
                  className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Starting Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe ingredients, chocolate grade, and taste notes..."
                  className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
              </div>

              {/* Image URL / Upload */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Product Image (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FFF7F0] border border-[#D7BFAE] rounded-xl text-xs font-semibold cursor-pointer hover:bg-[#F7DCE2]">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Portion Variants Config */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923]">
                    Portion Variants &amp; Pricing
                  </label>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs font-semibold text-[#4B2923] hover:underline"
                  >
                    + Add Size Variant
                  </button>
                </div>

                <div className="space-y-2">
                  {variants.map((v, i) => (
                    <div key={v.id || i} className="flex items-center gap-2 bg-[#FFF7F0] p-2.5 rounded-xl border border-[#D7BFAE]/50">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => {
                          const next = [...variants];
                          next[i].name = e.target.value;
                          setVariants(next);
                        }}
                        placeholder="Variant label (e.g. 1 Kg)"
                        className="flex-1 text-xs p-1.5 rounded-lg border border-[#D7BFAE] bg-white"
                      />
                      <input
                        type="number"
                        value={v.price}
                        onChange={(e) => {
                          const next = [...variants];
                          next[i].price = Number(e.target.value);
                          setVariants(next);
                        }}
                        placeholder="Price"
                        className="w-24 text-xs p-1.5 rounded-lg border border-[#D7BFAE] bg-white"
                      />
                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(v.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4B2923]"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4B2923]"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEgglessAvailable}
                    onChange={(e) => setIsEgglessAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4B2923]"
                  />
                  <span>Eggless Option</span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4B2923]"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#D7BFAE]/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#D7BFAE] text-xs font-semibold text-[#8A554D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#4B2923] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2F1916]"
                >
                  Save Dessert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

