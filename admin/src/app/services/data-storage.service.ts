import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductComponent, ProductInterface } from 'app/models/Product/product.'
import { map, finalize } from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { FormGroup, FormArray } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  public productTypes: string[] = ['T-Shirt', 'Dress'];
  public genderTypes: string[] = ['Male', 'Female', 'Neutral']
  public productMaterials: string[] = ['Cotton', 'Silk'];
  public productSizes: string[] = ['28', '32'];
  public colorTypes: string[] = ['Blue', 'Red'];

  private productsCollection: AngularFirestoreCollection<ProductInterface>;
  private products: Observable<ProductInterface[]>;
  private productDoc: AngularFirestoreDocument<ProductInterface>;
  private product: Observable<ProductInterface>;
  public selectedProduct: ProductInterface = {
    productid: null,
    ownerEmail: '',
    popularity: 0,
    ref: '',
    category: '',
    pictures: [{
      displayImageUrl: null,
      small: null,
      otherViewImageUrl: null,
      big: null,
    }],
    components: []
  }

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage,
              private userservice: UserService) {
  }

  getAllUserProducts() {
    this.productsCollection = this.firestore.collection<ProductInterface>('DistinctProducts', ref =>
                                  ref.where('ownerEmail', '==', this.userservice.newSeller.email))
    return this.products = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductInterface;
          data.productid = action.payload.doc.id;
          return data;
        })
      }))
  }

  getProduct(ProductId: string) {
    this.productDoc = this.firestore.doc<ProductInterface>(`Products/${ProductId}`);
    return this.product = this.productDoc.snapshotChanges().pipe(map(action => {
      if (!action.payload.exists) {
        return null;
      } else {
        const data = action.payload.data() as ProductInterface;
        data.productid = action.payload.id;
        return data;
      }
    }));
  }

  getRelatedComponents(ProductName: string) {
    this.productsCollection = this.firestore.collection<ProductInterface>('Products', ref =>
                                  ref.where('ownerEmail', '==', this.userservice.newSeller.email)
                                  .where('name', '==', ProductName))
    return this.products = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductInterface;
          data.productid = action.payload.doc.id;
          return data;
        })
      }))
  }

  private async pushImageUpload(ref, pushObject) {
    await ref.put(pushObject).then(a => {
      //here you can check the state of your upload
    });
  }

  async uploadDisplayImageToStorage(displayImageObject, otherViewImageObject) {
    // Uploading default Image
    let ref = this.storage.ref('images/' + displayImageObject.name + new Date());
    await this.pushImageUpload(ref, displayImageObject);
    ref.getDownloadURL().subscribe(downloadURL => {
      this.selectedProduct.pictures[0].displayImageUrl = downloadURL;
      this.selectedProduct.pictures[0].big = downloadURL;
    })

    /* Upload thumbnail
    ref = this.storage.ref('images/' + backImageObject.name + new Date());
    await this.pushImageUpload(ref, backImageObject);
    ref.getDownloadURL().subscribe(downloadURL => {
      this.selectedProduct.productPhoto.backImageUrl = downloadURL;
    })*/

    // Upload BigImage
    ref = this.storage.ref('images/' + otherViewImageObject.name + new Date());
    await this.pushImageUpload(ref, otherViewImageObject);
    ref.getDownloadURL().subscribe(downloadURL2 => {
      this.selectedProduct.pictures[0].otherViewImageUrl = downloadURL2;
      this.selectedProduct.pictures[0].small = downloadURL2;
    });
  }

  async addProduct(productForm: FormGroup) {

    /*
      In firestore we do not have distict key work to pull distict object
      In this case when we on thr products table, we want to display user products
      but not related products (.ie products with different colors). When the admin
      presses the product, it should then display those related products attached to
      the 'original' product. Thefore we gonna save distict products in a node of
      distinct, and its gonna be used to pull distict products
    */

    let bCopy = true;
    this.selectedProduct.id = this.getRandomInt(99850);
    this.selectedProduct.category = productForm.value.catrgory;
    this.selectedProduct.name = productForm.value.name;
    this.selectedProduct.price = productForm.value.price + (productForm.value.price * .20);
    this.selectedProduct.description = productForm.value.description;
    this.selectedProduct.sale = false;
    this.selectedProduct.dimensionH =  productForm.value.height;
    this.selectedProduct.dimensionW =  productForm.value.width;
    this.selectedProduct.stock =  1; //productForm.value.stockQuantity;
    
    //this.selectedProduct.category.typeofproduct = productForm.value.productCategory;
    this.selectedProduct.ref = this.getRandomString(5);
    this.selectedProduct.ownerEmail = this.userservice.newSeller.email;
    //this.selectedProduct.category.brand = this.userservice.newSeller.business.brand;
    
    let tempComponent: ProductComponent; 
    for (const c of (<FormArray>productForm.get('RelatedComponents')).controls) {
      tempComponent.name = c.value.componentName;
      tempComponent.requiredComponentsQuantity = c.value.requiredComponentsQuantity;
      tempComponent.missingComponentsquantity = 0;
      this.selectedProduct.components.push(tempComponent);
    }

    /*UPLOAD IMAGE TO STORAGE*/
    await this.uploadDisplayImageToStorage(productForm.value.displayImageObject, productForm.value.otherViewImageObject).then(a => {
      this.selectedProduct.uploadDate = firebase.database.ServerValue.TIMESTAMP;
      //this.selectedProduct.productid
      this.firestore.collection<ProductInterface>('DistinctProducts').add(this.selectedProduct).then(docRef => {
        // Create a copy then disable copies
        /*if (bCopy) {
          bCopy = false;
          this.firestore.collection<ProductInterface>('DistinctProducts').doc(docRef.id).set(this.selectedProduct);
        }*/
      }); 
    });
  }

  updateProduct(product: ProductInterface): void {
    const productid = product.productid;
    this.productDoc = this.firestore.doc<ProductInterface>(`Products/${productid}`);
    this.productDoc.update(product);
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
}
