import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlockService } from '../block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  title = "";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private router:Router, private breakpointObserver: BreakpointObserver, private bserv: BlockService) {
    this.bserv.Title.subscribe(t => {
      this.title = t;
    })

  }
  gotoParty(d){
    this.bserv.updatedParty(d)
    this.router.navigateByUrl("shipmentlist");
    return false;
  }
}
