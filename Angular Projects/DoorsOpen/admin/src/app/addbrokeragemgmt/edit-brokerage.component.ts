import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddBrokeragemgmtService } from './addbrokeragemgmt.services';
// import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'edit-brokerage.component.html'
})
export class EditBrokerageTypeComponent implements OnInit {

  brokerageEditForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  type_id: any;
  getJobCategoryDetails: any;
  actions: any;
  AllBrokerage: any;

  constructor(
    // public customValidate: CustomValidation,
    public AddBrokeragemgmtService: AddBrokeragemgmtService,
    public router: Router,
    public route: ActivatedRoute,
    public toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type_id = params.type_id;
    })
    this.brokerageEditForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
    });

    this.viewBrokerageForm(this.type_id);

  }

  viewBrokerageForm(typeID: any) {
    this.AddBrokeragemgmtService.getBrokerage().subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.status == 200) {
          this.AllBrokerage = JSON.parse(JSON.stringify(res)).data;
          console.log(typeID);
          
          for (let brkr of this.AllBrokerage) {
            console.log(brkr);
            
            if (brkr.type_id == typeID) {
              this.brokerageEditForm.setValue({
                'name': brkr.name,
              })
            }
          }
        } else {
          this.AllBrokerage = [];
        }
      },
      error => {
        console.log('Something went wrong with fetching brokerage types.');
      }
    );
  }

  brokerageEditFormSubmit(): void {
    // this.toasterService.clear();
    this.submitted = true;
    // this.formdisable = true;
    if (this.brokerageEditForm.valid) {
      this.formdisable = true;
      this.brokerageEditForm.value.type_id = this.type_id;
      this.AddBrokeragemgmtService.editBrokerageTypeDetails(this.brokerageEditForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/addbrokeragemgmt"]);
          }
        },
        error => {
          this.formdisable = false;
          this.toasterService.pop('error', 'Error', error.error.message);
        }
      );
    }
  }

}
