
export interface ProductInterface {
    id?: number;
    productid?: string;
    name?: string;
    ownerEmail?: string;
    description?: string;
    dimensionH?: number;
    dimensionW?: number;
    price?: number;
    salePrice?: number;
    ref?: string;
    discount?: number;
    sale?: boolean,

    availability?: string;

    //StockQuantity?: string;
    /*mQuantity?: string;
    lQuantity?: string;
    xlQuantity?: string;*/
    components?: ProductComponent[];


    category?: string;
    brand?: string;
    stock?: number;

    pictures?: ProductPhotos[];
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
    big?: any;
    otherViewImageUrl?: any;
    small?: any;
    
    
    /*displayImageUrl?: any; // 250 X 300
    backImageUrl?: any; // 45 x 55
    otherViewImageUrl?: any; // 900 x 1024*/
}


