import { CatalogElement } from 'src/app/model/catalog-element.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { ICatalogElement } from 'src/app/interfaces/catalog-element';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  catalogElements : ICatalogElement[] = [];

  page: number = 1;

  constructor(
   private warehouseService : WarehouseService
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.warehouseService.getAllCatalogElement().subscribe(data => {
      this.catalogElements = data;
    });    
  }

  nextPage():void{
    if(this.page < this.catalogElements.length/12){
      this.page = this.page +1;
    }
  }

  previousPage():void{
    if(this.page > 1){
      this.page = this.page -1;
    }
  }

}
