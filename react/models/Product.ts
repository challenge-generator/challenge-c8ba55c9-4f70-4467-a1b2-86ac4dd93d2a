/**
 * Modelo de datos para productos en el sistema eCommerce.
 * Define la estructura y tipos para garantizar consistencia en el dominio.
 * Aplica principios de código limpio como SRP y YAGNI.
 */
import { Category } from './Category';

export interface ProductPrice {
  value: number;
  currency: string;
  listPrice?: number;
  sellingPrice: number;
}

export interface ProductStock {
  quantity: number;
  isAvailable: boolean;
  maxOrderQuantity?: number;
}

export interface ProductImage {
  url: string;
  alt: string;
  isMain: boolean;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: Category;
  price: ProductPrice;
  stock: ProductStock;
  images: ProductImage[];
  specifications: ProductSpecification[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  description: string;
  sku: string;
  categoryId: string;
  price: {
    value: number;
    currency: string;
    listPrice?: number;
  };
  stock: {
    quantity: number;
    maxOrderQuantity?: number;
  };
  images: Array<{
    url: string;
    alt: string;
    isMain: boolean;
  }>;
  specifications: Array<{
    key: string;
    value: string;
  }>;
}

export interface ProductFilter {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  searchTerm?: string;
}

export class ProductValidator {
  static validateProductInput(input: ProductInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.name || input.name.trim().length === 0) {
      errors.push('El nombre del producto es requerido');
    } else if (input.name.length > 100) {
      errors.push('El nombre del producto no puede exceder 100 caracteres');
    }

    if (!input.sku || input.sku.trim().length === 0) {
      errors.push('El SKU del producto es requerido');
    } else if (!/^[A-Za-z0-9-_]+$/.test(input.sku)) {
      errors.push('El SKU solo puede contener letras, números, guiones y guiones bajos');
    }

    if (input.price.value <= 0) {
      errors.push('El precio del producto debe ser mayor a cero');
    }

    if (input.stock.quantity < 0) {
      errors.push('La cantidad en stock no puede ser negativa');
    }

    if (input.images && input.images.length > 0) {
      const mainImages = input.images.filter(img => img.isMain);
      if (mainImages.length !== 1) {
        errors.push('Debe haber exactamente una imagen principal');
      }

      input.images.forEach((img, index) => {
        if (!img.url || img.url.trim().length === 0) {
          errors.push(`La URL de la imagen ${index + 1} es requerida`);
        }
        if (!img.alt || img.alt.trim().length === 0) {
          errors.push(`El texto alternativo de la imagen ${index + 1} es requerido`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateProductUpdate(product: Partial<Product>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (product.name !== undefined) {
      if (!product.name || product.name.trim().length === 0) {
        errors.push('El nombre del producto es requerido');
      } else if (product.name.length > 100) {
        errors.push('El nombre del producto no puede exceder 100 caracteres');
      }
    }

    if (product.price !== undefined) {
      if (product.price.value <= 0) {
        errors.push('El precio del producto debe ser mayor a cero');
      }
    }

    if (product.stock !== undefined) {
      if (product.stock.quantity < 0) {
        errors.push('La cantidad en stock no puede ser negativa');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static calculateDiscountPercentage(product: Product): number {
    if (!product.price.listPrice || product.price.listPrice <= product.price.sellingPrice) {
      return 0;
    }
    return Math.round(
      ((product.price.listPrice - product.price.sellingPrice) / product.price.listPrice) * 100
    );
  }

  static formatPrice(price: ProductPrice): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price.sellingPrice);
  }
}

export const DEFAULT_CURRENCY = 'COP';

export const createEmptyProduct = (): Product => ({
  id: '',
  name: '',
  description: '',
  sku: '',
  category: {
    id: '',
    name: '',
    slug: '',
    parentCategoryId: null
  },
  price: {
    value: 0,
    currency: DEFAULT_CURRENCY,
    sellingPrice: 0
  },
  stock: {
    quantity: 0,
    isAvailable: false
  },
  images: [],
  specifications: [],
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date()
});