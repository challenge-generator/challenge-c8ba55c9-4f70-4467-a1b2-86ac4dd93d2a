# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `react/services/ProductService.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/services/ProductService.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/services/ProductService.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/services/ProductService.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/services/ProductService.ts` — `Product.forEach`: Se invoca `forEach` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `react/utils/validation.ts` — `ProductInput.trim`: Se invoca `trim` sobre `ProductInput`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npx tsc --noEmit
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad eCommerce, Tecnología Vtex, Advanced

### Brecha de conocimiento
Aplicando conscientemente conceptos de diferentes principios de código limpio basados en YAGNI, DRY, SOLID y KISS. El estudiante refactorizará y optimizará código existente en un proyecto eCommerce, identificando violaciones de estos principios y aplicando soluciones profesionales.

### Misión / candidato
Candidato con experiencia avanzada en desarrollo frontend, trabajando en plataformas eCommerce complejas con arquitecturas escalables.

### Reto
- Tema: Principios de código limpio
- Seniority: advanced-l2
- Tipo: practical
- Título: Refactorización de código en eCommerce basado en principios de código limpio
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Identificación de violaciones — objetivo: Detectar violaciones de los principios de código limpio en el código existente. — entregable (NO resolver): Reporte de violaciones de principios de código limpio.
- Fase 2: Aplicación de soluciones — objetivo: Aplicar soluciones profesionales para corregir las violaciones identificadas. — entregable (NO resolver): Código refactorizado con soluciones aplicadas para las violaciones de principios de código limpio.
- Fase 3: Optimización y revisión — objetivo: Optimizar el código refactorizado y realizar una revisión final. — entregable (NO resolver): Código optimizado y revisado que cumple con los principios de código limpio.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["react/*"],
      "styles/*": ["styles/*"],
      "store/*": ["store/*"]
    },
    "types": ["vtex.types", "node"],
    "noEmit": true
  },
  "include": [
    "react/**/*",
    "store/**/*",
    "styles/**/*",
    "manifest.json"
  ],
  "exclude": [
    "node_modules",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}

// === ARCHIVO: manifest.json ===
{
  "vendor": "vtex",
  "name": "product-refactor",
  "version": "1.0.0",
  "builders": {
    "react": "4.x",
    "styles": "2.x",
    "store": "4.x"
  },
  "scripts": {
    "lint": "vtex lint",
    "build": "vtex build",
    "prepublish": "vtex publish --verbose"
  },
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "api.vtex.com",
        "path": "/vtex/*"
      }
    },
    {
      "name": "outbound-access",
      "attrs": {
        "host": "portal.vtexcommercestaged.com",
        "path": "/api/*"
      }
    }
  ],
  "dependencies": {
    "vtex.store-components": "3.x",
    "vtex.styleguide": "9.x",
    "@vtex/api": "1.x"
  },
  "peerDependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}

// === ARCHIVO: react/models/Product.ts ===
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

// === ARCHIVO: store/interfaces.json ===
{
  "product-summary": {
    "component": "ProductSummary",
    "composition": "wrap",
    "render": "client",
    "allowed": [
      "product-summary-name",
      "product-summary-price",
      "product-summary-image",
      "product-summary-add-to-cart",
      "product-summary-buy-button",
      "product-summary-specifications",
      "product-summary-short-description"
    ],
    "required": [
      "product-summary-name",
      "product-summary-price",
      "product-summary-image"
    ],
    "around": [
      "product-summary-wrapper"
    ],
    "around_1": [
      "product-summary-container"
    ],
    "schema": {
      "type": "object",
      "properties": {
        "showName": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar nombre del producto"
        },
        "showPrice": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar precio"
        },
        "showImage": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar imagen"
        },
        "showAddToCart": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar botón agregar al carrito"
        },
        "showBuyButton": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar botón comprar ahora"
        },
        "showSpecifications": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar especificaciones"
        },
        "showShortDescription": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar descripción corta"
        },
        "nameLabel": {
          "type": "string",
          "default": "",
          "title": "Etiqueta personalizada para el nombre"
        },
        "priceContainerClass": {
          "type": "string",
          "default": "",
          "title": "Clase CSS adicional para el contenedor de precio"
        },
        "imageContainerClass": {
          "type": "string",
          "default": "",
          "title": "Clase CSS adicional para el contenedor de imagen"
        },
        "displayMode": {
          "type": "string",
          "enum": [
            "horizontal",
            "vertical",
            "grid"
          ],
          "default": "vertical",
          "title": "Modo de visualización"
        },
        "showBadge": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar insignia de descuento"
        },
        "badgeText": {
          "type": "string",
          "default": "OFF",
          "title": "Texto de la insignia"
        },
        "badgeColor": {
          "type": "string",
          "default": "#ff0000",
          "title": "Color de la insignia"
        },
        "showStock": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar disponibilidad de stock"
        },
        "lowStockThreshold": {
          "type": "number",
          "default": 10,
          "title": "Umbral de stock bajo"
        },
        "showInstallments": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar información de cuotas"
        },
        "installmentsColor": {
          "type": "string",
          "default": "#666666",
          "title": "Color del texto de cuotas"
        },
        "hoverImageEnabled": {
          "type": "boolean",
          "default": false,
          "title": "Habilitar cambio de imagen al pasar el cursor"
        }
      }
    }
  },
  "product-details": {
    "component": "ProductDetails",
    "composition": "wrap",
    "render": "client",
    "allowed": [
      "product-name",
      "product-price",
      "product-images",
      "product-description",
      "product-specifications",
      "product-reviews",
      "product-availability",
      "product-quantity",
      "add-to-cart-button",
      "buy-button",
      "share-button",
      "shipping-calculator",
      "product-attachments"
    ],
    "required": [
      "product-name",
      "product-price",
      "product-images",
      "add-to-cart-button"
    ],
    "before": [
      "product-details-header"
    ],
    "after": [
      "product-details-footer"
    ],
    "around": [
      "product-details-wrapper"
    ],
    "schema": {
      "type": "object",
      "properties": {
        "showName": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar nombre del producto"
        },
        "showPrice": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar precio"
        },
        "showDescription": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar descripción"
        },
        "descriptionType": {
          "type": "string",
          "enum": [
            "full",
            "short",
            "html"
          ],
          "default": "full",
          "title": "Tipo de descripción a mostrar"
        },
        "showImages": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar galería de imágenes"
        },
        "imagesType": {
          "type": "string",
          "enum": [
            "carousel",
            "thumbnails",
            "zoom"
          ],
          "default": "carousel",
          "title": "Tipo de galería de imágenes"
        },
        "showSpecifications": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar especificaciones técnicas"
        },
        "specificationsPosition": {
          "type": "string",
          "enum": [
            "above",
            "below",
            "tab"
          ],
          "default": "tab",
          "title": "Posición de las especificaciones"
        },
        "showReviews": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar reseñas"
        },
        "showAvailability": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar disponibilidad"
        },
        "showQuantity": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar selector de cantidad"
        },
        "minQuantity": {
          "type": "number",
          "default": 1,
          "title": "Cantidad mínima seleccionable"
        },
        "maxQuantity": {
          "type": "number",
          "default": 10,
          "title": "Cantidad máxima seleccionable"
        },
        "showAddToCart": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar botón agregar al carrito"
        },
        "showBuyButton": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar botón comprar ahora"
        },
        "showShareButton": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar botón compartir"
        },
        "showShippingCalculator": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar calculadora de envío"
        },
        "showAttachments": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar adjuntos del producto"
        },
        "showInstallments": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar información de cuotas"
        },
        "installmentsCount": {
          "type": "number",
          "default": 10,
          "title": "Cantidad máxima de cuotas a mostrar"
        },
        "showDiscount": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar porcentaje de descuento"
        },
        "showSKU": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar SKU"
        },
        "showBrand": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar marca"
        },
        "showCollections": {
          "type": "boolean",
          "default": false,
          "title": "Mostrar colecciones"
        },
        "galleryArrowPosition": {
          "type": "string",
          "enum": [
            "inside",
            "outside",
            "none"
          ],
          "default": "inside",
          "title": "Posición de las flechas de galería"
        },
        "galleryZoomFactor": {
          "type": "number",
          "default": 2,
          "title": "Factor de zoom de imagen"
        },
        "priceContainerClass": {
          "type": "string",
          "default": "",
          "title": "Clase CSS adicional para el contenedor de precio"
        },
        "nameContainerClass": {
          "type": "string",
          "default": "",
          "title": "Clase CSS adicional para el contenedor de nombre"
        },
        "descriptionContainerClass": {
          "type": "string",
          "default": "",
          "title": "Clase CSS adicional para el contenedor de descripción"
        },
        "tabbedDescription": {
          "type": "boolean",
          "default": true,
          "title": "Usar pestañas para descripción y especificaciones"
        },
        "descriptionTabLabel": {
          "type": "string",
          "default": "Descripción",
          "title": "Etiqueta de pestaña de descripción"
        },
        "specificationsTabLabel": {
          "type": "string",
          "default": "Especificaciones",
          "title": "Etiqueta de pestaña de especificaciones"
        },
        "reviewsTabLabel": {
          "type": "string",
          "default": "Reseñas",
          "title": "Etiqueta de pestaña de reseñas"
        },
        "customNameTag": {
          "type": "string",
          "default": "h1",
          "title": "Etiqueta HTML para el nombre"
        },
        "priceHighlight": {
          "type": "boolean",
          "default": false,
          "title": "Resaltar el precio"
        },
        "highlightColor": {
          "type": "string",
          "default": "#ff0000",
          "title": "Color de resaltado"
        },
        "showStockManagement": {
          "type": "boolean",
          "default": true,
          "title": "Mostrar gestión de stock"
        },
        "lowStockMessage": {
          "type": "string",
          "default": "¡Últimas unidades!",
          "title": "Mensaje de stock bajo"
        },
        "outOfStockMessage": {
          "type": "string",
          "default": "Agotado",
          "title": "Mensaje de agotado"
        }
      }
    }
  },
  "product-summary-name": {
    "component": "ProductSummaryName",
    "render": "client"
  },
  "product-summary-price": {
    "component": "ProductSummaryPrice",
    "render": "client"
  },
  "product-summary-image": {
    "component": "ProductSummaryImage",
    "render": "client"
  },
  "product-summary-add-to-cart": {
    "component": "ProductSummaryAddToCart",
    "render": "client"
  },
  "product-summary-buy-button": {
    "component": "ProductSummaryBuyButton",
    "render": "client"
  },
  "product-summary-specifications": {
    "component": "ProductSummarySpecifications",
    "render": "client"
  },
  "product-summary-short-description": {
    "component": "ProductSummaryShortDescription",
    "render": "client"
  },
  "product-summary-wrapper": {
    "component": "ProductSummaryWrapper",
    "render": "client"
  },
  "product-summary-container": {
    "component": "ProductSummaryContainer",
    "render": "client"
  },
  "product-name": {
    "component": "ProductName",
    "render": "client"
  },
  "product-price": {
    "component": "ProductPrice",
    "render": "client"
  },
  "product-images": {
    "component": "ProductImages",
    "render": "client"
  },
  "product-description": {
    "component": "ProductDescription",
    "render": "client"
  },
  "product-specifications": {
    "component": "ProductSpecifications",
    "render": "client"
  },
  "product-reviews": {
    "component": "ProductReviews",
    "render": "client"
  },
  "product-availability": {
    "component": "ProductAvailability",
    "render": "client"
  },
  "product-quantity": {
    "component": "ProductQuantity",
    "render": "client"
  },
  "add-to-cart-button": {
    "component": "AddToCartButton",
    "render": "client"
  },
  "buy-button": {
    "component": "BuyButton",
    "render": "client"
  },
  "share-button": {
    "component": "ShareButton",
    "render": "client"
  },
  "shipping-calculator": {
    "component": "ShippingCalculator",
    "render": "client"
  },
  "product-attachments": {
    "component": "ProductAttachments",
    "render": "client"
  },
  "product-details-header": {
    "component": "ProductDetailsHeader",
    "render": "client"
  },
  "product-details-footer": {
    "component": "ProductDetailsFooter",
    "render": "client"
  },
  "product-details-wrapper": {
    "component": "ProductDetailsWrapper",
    "render": "client"
  }
}

