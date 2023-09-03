import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PushNotificationService } from './pushnotimgmt.services';
import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterService } from 'angular2-toaster';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

@Component({
    templateUrl: 'pushnotimgmt.component.html',
    styleUrls: ['./pushnotimgmt.css']
})

export class PushNotificationComponent implements OnInit {
    pushForm!: FormGroup;
    public selectedOptions!: INgxSelectOptions[];

    public ngxValue: any = [];
    public ngxDisabled = false;

    submitted: boolean = false;
    usrArr: any;
    selectedItems = [];
    itemList = [];
    settings = {};
    getAllUsersData = [];
    public items: any;
    public user_type: any;
    public agentsOrUsers = [];
    dialogue_for_users: Boolean = false;
    is_user_agent_select: Boolean = false;
    is_nonAgents: Boolean = true;
    public get_user_id: any;
    public get_user_name: any;
    public userType: any;
    public formDisable: Boolean = false;

    constructor(
        public customValidation: CustomValidation,
        public pushFactory: PushNotificationService,
        public router: Router,
        public toasterService: ToasterService
    ) { }

    ngOnInit() {
        this.dialogue_for_users = false;
        this.user_type = { 'is_agent': null }
        this.formDisable = false;
        // this.settings = {
        //     singleSelection: true,
        //     text: "Select User",
        //     selectAllText: "Select All",
        //     unSelectAllText: "Unselect All",
        //     enableSearchFilter: true,
        //     classes: "myclass custom-class"
        // };
        this.createForm();
        // this.getNonAgentsList(this.user_type, null);

    }

    createForm() {
        this.pushForm = new FormGroup({
            // 'select_user': new FormControl(''),
            'message': new FormControl('', Validators.required)
        })

        // this.pushForm.get('users').valueChanges.subscribe(
        //     (users: any) => {
        //         if(users == 1){
        //             this.pushForm.get('select_user').setValidators([Validators.required]);
        //             this.pushForm.get('select_user').updateValueAndValidity({emitEvent : false});
        //         } else {
        //             this.pushForm.get('select_user').setValidators([]);
        //             this.pushForm.get('select_user').updateValueAndValidity({emitEvent : false});
        //         }
        //     }
        // );
    }

    // usersAgentChange(options: INgxSelectOptions[]) {
    //     this.selectedOptions = options;
    //     if (this.selectedOptions.length == 0) {
    //         return false;
    //     } else {
    //       if (this.selectedOptions.length == 1) {
    //         this.get_user_id = this.selectedOptions['0'].data.user_id;
    //         this.get_user_name = this.selectedOptions['0'].data.itemName;
    //         this.pushForm.controls['select_user'].setValue((this.get_user_id));
    //         this.is_user_agent_select = false;
    //       }
    //     }   
    // }

    // removeSelectedBrokerage(e){  
    //     this.is_user_agent_select = true;
    //     this.pushForm.controls['select_user'].setValue('');
    //     this.get_user_name = '';
    //     if (e != null) {
    //         this.get_user_name = '';
    //         this.pushForm.controls['select_user'].setValue('');
    //     }
    // }

    // getNonAgentsList(usrType, changeType) {
    //     if (changeType == null) {
    //         this.userType =  usrType;
    //     } else {
    //         if (changeType.target.value == 2) {
    //             this.userType = {'is_agent': "1"};    
    //         } else {
    //             this.userType = {'is_agent': changeType.target.value};
    //         }
    //     }

    //     this.pushFactory.getAgentsNonAgents(this.userType).subscribe(
    //         res => {
    //             this.items = JSON.parse(JSON.stringify(res));
    //             this.agentsOrUsers = this.items.data.all_users;
    //         }, 
    //         err => {
    //             console.log('OOPS!! SOMETHING WENT WRONG')
    //         }
    //     )
    // }

    userTypeChange(e: any) {
        if (e.target.value == "") {
            this.ngOnInit();
        }
        if (e.target.value == 0 && e.target.value != "") {
            this.dialogue_for_users = true;
            this.is_nonAgents = true;
            this.user_type = { 'is_agent': e.target.value }
        }
        if (e.target.value == 1) {
            this.dialogue_for_users = true;
            this.is_nonAgents = false;
            // this.pushForm.controls['select_user'].setValue('');
            this.user_type = { 'is_agent': e.target.value }
        }
        // this.getNonAgentsList(this.user_type, null);
    }

    pushFormSubmit() {
        this.submitted = true;
        if (this.pushForm.valid) {
            this.formDisable = true;
            this.pushForm.value.user_type = this.user_type.is_agent;
            this.pushFactory.sendPushNotificationByAdmin(this.pushForm.value).subscribe(
                res => {
                    let resData = JSON.parse(JSON.stringify(res));

                    if (resData.status == 200) {
                        this.toasterService.pop('success', 'Success', 'Push notification send successfully');
                        setTimeout(() => {
                            this.router.navigate(['/usersmgmt']);
                        }, 1000);
                    }
                },
                error => {
                    this.toasterService.pop('error', 'Error', 'Something went wrong');
                }
            )
        }
    }
}

