import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'app/services/data-storage.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  products = [];

  constructor(private dataservice: DataStorageService) { }

  ngOnInit() {
    this.dataservice.getAllUserProducts().subscribe(products => {
      this.products = products;
    })
  }

}
