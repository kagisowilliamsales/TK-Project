import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { DataStorageService } from 'app/services/data-storage.service';
import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @ViewChild('btnClose') btnClose: ElementRef;
  product = null;
  url = null;

  productId: string;


  imageObject = null;
  thumbnailObject = null;
  bigImageObject = null;
  editMode = false;

  productForm:  FormGroup;

  constructor(private route: ActivatedRoute, private userservice: UserService, private dataservice: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }


  private initForm() {
    let productName = '';
    let productDescription = '';
    let productPrice = 0;
    let productWidth = 0;
    let productHeight = 0;
    let productStockQuantity = 1;
    let productCategory = '';
    let productdisplayImageUrl = '';
    let productotherViewImageUrl = '';

    if (this.editMode) {
      this.dataservice.getProduct(this.productId).subscribe(data => {
        productName = data.name,
        productDescription = data.description,
        productPrice = data.price
      });
    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      height: new FormControl(productHeight, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      width: new FormControl(productWidth, Validators.required),
      stockQuantity: new FormControl(productStockQuantity, Validators.required),
      catrgory: new FormControl(productCategory, Validators.required),
      displayImageUrl: new FormControl(''),
      displayImageObject: new FormControl(null),
      otherViewImageUrl:  new FormControl(''), 
      otherViewImageObject: new FormControl(null),
      RelatedComponents: new FormArray([])
    });

    if (productName.length !== 0) {
      this.dataservice.getRelatedComponents(productName).subscribe(data => {
        let count = 0;
        for (const p of data) {
          this.onAddComponent(p.components[count].name, p.components[count].requiredComponentsQuantity, p.pictures[0].displayImageUrl, p.pictures[0].otherViewImageUrl);
          count++;
        }
      })
    }
  }

  addRelatedComponent() {
    this.onAddComponent(null, null, null, null);
  }

  onAddComponent(componentName, rQuantity, imgUrl, bgUrl) {
    (<FormArray> this.productForm.get('RelatedComponents')).push(
      new FormGroup({
        componentName: new FormControl(componentName, Validators.required),
        requiredComponentsQuantity: new FormControl(rQuantity, Validators.required),
        
        //backImageUrl: new FormControl(thumbUrl),
        //thumbnailObject: new FormControl(null),
        
        //displayImageUrl: new FormControl(imgUrl),
        //imageObject: new FormControl(null),
        
        //otherViewImageUrl: new FormControl(bgUrl),
        //bigImageObject: new FormControl(null)
      })
    )
  }

  onSaveProduct(): void {
    if (this.productForm.valid) {
      console.log('ohkay form valid');
      if (!this.editMode) {
        // New
        console.log('sending request');
         this.dataservice.addProduct(this.productForm);
      } else {
        console.log('Not edit mode');
        // Update
        //this.dataservice.updateProduct(productform.value);
      }
    } else {
      console.log('Form not valid');
      console.log(this.productForm);
    }
    
  }

  uploadDisplayImage(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = event => {
        this.productForm.value.displayImageUrl = event.target.result;
        console.log("One " + this.productForm.value.displayImageUrl);
        //(<FormArray>this.productForm.get('RelatedComponents')).at(index).value.displayImageUrl = event.target.result;
        //this.productForm.get('productVariety') = event.target.result;
      }
      this.productForm.value.displayImageObject = e.target.files[0];
      console.log("two " +this.productForm.value.displayImageObject);
      //(<FormArray>this.productForm.get('RelatedComponents')).at(index).value.displayImageObject = e.target.files[0];
    }
  }

  /*uploadBackImage(e, index) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        (<FormArray>this.productForm.get('relatedProducts')).at(index).value.backImageUrl = event.target.result;
      }
      (<FormArray>this.productForm.get('relatedProducts')).at(index).value.backImageObject = e.target.files[0];
    }
  }*/

  uploadOtherViewImage(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        //(<FormArray>this.productForm.get('RelatedComponents')).at(index).value.otherViewImageUrl = event.target.result;
        this.productForm.value.otherViewImageUrl = event.target.result;
      }
     //(<FormArray>this.productForm.get('RelatedComponents')).at(index).value.otherViewImageObject = e.target.files[0];
      this.productForm.value.otherViewImageObject = e.target.files[0];
    }
  }

}
