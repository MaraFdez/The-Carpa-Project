import { DetailsUpdateService } from './../../../services/details-update/details-update.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {

  catalogElementId : number = 0;

  constructor(
    private detailsUpdateService : DetailsUpdateService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.downloadFile();
  }

  downloadFile() {
    this.catalogElementId = this.route.snapshot.params['id'];
    this.detailsUpdateService.getElementDetails(this.catalogElementId).subscribe(data => {
      window.open('http://localhost:8000/file/' + data.fileId);
    });
  }

}
