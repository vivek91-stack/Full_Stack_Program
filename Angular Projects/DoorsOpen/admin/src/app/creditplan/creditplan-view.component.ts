import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CreditPlanService } from './creditplan.services';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from './../custom_validation/customValidation';

@Component({
    templateUrl: './creditplan-view.component.html'
})

export class creditPlanViewComponent implements OnInit {
    editCreditPlanForm!: FormGroup;

    constructor(
        public creditplanService: CreditPlanService,
        private fb: FormBuilder,
        private router: Router,
        public toasterService: ToasterService,
        private rout: ActivatedRoute,
        private CustomValidation: CustomValidation
    ) {}

    public submitted:Boolean = false;
    public action: string = 'view';
    public credit_id!: number;
    public credit_plan_details: any;

    ngOnInit() {
        this.action;
        this.createeditCreditPlanForm();
        this.rout.params.subscribe(params => {
            this.credit_id = params.credit_id
        });
        this.viewCreditDetails(this.credit_id);
    }

    createeditCreditPlanForm(): void {
        this.editCreditPlanForm = this.fb.group({
            'credit_amount': new FormControl (null, [Validators.required, Validators.pattern(this.CustomValidation.numeric)]),
            'credits': new FormControl (null, [Validators.required, Validators.pattern(this.CustomValidation.numeric)]),
            'description': new FormControl (null, [Validators.required, Validators.maxLength(500)])
        })
    }

    viewCreditDetails(credit_id: number): void {
        let credit_ID = {'credit_id': credit_id};
        this.creditplanService.getCreditPlansDetails(credit_ID)
        .subscribe(
            res => {
            var resData = JSON.parse(JSON.stringify(res));
                if (resData.status == '200') {
                    this.credit_plan_details = resData.data;
                    this.editCreditPlanForm.setValue(
                        {
                            'credit_amount': this.credit_plan_details.credit_amount,
                            'credits': this.credit_plan_details.credits,
                            'description': this.credit_plan_details.description
                        }
                    )
                }
            },
            err => {

            }
        ) 
    }    

    editCreditPlanOptions(edit:any): void {
        this.action = edit;
    }

    editCreditPlanFormSubmit() {
        this.submitted = true;
        if (this.editCreditPlanForm.valid) {
            this.editCreditPlanForm.value.credit_id = this.credit_id;
            this.creditplanService.updateCreditPlans(this.editCreditPlanForm.value)
            .subscribe(
                res => {
                    var resData = JSON.parse(JSON.stringify(res));
                    if (resData.status == 200) {
                        this.toasterService.pop('success', 'Success', 'Credit plan updated successfully');
                        setTimeout(() => {
                            this.router.navigate(['/creditplan'])
                        }, 1000);
                    }
                },
                err => {
                    this.toasterService.pop('error', 'Error', 'Something went wrong');
                }
            )
        }
    }
}