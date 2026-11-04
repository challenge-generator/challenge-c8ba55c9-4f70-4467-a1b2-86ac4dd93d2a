import React from 'react';
import { Product, ProductPrice, ProductImage } from '../models/Product';
import { ProductValidator } from '../models/Product';

interface ProductSummaryProps {
  product: Product;
  showImage?: boolean;
  showStock?: boolean;
  onSelect?: (product: Product) => void;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({
  product,
  showImage = true,
  showStock = true,
  onSelect
}) => {
  const formattedPrice = ProductValidator.formatPrice(product.price);
  const discountPercentage = ProductValidator.calculateDiscountPercentage(product);
  const isOutOfStock = product.stock?.quantity === 0;
  const isLowStock = product.stock && product.stock.quantity > 0 && product.stock.quantity <= 5;

  const handleClick = () => {
    if (onSelect && !isOutOfStock) {
      onSelect(product);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const mainImage = product.images?.find((img: ProductImage) => img.isMain) || product.images?.[0];

  return (
    <div
      className={`product-summary ${isOutOfStock ? 'out-of-stock' : ''} ${isLowStock ? 'low-stock' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={false}
      data-testid="product-summary"
    >
      {showImage && mainImage && (
        <div className="product-summary__image-container">
          <img
            src={mainImage.url}
            alt={mainImage.alt || product.name}
            className="product-summary__image"
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <span className="product-summary__discount-badge">
              -{discountPercentage}%
            </span>
          )}
        </div>
      )}

      <div className="product-summary__content">
        <h3 className="product-summary__name">{product.name}</h3>
        
        {product.category && (
          <span className="product-summary__category">{product.category}</span>
        )}

        <div className="product-summary__price-section">
          {product.price?.originalPrice && product.price.originalPrice > product.price.sellingPrice && (
            <span className="product-summary__original-price">
              {ProductValidator.formatPrice({ ...product.price, sellingPrice: product.price.originalPrice })}
            </span>
          )}
          <span className="product-summary__price">{formattedPrice}</span>
        </div>

        {showStock && product.stock && (
          <div className={`product-summary__stock ${isOutOfStock ? 'stock-out' : isLowStock ? 'stock-low' : 'stock-available'}`}>
            {isOutOfStock ? (
              <span>Sin stock disponible</span>
            ) : isLowStock ? (
              <span>¡Últimas unidades! ({product.stock.quantity} disponibles)</span>
            ) : (
              <span>Stock disponible: {product.stock.quantity} unidades</span>
            )}
          </div>
        )}

        {product.specifications && product.specifications.length > 0 && (
          <ul className="product-summary__specs" aria-label="Especificaciones del producto">
            {product.specifications.slice(0, 3).map((spec, index) => (
              <li key={index} className="product-summary__spec-item">
                <span className="spec-name">{spec.name}:</span>
                <span className="spec-value">{spec.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className="product-summary__tags" aria-label="Etiquetas">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="product-summary__tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSummary;