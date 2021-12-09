import { ICatalogElement } from 'src/app/interfaces/catalog-element';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogElement } from 'src/app/model/catalog-element.model';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

  selectedCatalogElement! : CatalogElement;
  catalogElementId : number = 0;

  constructor(
    private warehouseService: WarehouseService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getElement();
  }

  getElement() : void {
      this.catalogElementId = this.route.snapshot.params['id'];

      this.warehouseService.getCatalogElement(this.catalogElementId).subscribe(result => {
        let catalogElement : CatalogElement = new CatalogElement(
          result.id,
          result.username,
          result.projectName,
          result.description,
          result.image,
          result.price,
          result.publicationDate,
          result.data
        )
        this.selectedCatalogElement = catalogElement;
      });

    }

}
