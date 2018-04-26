import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { App } from './app';
import { List, NavHistory, AddCustomer, EditCustomer, PageNotFoundComponent } from './components';
import { AppRoutingModule } from './routes';
import { OrderBy} from './orderBy';
import { CustomerService } from './service';
import { MyDatePickerModule } from 'mydatepicker';

export const pipe_providers = [{
  provide: OrderBy, 
  useClass: OrderBy
}];

@NgModule({  
  declarations: [
      App,
      List,
      NavHistory,
      AddCustomer,
      EditCustomer,
      PageNotFoundComponent,
      OrderBy
  ],
  imports: [
      BrowserModule,
      MyDatePickerModule,
      FormsModule,
      AppRoutingModule
  ],
  providers: [
    pipe_providers,
    CustomerService
  ],
  bootstrap: [App]
})
export class AppModule {}
