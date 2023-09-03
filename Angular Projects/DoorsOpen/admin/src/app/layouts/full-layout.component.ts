import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
// import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public date;


  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      positionClass: 'toast-top-right',
      animation: 'fade',
      tapToDismiss: true,
      timeout: 2000,
      showCloseButton: true
    });

  constructor(
    public toasterService: ToasterService
  ) {
    this.toasterService = toasterService;
    this.date = new Date();
  }

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void { }

  doLogout() {
    localStorage.removeItem('adminDetails');
  }
}
