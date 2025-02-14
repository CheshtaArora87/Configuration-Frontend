import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { ConfigDetailsComponent } from './components/config-details-dialog/config-details.component';

export const routes: Routes = [
    { path: '', component: TableComponent }, // List Page
    { path: 'config-details/:configName', component: ConfigDetailsComponent } // Details Page
  ];
  