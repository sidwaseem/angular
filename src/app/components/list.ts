import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBy} from '../orderBy';

import { Customer, CustomerService }  from '../service';

@Component({
  selector: 'employee-list',
  template: `
    <div class="row">
        <div class="row margin-bottom">
            <div class="col-md-12">
            <h1>Customer overview</h1>
            <a class="btn btn-primary" type="button" (click)="navigateTo(['adduser'])">Add New Customer</a>
            </div>
        </div>
        <table class="table table-striped table-bordered table-hover employee-table">
            <thead>
                <tr>
                    <th><button class="glyphicon glyphicon-sort sort-btn btn-xs" aria-hidden="true" (click)="sortData('firstName')"></button> First Name</th>
                    <th><button class="glyphicon glyphicon-sort sort-btn" aria-hidden="true" (click)="sortData('lastName')"></button> Last Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let list of lists; let listIndex = index;">
                    <td>{{list.firstName}}</td>
                    <td>{{list.lastName}}</td>
                    <td>{{calcAge(list.age)}}</td>
                    <td>{{list.gender}}</td>
                    <td>
                        <button class="btn btn-primary" type="button" (click)="navigateTo(['edituser', list.id])">Edit</button>
                        <button class="btn btn-primary" type="button" (click)="onDelete(listIndex)">Delete</button>
                        <button class="btn btn-success" type="button" (click)="navigateTo(['history', list.id])">Navi</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  `
})
export class List {

    private sortOrder: string;
    private lists: Array<any>;
    private data: Array<any>;
    private cId: number;

    constructor (
        private router: Router,
        private orderBy: OrderBy,
        private service: CustomerService) {
            this.sortOrder = '+';
        }

    ngOnInit() {
        this.lists = this.service.getAllCustomer();
        // Initially sort by "Timestamp", ascending
        this.lists = this.orderBy.transform(this.lists, [`${this.sortOrder}lastName`]);
    }

    /**
     * Convert DOB in years
     * @function calcAge
     * @param {string} dateString
     * @return {string}
     */
    calcAge(dateString: string) {
        let birthday = new Date(dateString);
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getFullYear() - 1970);
    }
    /**
     * Remove an item from list
     * @function onDelete
     * @param listIndex
     */
    onDelete(listIndex: number) {
        this.service.removeCustomer(listIndex);
    }
    /**
     * @function sortData
     * @param [string] prop
     */
    sortData(prop: string) {

        this.sortOrder = (this.sortOrder === '+') ? '-' : '+';
        this.orderBy.transform(this.lists, [`${this.sortOrder}${prop}`])
        return this.lists;
    }
    /**
     * Navigate to history
     * @function navigateTo
     * @param [Number] id
     */
    navigateTo (path: Array<any>) {
        this.router.navigate(path);
    }

}
