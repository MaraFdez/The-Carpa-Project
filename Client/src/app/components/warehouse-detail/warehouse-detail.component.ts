import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IUserData } from 'src/app/interfaces/user-data';
import { UserService } from './../../services/user/user.service';
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
  userData! : IUserData;

  constructor(
    private warehouseService: WarehouseService, 
    private route: ActivatedRoute, 
    private router : Router,
    private userService : UserService,
    private authenticationService : AuthenticationService
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
        this.getUserDetails(result.username);
        this.selectedCatalogElement = catalogElement;
      });

    }

    getUserDetails(username : string) : void {
      this.userService.getUserDataByUsername(username).subscribe(data => {
        let userDetails : IUserData = {
          id : data.id,
          uid : data.uid,
          username : data.username,
          profileImage : data.profileImage,
          aboutMe : data.aboutMe,
          uploadedProjects : data.uploadedProjects
        }
        this.userData = userDetails;
      });
    }

    setUser() {
      return this.authenticationService.userData;
    }

    deleteItem(id : number) {
      if (confirm('Are you sure you want to remove this design permanently? :_(')) {
        this.warehouseService.deleteCatalogElement(id).subscribe();
        console.log('This design was deleted.');
        this.router.navigate(['/warehouse']).then(() => {
          window.location.reload();
        });
      } else {
        console.log('This design was not deleted.');
      }
    }
}
