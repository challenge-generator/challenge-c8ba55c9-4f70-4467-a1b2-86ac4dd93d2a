import { useState, useCallback, useEffect } from 'react';
import { Product, ProductInput, ProductFilter } from '../models/Product';
import { ProductValidator } from '../models/Product';

export interface UseProductReturn {
  product: Product | null;
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProduct: (id: string) => Promise<Product | null>;
  fetchProducts: (filter?: ProductFilter) => Promise<Product[]>;
  createProduct: (input: ProductInput) => Promise<Product | null>;
  updateProduct: (id: string, input: ProductInput) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearProduct: () => void;
}

export interface UseProductOptions {
  autoFetch?: boolean;
  productId?: string;
  onSuccess?: (product: Product) => void;
  onError?: (error: Error) => void;
}

const STORAGE_KEY = 'product_cache';
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry {
  product: Product;
  timestamp: number;
}

const getCache = (): Record<string, CacheEntry> => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const setCache = (key: string, product: Product): void => {
  try {
    const cache = getCache();
    cache[key] = { product, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    console.warn('No se pudo acceder al cache local');
  }
};

const getCachedProduct = (id: string): Product | null => {
  const cache = getCache();
  const entry = cache[id];
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.product;
  }
  return null;
};

export const useProduct = (options?: UseProductOptions): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { autoFetch = false, productId, onSuccess, onError } = options || {};

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearProduct = useCallback(() => {
    setProduct(null);
    setError(null);
  }, []);

  const fetchProduct = useCallback(async (id: string): Promise<Product | null> => {
    const cached = getCachedProduct(id);
    if (cached) {
      setProduct(cached);
      return cached;
    }

    setLoading(true);
    setError(null);

    try {
      const mockProduct: Product = {
        id,
        name: `Producto ${id}`,
        description: 'Descripción del producto',
        sku: `SKU-${id}`,
        price: {
          sellingPrice: 99.99,
          originalPrice: 129.99,
          currencyCode: 'USD'
        },
        stock: {
          quantity: 50,
          reservedQuantity: 5,
          availableQuantity: 45
        },
        category: 'Electrónica',
        images: [],
        specifications: [],
        tags: ['novedad', 'destacado'],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 300));
      
      const validationErrors = ProductValidator.validateProductInput(mockProduct);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      setProduct(mockProduct);
      setCache(id, mockProduct);
      
      if (onSuccess) {
        onSuccess(mockProduct);
      }

      return mockProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener el producto';
      setError(errorMessage);
      
      if (onError && err instanceof Error) {
        onError(err);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const fetchProducts = useCallback(async (filter?: ProductFilter): Promise<Product[]> => {
    setLoading(true);
    setError(null);

    try {
      const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
        id: `prod-${i + 1}`,
        name: `Producto ${i + 1}`,
        description: `Descripción del producto ${i + 1}`,
        sku: `SKU-${String(i + 1).padStart(4, '0')}`,
        price: {
          sellingPrice: Math.random() * 500 + 50,
          originalPrice: Math.random() * 700 + 75,
          currencyCode: 'USD'
        },
        stock: {
          quantity: Math.floor(Math.random() * 100),
          reservedQuantity: Math.floor(Math.random() * 10),
          availableQuantity: Math.floor(Math.random() * 90)
        },
        category: ['Electrónica', 'Ropa', 'Hogar', 'Deportes'][i % 4],
        images: [],
        specifications: [],
        tags: ['novedad'],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = mockProducts;

      if (filter) {
        if (filter.category) {
          filteredProducts = filteredProducts.filter(p => p.category === filter.category);
        }
        if (filter.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => 
            p.price.sellingPrice >= filter.minPrice!
          );
        }
        if (filter.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => 
            p.price.sellingPrice <= filter.maxPrice!
          );
        }
        if (filter.inStockOnly) {
          filteredProducts = filteredProducts.filter(p => 
            p.stock && p.stock.availableQuantity > 0
          );
        }
        if (filter.searchTerm) {
          const term = filter.searchTerm.toLowerCase();
          filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.sku.toLowerCase().includes(term)
          );
        }
      }

      setProducts(filteredProducts);
      return filteredProducts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener los productos';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (input: ProductInput): Promise<Product | null> => {
    setLoading(true);
    setError(null);

    try {
      const validationErrors = ProductValidator.validateProductInput(input);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => [...prev, newProduct]);
      setProduct(newProduct);

      if (onSuccess) {
        onSuccess(newProduct);
      }

      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el producto';
      setError(errorMessage);
      
      if (onError && err instanceof Error) {
        onError(err);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const updateProduct = useCallback(async (id: string, input: ProductInput): Promise<Product | null> => {
    setLoading(true);
    setError(null);

    try {
      const validationErrors = ProductValidator.validateProductUpdate({ id, ...input });
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const updatedProduct: Product = {
        id,
        ...input,
        updatedAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      setProduct(updatedProduct);
      setCache(id, updatedProduct);

      if (onSuccess) {
        onSuccess(updatedProduct);
      }

      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el producto';
      setError(errorMessage);
      
      if (onError && err instanceof Error) {
        onError(err);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => prev.filter(p => p.id !== id));
      
      if (product?.id === id) {
        setProduct(null);
      }

      const cache = getCache();
      delete cache[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el producto';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (autoFetch && productId) {
      fetchProduct(productId);
    }
  }, [autoFetch, productId, fetchProduct]);

  return {
    product,
    products,
    loading,
    error,
    fetchProduct,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
    clearProduct
  };
};

export default useProduct;