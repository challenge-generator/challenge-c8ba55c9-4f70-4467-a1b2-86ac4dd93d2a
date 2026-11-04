import React, { useState, useEffect, useCallback } from 'react';
import { Product, ProductInput, ProductFilter } from '../models/Product';
import { ProductValidator } from '../models/Product';
import { useProduct } from '../hooks/useProduct';

interface ProductDetailsProps {
  productId?: string;
  initialData?: Product;
  onSave?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  editable?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  initialData,
  onSave,
  onDelete,
  editable = true
}) => {
  const [isEditing, setIsEditing] = useState(!productId);
  const [formData, setFormData] = useState<Partial<ProductInput>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    product,
    loading,
    error,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError
  } = useProduct();

  useEffect(() => {
    if (productId && !initialData) {
      fetchProduct(productId);
    } else if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
        sku: initialData.sku,
        images: initialData.images,
        specifications: initialData.specifications,
        tags: initialData.tags,
        isActive: initialData.isActive
      });
    }
  }, [productId, initialData, fetchProduct]);

  const handleInputChange = useCallback((
    field: keyof ProductInput,
    value: string | number | boolean | ProductPrice | ProductStock | ProductImage[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  }, [validationErrors]);

  const validateForm = useCallback((): boolean => {
    if (!formData.name?.trim()) {
      setValidationErrors(['El nombre del producto es obligatorio']);
      return false;
    }
    if (!formData.price?.sellingPrice || formData.price.sellingPrice <= 0) {
      setValidationErrors(['El precio de venta es obligatorio y debe ser mayor a 0']);
      return false;
    }
    if (!formData.sku?.trim()) {
      setValidationErrors(['El SKU es obligatorio']);
      return false;
    }

    const errors = ProductValidator.validateProductInput(formData as ProductInput);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return false;
    }

    return true;
  }, [formData]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const productData: ProductInput = formData as ProductInput;
      
      if (productId && product) {
        const updated = await updateProduct(productId, productData);
        if (updated && onSave) {
          onSave(updated);
        }
      } else {
        const created = await createProduct(productData);
        if (created && onSave) {
          onSave(created);
        }
      }
      setIsEditing(false);
    } catch (err) {
      setValidationErrors([err instanceof Error ? err.message : 'Error al guardar el producto']);
    } finally {
      setIsSaving(false);
    }
  }, [validateForm, productId, product, formData, updateProduct, createProduct, onSave]);

  const handleDelete = useCallback(async () => {
    if (!productId || !window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      if (onDelete) {
        onDelete(productId);
      }
    } catch (err) {
      setValidationErrors([err instanceof Error ? err.message : 'Error al eliminar el producto']);
    } finally {
      setIsDeleting(false);
    }
  }, [productId, deleteProduct, onDelete]);

  const handleCancel = useCallback(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        sku: product.sku,
        images: product.images,
        specifications: product.specifications,
        tags: product.tags,
        isActive: product.isActive
      });
    }
    setIsEditing(false);
    setValidationErrors([]);
    clearError();
  }, [product, clearError]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  if (loading) {
    return (
      <div className="product-details__loading" aria-live="polite">
        <div className="spinner" role="status">
          <span>Cargando producto...</span>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="product-details__error" role="alert">
        <p>Error al cargar el producto: {error}</p>
        <button onClick={() => productId && fetchProduct(productId)}>
          Reintentar
        </button>
      </div>
    );
  }

  const currentProduct = product || initialData;

  return (
    <div className="product-details" data-testid="product-details">
      <header className="product-details__header">
        <h2>
          {isEditing ? (productId ? 'Editar Producto' : 'Nuevo Producto') : 'Detalles del Producto'}
        </h2>
        {!isEditing && editable && (
          <button onClick={handleEdit} className="btn-edit">
            Editar
          </button>
        )}
      </header>

      {validationErrors.length > 0 && (
        <div className="product-details__errors" role="alert" aria-live="assertive">
          <ul>
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="product-details__form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <fieldset className="product-details__field-group">
          <legend>Información básica</legend>
          
          <div className="form-field">
            <label htmlFor="product-name">Nombre del producto *</label>
            <input
              id="product-name"
              type="text"
              value={isEditing ? (formData.name ?? '') : (currentProduct?.name ?? '')}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              required
              aria-required="true"
            />
          </div>

          <div className="form-field">
            <label htmlFor="product-sku">SKU *</label>
            <input
              id="product-sku"
              type="text"
              value={isEditing ? (formData.sku ?? '') : (currentProduct?.sku ?? '')}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              disabled={!isEditing}
              required
              aria-required="true"
            />
          </div>

          <div className="form-field">
            <label htmlFor="product-description">Descripción</label>
            <textarea
              id="product-description"
              value={isEditing ? (formData.description ?? '') : (currentProduct?.description ?? '')}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditing}
              rows={4}
            />
          </div>

          <div className="form-field">
            <label htmlFor="product-category">Categoría</label>
            <input
              id="product-category"
              type="text"
              value={isEditing ? (formData.category ?? '') : (currentProduct?.category ?? '')}
              onChange={(e) => handleInputChange('category', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </fieldset>

        <fieldset className="product-details__field-group">
          <legend>Precio y Stock</legend>
          
          <div className="form-field">
            <label htmlFor="product-price">Precio de venta *</label>
            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              value={isEditing 
                ? (formData.price?.sellingPrice ?? '') 
                : (currentProduct?.price?.sellingPrice ?? '')
              }
              onChange={(e) => handleInputChange('price', {
                ...formData.price,
                sellingPrice: parseFloat(e.target.value)
              } as ProductPrice)}
              disabled={!isEditing}
              required
              aria-required="true"
            />
          </div>

          <div className="form-field">
            <label htmlFor="product-stock">Cantidad en stock</label>
            <input
              id="product-stock"
              type="number"
              min="0"
              step="1"
              value={isEditing 
                ? (formData.stock?.quantity ?? '') 
                : (currentProduct?.stock?.quantity ?? '')
              }
              onChange={(e) => handleInputChange('stock', {
                ...formData.stock,
                quantity: parseInt(e.target.value, 10)
              } as ProductStock)}
              disabled={!isEditing}
            />
          </div>
        </fieldset>

        {isEditing && (
          <div className="product-details__actions">
            <button
              type="submit"
              className="btn-save"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancelar
            </button>
            {productId && onDelete && (
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductDetails;