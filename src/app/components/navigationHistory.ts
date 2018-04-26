import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderBy} from '../orderBy';

@Component({
    selector: 'nav-history',
    template: `
        <div class="container">
            <div class="row">
                <table class="table table-striped table-bordered table-hover employee-table">
                    <thead>
                        <tr>
                            <th><button class="glyphicon glyphicon-sort sort-btn btn-xs" aria-hidden="true" (click)="sortData('user')"></button> Page</th>
                            <th><button class="glyphicon glyphicon-sort sort-btn" aria-hidden="true" (click)="sortData('time')"></button> Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of userHistory">
                            <td>{{item.user}}</td>
                            <td>{{item.time}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <a class="btn btn-primary" routerLink="/">Back To Overview</a>
            </div>
        </div>
    `
})

/**
 * User navigation history
 * @class NavHistory
 */
export class NavHistory {
    private id: number;
    private timeOrder: string;

    constructor(private route: ActivatedRoute, private orderBy: OrderBy) {
        this.timeOrder = '+';
    }

    /**
     * Define Input source
     */
    @Input() userHistory: Array<any> = [
        {
            "user": "X",
            "time": "2013-06-01 09:19:13"
        },
        {
            "user": "A",
            "time": "2013-06-01 09:19:14"
        },
        {
            "user": "B",
            "time": "2013-06-01 09:19:15"
        }
    ];
    /** Life cycle method
     * @function ngOnInit
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        // Initially sort by "Timestamp", ascending
        this.userHistory = this.orderBy.transform(this.userHistory, [`${this.timeOrder}time`]);
    }

    /**
     * @function sortData
     * @param [string] prop
     */
    sortData(prop: string) {
        this.timeOrder = (this.timeOrder === '+') ? '-' : '+';
        this.orderBy.transform(this.userHistory, [`${this.timeOrder}${prop}`])
        return this.userHistory;
    }
}