// === ARCHIVO: store/blocks/product-summary.json ===
{
  "product-summary": {
    "children": [
      "product-summary-wrapper",
      "product-summary-container",
      "product-summary-image",
      "product-summary-name",
      "product-summary-price",
      "product-summary-short-description",
      "product-summary-specifications",
      "product-summary-add-to-cart",
      "product-summary-buy-button"
    ],
    "props": {
      "showName": true,
      "showPrice": true,
      "showImage": true,
      "showAddToCart": true,
      "showBuyButton": false,
      "showSpecifications": false,
      "showShortDescription": false,
      "displayMode": "vertical",
      "showBadge": false,
      "showStock": false,
      "showInstallments": true,
      "hoverImageEnabled": false,
      "lowStockThreshold": 10,
      "badgeText": "OFF",
      "badgeColor": "#ff0000",
      "installmentsColor": "#666666"
    }
  },
  "product-summary-wrapper": {
    "children": [
      "product-summary-container"
    ],
    "props": {
      "wrapWhole": false,
      "className": "product-summary-wrapper-container"
    }
  },
  "product-summary-container": {
    "children": [
      "flex-layout.row#product-summary-main",
      "flex-layout.row#product-summary-secondary"
    ],
    "props": {
      "blockClass": "product-summary-container",
      "preserveLayoutOnMobile": true,
      "fullWidth": false
    }
  },
  "flex-layout.row#product-summary-main": {
    "children": [
      "flex-layout.col#product-summary-image",
      "flex-layout.col#product-summary-info"
    ],
    "props": {
      "blockClass": "product-summary-main-row",
      "colGap": 3,
      "rowGap": 3,
      "marginBottom": 4,
      "marginTop": 4,
      "fullWidth": false
    }
  },
  "flex-layout.col#product-summary-image": {
    "children": [
      "product-summary-image"
    ],
    "props": {
      "blockClass": "product-summary-image-col",
      "width": "grow",
      "verticalAlign": "middle"
    }
  },
  "flex-layout.col#product-summary-info": {
    "children": [
      "flex-layout.row#product-summary-name",
      "flex-layout.row#product-summary-price",
      "flex-layout.row#product-summary-description"
    ],
    "props": {
      "blockClass": "product-summary-info-col",
      "width": "grow",
      "verticalAlign": "middle"
    }
  },
  "flex-layout.row#product-summary-name": {
    "children": [
      "product-summary-name"
    ],
    "props": {
      "blockClass": "product-summary-name-row",
      "marginBottom": 2
    }
  },
  "flex-layout.row#product-summary-price": {
    "children": [
      "product-summary-price"
    ],
    "props": {
      "blockClass": "product-summary-price-row",
      "marginBottom": 2
    }
  },
  "flex-layout.row#product-summary-description": {
    "children": [
      "product-summary-short-description"
    ],
    "props": {
      "blockClass": "product-summary-description-row",
      "marginBottom": 3,
      "show": "mobile-only"
    }
  },
  "flex-layout.row#product-summary-secondary": {
    "children": [
      "flex-layout.col#product-summary-actions"
    ],
    "props": {
      "blockClass": "product-summary-secondary-row",
      "marginTop": 3
    }
  },
  "flex-layout.col#product-summary-actions": {
    "children": [
      "product-summary-add-to-cart",
      "product-summary-buy-button"
    ],
    "props": {
      "blockClass": "product-summary-actions-col",
      "horizontalAlign": "center",
      "verticalAlign": "middle"
    }
  },
  "product-summary-image": {
    "props": {
      "showBadge": true,
      "badgeText": "OFF",
      "badgeColor": "#ff0000",
      "aspectRatio": {
        "desktop": "auto",
        "mobile": "auto"
      },
      "maxHeight": 300,
      "sizes": [
        {
          "image": "$",
          "size": "40vw",
          "media": "(max-width: 768px)"
        },
        {
          "image": "$",
          "size": "20vw"
        }
      ],
      "hoverImageEnabled": false,
      "placeholder": "assets/placeholder@2x.png",
      "alt": "$",
      "className": "product-summary-image-element"
    }
  },
  "product-summary-name": {
    "props": {
      "showBrandName": false,
      "showSku": false,
      "tag": "h2",
      "className": "product-summary-name-element",
      "textAlign": "left",
      "fontScale": 1.2
    }
  },
  "product-summary-price": {
    "props": {
      "showListPrice": true,
      "showSellingPrice": true,
      "showInstallments": true,
      "showDiscountPercentage": true,
      "showLabels": false,
      "showSavings": true,
      "savingsMode": "percentage",
      "sellingPriceLabel": "$",
      "listPriceLabel": "$",
      "installmentsLabel": "ou $",
      "className": "product-summary-price-element",
      "containerClass": "price-container"
    }
  },
  "product-summary-short-description": {
    "props": {
      "show": true,
      "maxLength": 150,
      "className": "product-summary-short-description-element"
    }
  },
  "product-summary-specifications": {
    "props": {
      "show": false,
      "specifications": [
        {
          "name": "Marca",
          "specificationGroup": "Technical"
        },
        {
          "name": "Modelo",
          "specificationGroup": "Technical"
        }
      ],
      "className": "product-summary-specifications-element"
    }
  },
  "product-summary-add-to-cart": {
    "props": {
      "showAddToCartButton": true,
      "showToast": true,
      "customPixelEventId": "add-to-cart-pixel",
      "customPixelEventName": "addToCart",
      "onAddToCartFailed": "ALERT",
      "addToCartButtonProps": {
        "customClass": "product-summary-add-to-cart-button",
        "size": "regular",
        "align": "center"
      },
      "text": "Agregar al carrito",
      "loading": false
    }
  },
  "product-summary-buy-button": {
    "props": {
      "displayMode": "buy-button",
      "customClass": "product-summary-buy-button-element",
      "alignment": "center",
      "isOnClickCallToAction": false,
      "text": "Comprar ahora"
    }
  }
}

