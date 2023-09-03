import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CreditPlanService } from './creditplan.services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { CustomValidation } from './../custom_validation/customValidation';


@Component({
    templateUrl: './add-creditplan.component.html'
})

export class addCreditPlanComponent implements OnInit {
    AddCreditPlanForm!: FormGroup;

    constructor(
        public creditplanService: CreditPlanService,
        private fb: FormBuilder,
        private router: Router,
        public toasterService: ToasterService,
        private CustomValidation: CustomValidation
    ) { }

    public submitted: Boolean = false;

    ngOnInit() {
        this.createCreditPlanForm();
    }

    createCreditPlanForm(): void {
        this.AddCreditPlanForm = this.fb.group({
            'credit_amount': new FormControl(null, [Validators.required, Validators.pattern(this.CustomValidation.numeric)]),
            'credits': new FormControl(null, [Validators.required, Validators.pattern(this.CustomValidation.numeric)]),
            'description': new FormControl(null, [Validators.required, Validators.maxLength(500)])
        });
    }

    AddCreditPlanFormSubmit() {
        this.submitted = true;
        if (this.AddCreditPlanForm.valid) {
            this.creditplanService.addCreditPlan(this.AddCreditPlanForm.value)
                .subscribe(
                    res => {
                        var resData = JSON.parse(JSON.stringify(res));

                        if (resData.status == 200) {
                            this.toasterService.pop('success', 'Success', 'Credit plan added successfully');
                            setTimeout(() => {
                                this.router.navigate(['/creditplan']);
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