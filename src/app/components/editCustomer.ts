import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService }  from '../service';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'edit-customer',
  template: `
    <div class="row">
        <div class="row">
            <div class="col-md-12">
                <h1>Edit Customer</h1>
            </div>
        </div>

        <form class="form-horizontal" (ngSubmit)="onSubmit(customerForm)" #customerForm="ngForm" novalidate>
            <div class="form-group">
                <label for="id" class="col-sm-2 control-label">Customer Id</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="id" value="{{customerData.id}}" readonly>
                </div>
            </div>
            <div class="form-group">
                <label for="firstName" class="col-sm-2 control-label">First name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="firstName" placeholder="firstName" name="firstName" [(ngModel)]="customerData.firstName" required>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-sm-2 control-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="lastName" placeholder="lastName" name="lastName" [(ngModel)]="customerData.lastName" required>
                </div>
            </div>
            <div class="form-group">
                <label for="age" class="col-sm-2 control-label">Birth Day</label>
                <div class="col-sm-10">
                    <my-date-picker
                        name="age"
                        [options]="myDatePickerOptions"
                        [selDate]="selAge"
                        (dateChanged)="onDateChange($event, 'age')"
                        required >
                    </my-date-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="gender" class="col-sm-2 control-label">Gender</label>
                <div class="col-sm-10">
                    <select class="form-control" id="gender" name="gender" [(ngModel)]="customerData.gender">
                        <option value="m">Male</option>
                        <option value="w">Female</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="lastContact" class="col-sm-2 control-label">Last Contact</label>
                <div class="col-sm-10">
                    <my-date-picker
                        name="lastContact"
                        [options]="myDatePickerOptions"
                        [selDate]="selLastContact"
                        (dateChanged)="onDateChange($event, 'lastContact')"
                        required>
                    </my-date-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="customerLifetimeValue" class="col-sm-2 control-label">Customer Lifetime Value</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="customerLifetimeValue" name="customerLifetimeValue" placeholder="" [(ngModel)]="customerData.customerLifetimeValue">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary" type="submit" [disabled]="!customerForm.valid">Save</button>
                    <button class="btn btn-primary" type="button" (click)="redirectToHome()">Cancel</button>
                </div>
            </div>
        </form>
    </div>
  `,
  providers: []
})

/**
 * Edit customer class
 * @class EditCustomer
 */
export class EditCustomer {

    private customerData: any = {};
    private customerId: number;
    private custName: string;
    private lastName: string;
    private age: string;
    private gender: string;
    private lastContact: string;
    private customerLifetimeValue: number;

    private myDatePickerOptions: IMyDpOptions = { dateFormat: 'yyyy-mm-dd' };

    private selAge: IMyDateModel;
    private selLastContact: IMyDateModel;

    constructor (
        private route: ActivatedRoute,
        private router: Router, 
        private service: CustomerService
    ) { }
    /**
     * Life cycle method
     * @function ngOnInit
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.customerId = +params['id'];
            let user = this.service.getCustomerDetail(this.customerId);
            this.customerData = Object.assign({}, user);
            this.selAge = this.customerData.age;
            this.selLastContact = this.customerData.lastContact;
        });
    }

    /**
     * Date picker change handler
     * @param [Object] Event
     * @param [string] fieldName
     * @function onDateChange
     */
    onDateChange(event: IMyDateModel, fieldName: string) {
        this.customerData[fieldName] = event.formatted;
    }

    /**
     * Form submit handler
     * @function onSubmit
     */
    onSubmit(customerForm: NgForm) {
        if (customerForm.valid) {
            this.updateCustomer();
        }
    }
    /**
     * Update customer details
     * @function addCustomer
     */
    updateCustomer() {
        this.service.updateCustomer(this.customerData);
        this.redirectToHome();
    }
    /**
     * Navigate to a /
     * @function navigateTo
     */
    redirectToHome() {
        this.router.navigate(['/']);
    }
}