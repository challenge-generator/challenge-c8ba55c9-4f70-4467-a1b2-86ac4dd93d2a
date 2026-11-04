import { Product, ProductInput, ProductFilter, ProductPrice, ProductStock, ProductImage, ProductSpecification } from '../models/Product';
import { ProductValidator } from '../models/Product';

const STORAGE_KEY = 'vtex_product_catalog';

export class ProductService {
  private static getStoredProducts(): Product[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    try {
      return JSON.parse(stored) as Product[];
    } catch {
      console.error('[ProductService] Error parsing stored products');
      return [];
    }
  }

  private static saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  static async getAllProducts(): Promise<Product[]> {
    await this.simulateNetworkDelay();
    return this.getStoredProducts();
  }

  static async getProductById(id: string): Promise<Product | null> {
    await this.simulateNetworkDelay();
    const products = this.getStoredProducts();
    return products.find(p => p.id === id) || null;
  }

  static async getProductsByFilter(filter: ProductFilter): Promise<Product[]> {
    await this.simulateNetworkDelay();
    let products = this.getStoredProducts();

    if (filter.category) {
      products = products.filter(p => p.category === filter.category);
    }
    if (filter.minPrice !== undefined) {
      products = products.filter(p => p.price.amount >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      products = products.filter(p => p.price.amount <= filter.maxPrice!);
    }
    if (filter.inStockOnly) {
      products = products.filter(p => p.stock.quantity > 0);
    }
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term)
      );
    }

    return products;
  }

  static async createProduct(input: ProductInput): Promise<Product> {
    const validation = ProductValidator.validateProductInput(input);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    await this.simulateNetworkDelay();
    const products = this.getStoredProducts();
    
    const newProduct: Product = {
      id: this.generateUniqueId(),
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      stock: input.stock,
      images: input.images || [],
      specifications: input.specifications || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: true
    };

    products.push(newProduct);
    this.saveProducts(products);

    return newProduct;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const existingProduct = await this.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const validation = ProductValidator.validateProductUpdate(existingProduct);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    await this.simulateNetworkDelay();
    const products = this.getStoredProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }

    const updatedProduct: Product = {
      ...products[index],
      ...updates,
      id: products[index].id,
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;
    this.saveProducts(products);

    return updatedProduct;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await this.simulateNetworkDelay();
    const products = this.getStoredProducts();
    const filteredProducts = products.filter(p => p.id !== id);

    if (filteredProducts.length === products.length) {
      return false;
    }

    this.saveProducts(filteredProducts);
    return true;
  }

  static async toggleProductActive(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return this.updateProduct(id, { active: !product.active });
  }

  static async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    const newStock: ProductStock = {
      ...product.stock,
      quantity: Math.max(0, quantity)
    };

    return this.updateProduct(id, { stock: newStock });
  }

  static async updatePrice(id: string, price: ProductPrice): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return this.updateProduct(id, { price });
  }

  static getCategories(): string[] {
    const products = this.getStoredProducts();
    const categories = new Set<string>();
    products.forEach(p => categories.add(p.category));
    return Array.from(categories).sort();
  }

  static getFeaturedProducts(limit: number = 4): Product[] {
    const products = this.getStoredProducts();
    return products
      .filter(p => p.active && p.stock.quantity > 0)
      .sort((a, b) => b.price.amount - a.price.amount)
      .slice(0, limit);
  }

  private static generateUniqueId(): string {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}

export default ProductService;