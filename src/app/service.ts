import { Injectable } from '@angular/core';

export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    lastContact: string;
    customerLifetimeValue: number

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}

let defaultData = [
    new Customer({
        "id": 1,
        "firstName": "Peter",
        "lastName": "Smith",
        "age": "1996-10-12",
        "gender": "m",
        "lastContact": "2013-06-01",
        "customerLifetimeValue": 191.12
    }),
    new Customer({
        "id": 2,
        "firstName": "Anna",
        "lastName": "Hopp",
        "age": "1987-05-03",
        "gender": "w",
        "lastContact": "2013‐07‐08",
        "customerLifetimeValue": 50.99
    }),
    new Customer({
        "id": 3,
        "firstName": "Christian",
        "lastName": "Cox",
        "age": "1991-02-21",
        "gender": "m",
        "lastContact": "2013-08-01",
        "customerLifetimeValue": 0
    }),
    new Customer({
        "id": 4,
        "firstName": "Roxy",
        "lastName": "Fox",
        "age": "1979-06-30",
        "gender": "w",
        "lastContact": "2012-01-29",
        "customerLifetimeValue": 213.12

    }),
    new Customer({
        "id": 5,
        "firstName": "Eric",
        "lastName": "Adam",
        "age": "1969-11-21",
        "gender": "m",
        "lastContact": "2013-03-18",
        "customerLifetimeValue": 1019.91

    })
];

@Injectable()

/**
 * @class CustomerService
 */
export class CustomerService {

    static custId: number = 10;
    private customerList: Array<any>;

    /**
     * Get all cutomers
     */
    getAllCustomer() {

        if (window.localStorage && window.localStorage.getItem('customerList')) {

            let data = JSON.parse(window.localStorage.getItem('customerList'));
            this.customerList = data;

        } else {
            this.customerList = defaultData;
        }

        return this.customerList;
    }
    /**
     * Get customers data matched with id
     */
    getCustomerDetail(id: number | string) {
        return this.customerList.find(customer => customer.id === +id);
    }
    /**
     * Get customer id
     * @function getCustomerId
     * @return {Number} customer id
     */
    getCustomerId() {
        return CustomerService.custId;
    }

    /**
     * Add a customer
     * @function addCustomer
     * @param {Object} item object
     */
    addCustomer(item) {
        const newCustomer = {
                id: CustomerService.custId++,
                firstName: item.firstName,
                lastName: item.lastName,
                age: item.age,
                gender: item.gender,
                lastContact: item.lastContact,
                customerLifetimeValue: item.customerLifetimeValue
            };

        this.customerList.push(newCustomer);
        this.updateStorage();
    }

    /**
     * Update customer
     * @function updateCustomer
     * @param {Object} item object
     */
    updateCustomer(item) {
        const customerIndex = this.customerList.findIndex(x => x.id == item.id);
        this.customerList[customerIndex] = item;

        this.updateStorage();
    }

    /**
     * Remove a employee
     * @function removeCustomer
     * @param [Number] index number
     */
    removeCustomer(index: number) {
        this.customerList.splice(index, 1);
        this.updateStorage();
    }
    /**
     * Update local Storage
     * @function updateStorage
     */
    updateStorage() {
        const storage = window.localStorage;
        if (this.customerList.length) {
            storage.setItem('customerList', JSON.stringify(this.customerList));
        } else {
            storage.removeItem('customerList');
        }
    }
}