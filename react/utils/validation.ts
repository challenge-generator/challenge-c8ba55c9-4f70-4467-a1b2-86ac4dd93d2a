import { ProductInput, Product, ProductPrice, ProductStock, ProductImage, ProductSpecification } from '../models/Product';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FieldValidation {
  field: string;
  value: unknown;
  valid: boolean;
  message?: string;
}

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 200;
const MIN_PRICE = 0.01;
const MAX_PRICE = 999999.99;
const MIN_STOCK = 0;
const MAX_STOCK = 999999;
const ALLOWED_CATEGORIES = ['electronics', 'clothing', 'home', 'sports', 'books', 'toys', 'food', 'beauty', 'other'];

export function validateProductName(name: string): FieldValidation {
  if (!name || typeof name !== 'string') {
    return { field: 'name', value: name, valid: false, message: 'Product name is required' };
  }
  const trimmed = name.trim();
  if (trimmed.length < MIN_NAME_LENGTH) {
    return { field: 'name', value: name, valid: false, message: `Name must be at least ${MIN_NAME_LENGTH} characters` };
  }
  if (trimmed.length > MAX_NAME_LENGTH) {
    return { field: 'name', value: name, valid: false, message: `Name cannot exceed ${MAX_NAME_LENGTH} characters` };
  }
  return { field: 'name', value: name, valid: true };
}

export function validateProductPrice(price: ProductPrice): FieldValidation {
  if (!price || typeof price.amount !== 'number') {
    return { field: 'price', value: price, valid: false, message: 'Price amount is required and must be a number' };
  }
  if (price.amount < MIN_PRICE) {
    return { field: 'price', value: price, valid: false, message: `Price must be at least ${MIN_PRICE}` };
  }
  if (price.amount > MAX_PRICE) {
    return { field: 'price', value: price, valid: false, message: `Price cannot exceed ${MAX_PRICE}` };
  }
  if (!price.currency || price.currency.length !== 3) {
    return { field: 'price.currency', value: price.currency, valid: false, message: 'Currency must be a 3-letter code' };
  }
  return { field: 'price', value: price, valid: true };
}

export function validateProductStock(stock: ProductStock): FieldValidation {
  if (!stock || typeof stock.quantity !== 'number') {
    return { field: 'stock', value: stock, valid: false, message: 'Stock quantity is required and must be a number' };
  }
  if (stock.quantity < MIN_STOCK) {
    return { field: 'stock.quantity', value: stock.quantity, valid: false, message: 'Stock cannot be negative' };
  }
  if (stock.quantity > MAX_STOCK) {
    return { field: 'stock.quantity', value: stock.quantity, valid: false, message: `Stock cannot exceed ${MAX_STOCK}` };
  }
  return { field: 'stock', value: stock, valid: true };
}

export function validateProductCategory(category: string): FieldValidation {
  if (!category || typeof category !== 'string') {
    return { field: 'category', value: category, valid: false, message: 'Category is required' };
  }
  const normalized = category.toLowerCase().trim();
  if (!ALLOWED_CATEGORIES.includes(normalized)) {
    return { 
      field: 'category', 
      value: category, 
      valid: false, 
      message: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}` 
    };
  }
  return { field: 'category', value: category, valid: true };
}

export function validateProductImages(images: ProductImage[]): FieldValidation {
  if (!images || !Array.isArray(images)) {
    return { field: 'images', value: images, valid: true, message: 'Images are optional' };
  }
  if (images.length === 0) {
    return { field: 'images', value: images, valid: true };
  }
  for (const image of images) {
    if (!image.url || typeof image.url !== 'string') {
      return { field: 'images[].url', value: image, valid: false, message: 'Each image must have a valid URL' };
    }
    if (!image.url.startsWith('http://') && !image.url.startsWith('https://')) {
      return { field: 'images[].url', value: image, valid: false, message: 'Image URL must start with http:// or https://' };
    }
  }
  return { field: 'images', value: images, valid: true };
}

export function validateProductSpecifications(specs: ProductSpecification[]): FieldValidation {
  if (!specs || !Array.isArray(specs)) {
    return { field: 'specifications', value: specs, valid: true };
  }
  for (const spec of specs) {
    if (!spec.name || typeof spec.name !== 'string') {
      return { field: 'specifications[].name', value: spec, valid: false, message: 'Each specification must have a name' };
    }
    if (spec.value === undefined || spec.value === null) {
      return { field: 'specifications[].value', value: spec, valid: false, message: 'Each specification must have a value' };
    }
  }
  return { field: 'specifications', value: specs, valid: true };
}

export function validateCompleteProductInput(input: ProductInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const nameValidation = validateProductName(input.name);
  if (!nameValidation.valid) errors.push(nameValidation.message!);

  const priceValidation = validateProductPrice(input.price);
  if (!priceValidation.valid) errors.push(priceValidation.message!);

  const stockValidation = validateProductStock(input.stock);
  if (!stockValidation.valid) errors.push(stockValidation.message!);

  const categoryValidation = validateProductCategory(input.category);
  if (!categoryValidation.valid) errors.push(categoryValidation.message!);

  const imagesValidation = validateProductImages(input.images || []);
  if (!imagesValidation.valid) errors.push(imagesValidation.message!);

  const specsValidation = validateProductSpecifications(input.specifications || []);
  if (!specsValidation.valid) errors.push(specsValidation.message!);

  if (input.description && input.description.length > 2000) {
    warnings.push('Description is very long, consider shortening it');
  }

  if (input.images && input.images.length === 0) {
    warnings.push('Product has no images, this may affect conversion');
  }

  if (input.price && input.price.compareAtPrice && input.price.compareAtPrice <= input.price.amount) {
    warnings.push('Compare-at price should be higher than regular price for discount display');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validatePartialProductUpdate(product: Partial<Product>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (product.name !== undefined) {
    const nameValidation = validateProductName(product.name);
    if (!nameValidation.valid) errors.push(nameValidation.message!);
  }

  if (product.price !== undefined) {
    const priceValidation = validateProductPrice(product.price);
    if (!priceValidation.valid) errors.push(priceValidation.message!);
  }

  if (product.stock !== undefined) {
    const stockValidation = validateProductStock(product.stock);
    if (!stockValidation.valid) errors.push(stockValidation.message!);
  }

  if (product.category !== undefined) {
    const categoryValidation = validateProductCategory(product.category);
    if (!categoryValidation.valid) errors.push(categoryValidation.message!);
  }

  if (product.images !== undefined) {
    const imagesValidation = validateProductImages(product.images);
    if (!imagesValidation.valid) errors.push(imagesValidation.message!);
  }

  if (product.specifications !== undefined) {
    const specsValidation = validateProductSpecifications(product.specifications);
    if (!specsValidation.valid) errors.push(specsValidation.message!);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function sanitizeStringInput(input: string, maxLength?: number): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  let sanitized = input.trim().replace(/<[^>]*>/g, '');
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrlFormat(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}