// === ARCHIVO: store/blocks/product-details.json ===
{
  "product-details": {
    "children": [
      "product-details-header",
      "flex-layout.row#product-details-main",
      "product-details-footer"
    ],
    "props": {
      "showName": true,
      "showPrice": true,
      "showDescription": true,
      "descriptionType": "full",
      "showImages": true,
      "imagesType": "carousel",
      "showSpecifications": true,
      "specificationsPosition": "tab",
      "showReviews": true,
      "showAvailability": true,
      "showQuantity": true,
      "minQuantity": 1,
      "maxQuantity": 10,
      "showAddToCart": true,
      "showBuyButton": true,
      "showShareButton": true,
      "showShippingCalculator": true,
      "showAttachments": false,
      "showInstallments": true,
      "installmentsCount": 10,
      "showDiscount": true,
      "showSKU": true,
      "showBrand": true,
      "showCollections": false,
      "galleryArrowPosition": "inside",
      "galleryZoomFactor": 2,
      "tabbedDescription": true,
      "descriptionTabLabel": "Descripción",
      "specificationsTabLabel": "Especificaciones",
      "reviewsTabLabel": "Reseñas",
      "customNameTag": "h1",
      "priceHighlight": false,
      "highlightColor": "#ff0000",
      "showStockManagement": true,
      "lowStockMessage": "¡Últimas unidades!",
      "outOfStockMessage": "Agotado"
    }
  },
  "product-details-header": {
    "children": [
      "flex-layout.row#product-details-header"
    ],
    "props": {
      "blockClass": "product-details-header",
      "fullWidth": true,
      "marginBottom": 5
    }
  },
  "flex-layout.row#product-details-header": {
    "children": [
      "flex-layout.col#product-details-breadcrumb"
    ],
    "props": {
      "blockClass": "product-details-header-row",
      "colGap": 0,
      "marginTop": 6
    }
  },
  "flex-layout.col#product-details-breadcrumb": {
    "children": [
      "breadcrumb.search"
    ],
    "props": {
      "blockClass": "product-details-breadcrumb-col",
      "width": "100%"
    }
  },
  "flex-layout.row#product-details-main": {
    "children": [
      "flex-layout.col#product-details-gallery",
      "flex-layout.col#product-details-info"
    ],
    "props": {
      "blockClass": "product-details-main-row",
      "colGap": 7,
      "rowGap": 7,
      "marginBottom": 9,
      "fullWidth": false
    }
  },
  "flex-layout.col#product-details-gallery": {
    "children": [
      "product-images"
    ],
    "props": {
      "blockClass": "product-details-gallery-col",
      "width": "50%",
      "verticalAlign": "top"
    }
  },
  "flex-layout.col#product-details-info": {
    "children": [
      "flex-layout.row#product-details-name",
      "flex-layout.row#product-details-price",
      "flex-layout.row#product-details-sku-brand",
      "flex-layout.row#product-details-availability",
      "flex-layout.row#product-details-quantity",
      "flex-layout.row#product-details-actions",
      "flex-layout.row#product-details-installments",
      "flex-layout.row#product-details-shipping",
      "flex-layout.row#product-details-tabs"
    ],
    "props": {
      "blockClass": "product-details-info-col",
      "width": "50%",
      "verticalAlign": "top"
    }
  },
  "flex-layout.row#product-details-name": {
    "children": [
      "product-name"
    ],
    "props": {
      "blockClass": "product-details-name-row",
      "marginBottom": 3
    }
  },
  "flex-layout.row#product-details-price": {
    "children": [
      "product-price"
    ],
    "props": {
      "blockClass": "product-details-price-row",
      "marginBottom": 4
    }
  },
  "flex-layout.row#product-details-sku-brand": {
    "children": [
      "flex-layout.col#product-details-sku",
      "flex-layout.col#product-details-brand"
    ],
    "props": {
      "blockClass": "product-details-sku-brand-row",
      "colGap": 4,
      "marginBottom": 3
    }
  },
  "flex-layout.col#product-details-sku": {
    "children": [
      "product-identifier.product-details-sku"
    ],
    "props": {
      "blockClass": "product-details-sku-col",
      "width": "grow"
    }
  },
  "flex-layout.col#product-details-brand": {
    "children": [
      "product-brand#product-details"
    ],
    "props": {
      "blockClass": "product-details-brand-col",
      "width": "grow"
    }
  },
  "flex-layout.row#product-details-availability": {
    "children": [
      "product-availability"
    ],
    "props": {
      "blockClass": "product-details-availability-row",
      "marginBottom": 3
    }
  },
  "flex-layout.row#product-details-quantity": {
    "children": [
      "product-quantity"
    ],
    "props": {
      "blockClass": "product-details-quantity-row",
      "marginBottom": 3
    }
  },
  "flex-layout.row#product-details-actions": {
    "children": [
      "flex-layout.col#product-details-add-to-cart",
      "flex-layout.col#product-details-buy-button",
      "flex-layout.col#product-details-share"
    ],
    "props": {
      "blockClass": "product-details-actions-row",
      "colGap": 3,
      "marginBottom": 4
    }
  },
  "flex-layout.col#product-details-add-to-cart": {
    "children": [
      "add-to-cart-button"
    ],
    "props": {
      "blockClass": "product-details-add-to-cart-col",
      "width": "70%"
    }
  },
  "flex-layout.col#product-details-buy-button": {
    "children": [
      "buy-button"
    ],
    "props": {
      "blockClass": "product-details-buy-button-col",
      "width": "30%"
    }
  },
  "flex-layout.col#product-details-share": {
    "children": [
      "share-button"
    ],
    "props": {
      "blockClass": "product-details-share-col",
      "width": "auto"
    }
  },
  "flex-layout.row#product-details-installments": {
    "children": [
      "product-installments"
    ],
    "props": {
      "blockClass": "product-details-installments-row",
      "marginBottom": 3
    }
  },
  "flex-layout.row#product-details-shipping": {
    "children": [
      "shipping-calculator"
    ],
    "props": {
      "blockClass": "product-details-shipping-row",
      "marginBottom": 4
    }
  },
  "flex-layout.row#product-details-tabs": {
    "children": [
      "tab-layout#product-details"
    ],
    "props": {
      "blockClass": "product-details-tabs-row",
      "marginTop": 5
    }
  },
  "product-images": {
    "props": {
      "showThumbs": true,
      "showArrows": true,
      "showDots": false,
      "aspectRatio": {
        "desktop": "auto",
        "mobile": "1:1"
      },
      "maxHeight": 600,
      "thumbnailsOrientation": "horizontal",
      "zoomMode": "in-place",
      "zoomFactor": 2,
      "placeholder": "assets/placeholder@2x.png",
      "carouselProps": {
        "itemsPerPage": {
          "desktop": 1,
          "tablet": 1,
          "mobile": 1
        },
        "infinite": true,
        "usePagination": false,
        "step": 1
      }
    }
  },
  "product-name": {
    "props": {
      "showBrandName": true,
      "showSku": true,
      "showProductReference": false,
      "tag": "h1",
      "className": "product-details-name-element",
      "textAlign": "left",
      "fontScale": 1.4,
      "fontWeight": "bold"
    }
  },
  "product-price": {
    "props": {
      "showListPrice": true,
      "showSellingPrice": true,
      "showInstallments": true,
      "showDiscountPercentage": true,
      "showSavings": true,
      "savingsMode": "percentage",
      "showLabel": false,
      "sellingPriceLabel": "$",
      "listPriceLabel": "de: $",
      "installmentsLabel": "ou $",
      "className": "product-details-price-element",
      "containerClass": "product-details-price-container"
    }
  },
  "product-identifier.product-details-sku": {
    "props": {
      "identifier": "SKU"
    }
  },
  "product-brand#product-details": {
    "props": {
      "withLink": false,
      "fallbackToName": true
    }
  },
  "product-availability": {
    "props": {
      "showAvailability": true,
      "showQuantity": true,
      "lowStockThreshold": 10,
      "lowStockLabel": "¡Últimas unidades!",
      "outOfStockLabel": "Agotado",
      "inStockLabel": "Disponible"
    }
  },
  "product-quantity": {
    "props": {
      "showLabel": true,
      "value": 1,
      "minValue": 1,
      "maxValue": 10,
      "size": "regular",
      "selectorType": "stepper",
      "labelUnit": "un",
      "quantitySelectorStep": 1
    }
  },
  "add-to-cart-button": {
    "props": {
      "showAddToCartButton": true,
      "showToast": true,
      "customPixelEventId": "add-to-cart-detail-pixel",
      "customPixelEventName": "addToCart",
      "onAddToCartFailed": "ALERT",
      "addToCartButtonProps": {
        "customClass": "product-details-add-to-cart-button",
        "size": "large",
        "fullWidth": true,
        "align": "center"
      },
      "text": "Agregar al carrito",
      "loading": false
    }
  },
  "buy-button": {
    "props": {
      "displayMode": "buy-button",
      "customClass": "product-details-buy-button",
      "alignment": "center",
      "isOnClickCallToAction": false,
      "text": "Comprar ahora",
      "size": "large",
      "fullWidth": true
    }
  },
  "share-button": {
    "props": {
      "socialMedia": [
        "facebook",
        "twitter",
        "whatsapp",
        "pinterest"
      ],
      "message": "Mira este producto",
      "className": "product-details-share-button"
    }
  },
  "product-installments": {
    "props": {
      "installmentsToShow": 10,
      "showTitle": true,
      "title": "Opciones de pago",
      "titleText": "Opciones de pago"
    }
  },
  "shipping-calculator": {
    "props": {
      "showDeliveryDate": true,
      "showShippingEstimate": true,
      "usePostalCodeEndpoint": false,
      "placeholder": "Ingresa tu CEP",
      "label": "Calcular envío",
      "buttonLabel": "Calcular"
    }
  },
  "product-description": {
    "props": {
      "show": true,
      "collapseContent": false,
      "markdown": false
    }
  },
  "product-specifications": {
    "props": {
      "specificationGroupName": "Technical",
      "specifications": [
        {
          "name": "Marca",
          "specificationGroup": "Technical"
        },
        {
          "name": "Modelo",
          "specificationGroup": "Technical"
        },
        {
          "name": "Garantía",
          "specificationGroup": "Technical"
        }
      ],
      "useTab": false
    }
  },
  "product-reviews": {
    "props": {
      "show": true,
      "sortBy": "submissionTime",
      "allowAnonymous": true,
      "showReviewForm": true,
      "showReviewsRating": true,
      "displaySummary": true,
      "displayWriteReview": true
    }
  },
  "product-attachments": {
    "props": {
      "attachments": []
    }
  },
  "product-details-footer": {
    "children": [
      "flex-layout.row#product-details-related"
    ],
    "props": {
      "blockClass": "product-details-footer",
      "fullWidth": true,
      "marginTop": 9
    }
  },
  "flex-layout.row#product-details-related": {
    "children": [
      "recommendation.hints"
    ],
    "props": {
      "blockClass": "product-details-related-row"
    }
  },
  "tab-layout#product-details": {
    "children": [
      "tab-list#product-details",
      "tab-content#product-details-description",
      "tab-content#product-details-specs",
      "tab-content#product-details-reviews"
    ],
    "props": {
      "blockClass": "product-details-tabs"
    }
  },
  "tab-list#product-details": {
    "children": [
      "tab-list.item#description",
      "tab-list.item#specifications",
      "tab-list.item#reviews"
    ],
    "props": {
      "blockClass": "product-details-tab-list"
    }
  },
  "tab-list.item#description": {
    "props": {
      "tabId": "description",
      "label": "Descripción",
      "active": true
    }
  },
  "tab-list.item#specifications": {
    "props": {
      "tabId": "specifications",
      "label": "Especificaciones"
    }
  },
  "tab-list.item#reviews": {
    "props": {
      "tabId": "reviews",
      "label": "Reseñas"
    }
  },
  "tab-content#product-details-description": {
    "children": [
      "product-description"
    ],
    "props": {
      "tabId": "description",
      "blockClass": "product-details-description-content"
    }
  },
  "tab-content#product-details-specs": {
    "children": [
      "product-specifications"
    ],
    "props": {
      "tabId": "specifications",
      "blockClass": "product-details-specs-content"
    }
  },
  "tab-content#product-details-reviews": {
    "children": [
      "product-reviews"
    ],
    "props": {
      "tabId": "reviews",
      "blockClass": "product-details-reviews-content"
    }
  }
}

