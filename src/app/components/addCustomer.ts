import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerService }  from '../service';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-customer',
  template: `
    <div class="row">
        <div class="row">
            <div class="col-md-12">
                <h1>Add New Customer</h1>
            </div>
        </div>

        <form class="form-horizontal" (ngSubmit)="onSubmit(customerForm)" #customerForm="ngForm" novalidate>
            <div class="form-group">
                <label for="id" class="col-sm-2 control-label">Customer Id</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="id"  name="id" [(ngModel)]="id" readonly>
                </div>
            </div>
            <div class="form-group">
                <label for="firstName" class="col-sm-2 control-label">First name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="firstName" placeholder="firstName" name="firstName" [(ngModel)]="custName" required>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-sm-2 control-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="lastName" placeholder="lastName" name="lastName" [(ngModel)]="lastName" required>
                </div>
            </div>
            <div class="form-group">
                <label for="age" class="col-sm-2 control-label">Birth Day</label>
                <div class="col-sm-10">
                    <my-date-picker
                        name="age"
                        [placeholder]="placeholder" 
                        [options]="myDatePickerOptions"
                        [(ngModel)]="selAge"
                        required >
                    </my-date-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="gender" class="col-sm-2 control-label">Gender</label>
                <div class="col-sm-10">
                    <select class="form-control" id="gender" name="gender" [(ngModel)]="gender" required>
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
                        [placeholder]="placeholder" 
                        [options]="myDatePickerOptions"
                        [(ngModel)]="selLastContact"
                        required>
                    </my-date-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="customerLifetimeValue" class="col-sm-2 control-label">Customer Lifetime Value</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="customerLifetimeValue" name="customerLifetimeValue" placeholder="" [(ngModel)]="customerLifetimeValue" required>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary" type="submit" [disabled]="!customerForm.valid">Add</button>
                    <button class="btn btn-primary" type="button" (click)="redirectToHome()">Cancel</button>
                </div>
            </div>
        </form>
    </div>
  `
})
/**
 * Add customer class
 * @class AddCustomer
 */
export class AddCustomer {

    private id: number;
    private custName: string;
    private lastName: string;
    private age: object | string;
    private gender: string;
    private lastContact: object | string;
    private customerLifetimeValue: number;
    private placeholder: string = 'Select a date';

    private myDatePickerOptions: IMyDpOptions = { dateFormat: 'yyyy-mm-dd' };

    private selAge: IMyDateModel;
    private selLastContact: IMyDateModel;

    constructor (
        private router: Router, 
        private service: CustomerService
    ) { }
    /**
     * Life cycle method
     * @function ngOnInit
     */
    ngOnInit() {
        this.id = this.service.getCustomerId();
    }

    /**
     * Form submit handler
     * @function onSubmit
     */
    onSubmit(customerForm: NgForm) {
        if (customerForm.valid ) {
            this.addCustomer();
        }
    }
    /**
     * Add new customer
     * @function addCustomer
     */
    addCustomer() {

        this.age = this.selAge.formatted;
        this.lastContact = this.selLastContact.formatted;

        let item = {
            id: this.id,
            firstName: this.custName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            lastContact: this.lastContact,
            customerLifetimeValue: this.customerLifetimeValue
        };
        this.service.addCustomer(item);
        this.redirectToHome();
    }
    /**
     * Navigate to a url
     * @function navigateTo
     */
    redirectToHome() {
        this.router.navigate(['/']);
    }
}