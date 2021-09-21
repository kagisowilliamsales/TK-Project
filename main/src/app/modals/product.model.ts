// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  id?: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  pictures?: string;
  dimensionH?: number;
  dimensionW?: number;
  shortDetails?: string;
  description?: string;
  stock?: number;
  newPro?: boolean;
  brand?: string;
  sale?: boolean;
  category?: string;
  tags?: ProductTags[];
  colors?: ProductColor[];
  
  ref?: string;

  constructor(
    id?: number,
    name?: string,
    price?: number,
    salePrice?: number,
    discount?: number,
    pictures?: string,
    shortDetails?: string,
    description?: string,
    stock?: number,
    newPro?: boolean,
    brand?: string,
    sale?: boolean,
    category?: string,
    tags?: ProductTags[],
    colors?: ProductColor[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.salePrice = salePrice;
    this.discount = discount;
    this.pictures = pictures;
    this.shortDetails = shortDetails;
    this.description = description;
    this.stock = stock;
    this.newPro = newPro;
    this.brand = brand;
    this.sale = sale;
    this.category = category;
    this.tags = tags;
    this.colors = colors;
  }

 }
  // Color Filter
  export interface ColorFilter {
    color?: ProductColor;
  }


  /**************************************************************************************/
  
export interface ProductInterface {
  id?: string;
  productid?: string;
  name?: string;
  ownerEmail?: string;
  description?: string;
  dimensionH?: number;
  dimensionW?: number;
  price?: number;
  salePrice?: number;
  ref?: string;

  availability?: string;

  StockQuantity?: string;
  /*mQuantity?: string;
  lQuantity?: string;
  xlQuantity?: string;*/
  components?: ProductComponent;


  category?: string;
  brand?: string;
  stock?: number;

  productPhoto?: ProductPhotos;
  uploadDate?: any;
  popularity?: number;
}

export interface ProductCategoryInterface {
  typeofproduct?: string;
  brand?: string;
  material?: string;
  color?: string;
  
}

export interface ProductComponent {
  name?: string;
  missingComponentsquantity?: number;
  requiredComponentsQuantity?: number;
}


export interface ProductPhotos {
  displayImageUrl?: any;
  otherViewImageUrl?: any;
  small?: any;
  big?: any;
  
  
  /*displayImageUrl?: any; // 250 X 300
  backImageUrl?: any; // 45 x 55
  otherViewImageUrl?: any; // 900 x 1024*/
}