// === ARCHIVO: react/components/ProductSummary.tsx ===
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

// === ARCHIVO: react/components/ProductDetails.tsx ===
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

// === ARCHIVO: react/hooks/useProduct.ts ===
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

// === ARCHIVO: react/services/ProductService.ts ===
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

// === ARCHIVO: react/utils/validation.ts ===
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

// === ARCHIVO: styles/css/product.css ===
/* Product module styles using CSS Handles for VTEX IO */

.productContainer {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.productContainer:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.productImageWrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.productImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.productImageWrapper:hover .productImage {
  transform: scale(1.05);
}

.productBadge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background-color: #e74c3c;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
}

.productBadge--outOfStock {
  background-color: #95a5a6;
}

.productBadge--sale {
  background-color: #e67e22;
}

.productContent {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.productCategory {
  font-size: 11px;
  font-weight: 500;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.productName {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.productDescription {
  font-size: 13px;
  color: #7f8c8d;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.productPriceWrapper {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
}

.productPrice {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

.productPrice--onSale {
  color: #e74c3c;
}

.productComparePrice {
  font-size: 14px;
  color: #95a5a6;
  text-decoration: line-through;
}

.productStock {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #27ae60;
}

.productStock--low {
  color: #e67e22;
}

.productStock--outOfStock {
  color: #e74c3c;
}

.productStockIndicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #27ae60;
}

.productStockIndicator--low {
  background-color: #e67e22;
}

.productStockIndicator--outOfStock {
  background-color: #e74c3c;
}

.productActions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.productButton {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.productButton:active {
  transform: scale(0.98);
}

.productButton--primary {
  background-color: #2c3e50;
  color: #ffffff;
}

.productButton--primary:hover {
  background-color: #34495e;
}

.productButton--secondary {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.productButton--secondary:hover {
  background-color: #bdc3c7;
}

.productButton:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.6;
}

.productSpecifications {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #ecf0f1;
}

.productSpecificationItem {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
}

.productSpecificationLabel {
  color: #7f8c8d;
  font-weight: 500;
}

.productSpecificationValue {
  color: #2c3e50;
  font-weight: 600;
}

/* Grid layout for product listings */
.productGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 16px 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .productGrid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  .productContent {
    padding: 12px;
  }

  .productName {
    font-size: 14px;
  }

  .productPrice {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .productGrid {
    grid-template-columns: 1fr;
  }
}

// === ARCHIVO: README.md ===
# Tienda VTEX IO - Refactorización de Código Limpio

## Descripción del Proyecto

Este proyecto implementa un sistema de gestión de productos para una tienda eCommerce construida sobre VTEX IO Store Framework. El código base contiene implementaciones funcionales con violaciones intencionales de principios de código limpio que el participante debe identificar y corregir como parte del reto de refactorización.

## Requisitos Previos

- Node.js versión 18.x o superior
- npm versión 9.x o superior
- VTEX Toolbelt instalado globalmente (`npm install -g vtex-toolbelt`)
- Cuenta de VTEX con acceso al workspace de desarrollo

## Instalación

```bash
npm install
```

## Estructura del Proyecto

```
├── manifest.json              # Manifiesto de la app VTEX IO
├── store/
│   ├── interfaces.json       # Definición de interfaces de bloques
│   └── blocks/               # Composiciones de bloques
│       ├── product-summary.json
│       └── product-details.json
├── react/
│   ├── components/           # Componentes React
│   │   ├── ProductSummary.tsx
│   │   └── ProductDetails.tsx
│   ├── hooks/                # Hooks personalizados
│   │   └── useProduct.ts
│   ├── models/               # Modelos de datos TypeScript
│   │   └── Product.ts
│   ├── services/             # Servicios de lógica de negocio
│   │   └── ProductService.ts
│   └── utils/                # Utilidades
│       └── validation.ts
├── store/                    # Configuración de la tienda
└── styles/                   # Estilos CSS
    └── css/
        └── product.css
```

## Comandos Disponibles

### Desarrollo Local

```bash
vtex link
```
Este comando vincula la aplicación al workspace de VTEX y permite ver los cambios en tiempo real.

### Verificación de Tipos

```bash
npx tsc --noEmit
```
Verifica que el código TypeScript no tenga errores de tipos sin generar archivos de compilación.

### Building

```bash
vtex build
```
Construye la aplicación para producción.

## Guía de Refactorización

### Enfoque del Reto

Este proyecto está diseñado para practicar la identificación y corrección de violaciones a los principios de código limpio. El código existente funciona correctamente desde el punto de vista funcional, pero contiene decisiones de diseño que pueden optimizarse aplicando los siguientes principios:

- **YAGNI (You Aren't Gonna Need It)**: Eliminar funcionalidad que no es necesaria actualmente.
- **DRY (Don't Repeat Yourself)**: Evitar duplicación de código extrayendo lógica común.
- **SOLID**: Aplicar los cinco principios de diseño orientado a objetos.
- **KISS (Keep It Simple, Stupid)**: Preferir soluciones simples sobre complejas.

### Metodología de Trabajo

1. **Fase 1 - Identificación**: Recorrer los archivos del proyecto identificando patrones que violan los principios de código limpio.

2. **Fase 2 - Análisis**: Documentar cada violación encontrada con el principio violado y el impacto potencial.

3. **Fase 3 - Refactorización**: Aplicar las correcciones necesarias sin alterar el comportamiento funcional.

### Archivos Clave para Revisión

Los siguientes archivos contienen la lógica principal del dominio y son el foco principal de la refactorización:

- `react/components/ProductSummary.tsx`: Componente de presentación para resumen de producto
- `react/components/ProductDetails.tsx`: Componente de presentación para detalles completos
- `react/hooks/useProduct.ts`: Hook personalizado para gestión de estado de producto
- `react/services/ProductService.ts`: Servicio de operaciones CRUD
- `react/utils/validation.ts`: Utilidades de validación
- `react/models/Product.ts`: Definiciones de tipos e interfaces

### Convenciones de Código

El proyecto sigue estas convenciones que deben respetaarse durante la refactorización:

- Componentes declarados como funciones de React
- Separación entre componentes contenedores (lógica) y presentacionales (UI)
- Modelos de datos tipados con TypeScript
- Servicios dedicados para operaciones de negocio
- CSS Handles para estilos modulares
- Hooks personalizados para lógica reutilizable

### Validación de Cambios

Después de cada refactorización, verificar que:

1. La aplicación sigue compilando sin errores de TypeScript
2. Los bloques de la tienda siguen renderizando correctamente
3. La funcionalidad original se mantiene intacta
4. No se introducen nuevos warnings o errores de lint

## Recursos Adicionales

- [Documentación oficial de VTEX IO](https://developers.vtex.com/vtex-developer-docs/docs)
- [Guía de VTEX Store Framework](https://developers.vtex.com/vtex-developer-docs/docs/vtex-store-documentation)
- [Documentación de React](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Soporte

Para dudas sobre el setup o la estructura del proyecto, consulta la documentación oficial de VTEX IO referenced above.
```
