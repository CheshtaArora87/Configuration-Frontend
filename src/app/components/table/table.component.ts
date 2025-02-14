import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import{ConfigDetailsComponent} from '../config-details-dialog/config-details.component';
import { Router, RouterLink } from '@angular/router';


export interface ConfigData {
  configName: string;
  servicesUsing: string[];
  processesUsing: string[];
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
  standalone: true, // ✅ Use this for standalone components
  imports: [ConfigDetailsComponent,RouterLink
    ,MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule,MatInputModule, MatChipsModule, MatSelectModule,FormsModule, MatOptionModule]
})
export class TableComponent {
  displayedColumns: string[] = ['configName', 'servicesUsing', 'processesUsing', 'actions'];
  selectedService: string[] = [];
  selectedProcess: string[] = [];

  dataSource = new MatTableDataSource<ConfigData>([
    {
      configName: 'Database Connection',
      servicesUsing: ['User Service', 'Order Service','Inventory Service'],
      processesUsing: ['Background Sync', 'Database Migration','Order Sync','Payment Reconciliation','Stock Update','Low Stock Alert']
    },
    {
      configName: 'Cache Timeout',
      servicesUsing: ['Auth Service', 'Payment Service'],
      processesUsing: ['Session Cleanup', 'Cache Invalidation','Payment Session Timeout','Transaction Cache Update']
    },
    {
      configName: 'API Rate Limit',
      servicesUsing: ['Gateway', 'Logging Service'],
      processesUsing: ['Throttle Requests', 'API Monitoring']
    },
    {
      configName: 'Session Expiry',
      servicesUsing: ['Auth Service', 'Session Manager'],
      processesUsing: ['Auto Logout', 'Session Refresh']
    },
    {
      configName: 'Logging Level',
      servicesUsing: ['Logging Service', 'Monitoring Service'],
      processesUsing: ['Error Tracking', 'Log Aggregation']
    },
    {
      configName: 'Retry Policy',
      servicesUsing: ['Order Service', 'Payment Service'],
      processesUsing: ['Failed Transactions', 'Reattempt Logic']
    },
    {
      configName: 'Max Concurrent Users',
      servicesUsing: ['User Service', 'Auth Gateway', 'Payment Service', 'Monitoring Service'],
      processesUsing: ['Load Balancing', 'Auto Scaling']
    },
    {
      configName: 'Cache Expiry Time',
      servicesUsing: ['Cache Manager', 'Session Service'],
      processesUsing: ['Data Refresh', 'Cache Rebuild']
    },
    {
      configName: 'Email Notifications',
      servicesUsing: ['Notification Service', 'User Service'],
      processesUsing: ['Transactional Emails', 'User Alerts']
    },
    {
      configName: 'SMS Gateway',
      servicesUsing: ['Notification Service', 'OTP Service'],
      processesUsing: ['User Authentication', 'OTP Verification']
    },
    {
      configName: 'File Upload Limit',
      servicesUsing: ['File Service', 'Cloud Storage'],
      processesUsing: ['Media Handling', 'File Compression']
    },
    {
      configName: 'Payment Gateway Timeout',
      servicesUsing: ['Payment Service', 'Order Service'],
      processesUsing: ['Transaction Processing', 'Payment Validation']
    },
    {
      configName: 'Session Cookie Security',
      servicesUsing: ['Auth Service', 'Web Gateway'],
      processesUsing: ['Secure Login', 'Cookie Encryption']
    },
    {
      configName: 'Data Encryption Policy',
      servicesUsing: ['Security Service', 'Database Service'],
      processesUsing: ['Data Protection', 'Key Rotation']
    },
    {
      configName: 'Feature Flagging',
      servicesUsing: ['Frontend Service', 'Backend Service'],
      processesUsing: ['A/B Testing', 'Feature Rollout']
    }
  ]);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private dialog: MatDialog,private router: Router) {} 

  applyFilters() {
    this.dataSource.filterPredicate = (data: ConfigData, filterString: string) => {
      const [selectedServices, selectedProcesses] = filterString.split('|').map(f => f ? f.split(',') : []);

      const matchesService = selectedServices.length === 0 || selectedServices.some(service => data.servicesUsing.includes(service));
      const matchesProcess = selectedProcesses.length === 0 || selectedProcesses.some(process => data.processesUsing.includes(process));

      return matchesService && matchesProcess; // ✅ Both filters should be satisfied
    };

    this.dataSource.filter = `${this.selectedService.join(',')}|${this.selectedProcess.join(',')}`;
  }

  removeService(service: string) {
    this.selectedService = this.selectedService.filter(s => s !== service);
  }
  getAllServices(): string[] {
    const allServices = this.dataSource.data.flatMap(item => item.servicesUsing);
    return Array.from(new Set(allServices)); // Remove duplicates
  }
  
  getAllProcesses(): string[] {
    return Array.from(new Set(this.dataSource.data.flatMap(item => item.processesUsing)));
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  viewDetails(row: ConfigData) {
    console.log("hello");
    this.router.navigate(['/config-details', row.configName]);
    console.log("bye");

     // Navigate to details page
  }
}
  
  
  




