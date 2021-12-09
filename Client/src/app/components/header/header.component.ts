import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  isHome() : boolean {
    if(/^\/$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

  isUpload() : boolean {
    if(/^\/upload$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

  isWarehouse() : boolean {
    if(/^\/warehouse$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

}

