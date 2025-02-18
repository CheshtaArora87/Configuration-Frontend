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
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule
    ,MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule,MatInputModule, MatChipsModule, MatSelectModule,FormsModule, MatOptionModule]
})
export class TableComponent {
  displayedColumns: string[] = ['configName', 'servicesUsing', 'processesUsing', 'actions'];
  selectedService: string[] = [];
  selectedProcess: string[] = [];
  selectedConfig:string[]=[];
  allServices:string[]=[];
  allConfigs:string[]=[];
  filteredServices:string[]=[];
  filteredProcesses:string[]=[];
  filteredConfigs:string[]=[];
  allProcesses:string[]=[];
  serviceSearchTerm: string = '';
  configSearchTerm :string='';
  processSearchTerm: string = '';
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
  
  pageSizeOptions = [5, 10, 15];  

  // Default page size
  pageSize = this.pageSizeOptions[0];  

  // Example total item count (adjust dynamically)
  totalItems = this.dataSource.data.length; 

  // Initial page index
  currentPage = 0;

  // Get total pages based on items and page size
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Handle page changes
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Navigate to next page
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  // Navigate to previous page
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Handle page size change
  onPageSizeChange() {
    this.currentPage = 0; // Reset to page 1 when changing page size
  }

  


  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.getAllServices(); 
    this.getAllProcesses();
    this.getAllConfigs(); // Update the allServices[] array
    this.resetFilters();
  }

  
  constructor(private dialog: MatDialog,private router: Router) {} 

  filterServices() {
    this.filteredServices = this.allServices.filter(service =>
      service.toLowerCase().includes(this.serviceSearchTerm.toLowerCase())
    );
  }
  filterConfigs()
  {
    this.filteredConfigs = this.allConfigs.filter(config =>
    config.toLowerCase().includes(this.configSearchTerm.toLowerCase()));

  }

  filterProcesses() {
    this.filteredProcesses = this.allProcesses.filter(process =>
      process.toLowerCase().includes(this.processSearchTerm.toLowerCase())
    );
  }

  applyFilters() {
    this.dataSource.filterPredicate = (data: ConfigData, filterString: string) => {
      const [selectedServices, selectedProcesses, selectedConfig] = filterString.split('|').map(f => f ? f.split(',') : []);

      const matchesService = selectedServices.length === 0 || selectedServices.some(service => data.servicesUsing.includes(service));
      const matchesProcess = selectedProcesses.length === 0 || selectedProcesses.some(process => data.processesUsing.includes(process));
      const matchesConfig = selectedConfig.length === 0 || selectedConfig.some(config => data.configName.toLowerCase().includes(config.toLowerCase()));
      

      return matchesService && matchesProcess&&matchesConfig; // ✅ Both filters should be satisfied
    };

    this.dataSource.filter = `${this.selectedService.join(',')}|${this.selectedProcess.join(',')}|${this.selectedConfig.join(',')}`;
  }

  removeService(service: string) {
    this.selectedService = this.selectedService.filter(s => s !== service);
  }
  removeProcess(process:string)
  {
    this.selectedProcess = this.selectedProcess.filter(s => s !== process);
  }
  getAllServices(): string[] {
    this.allServices = Array.from(new Set(this.dataSource.data.flatMap(item => item.servicesUsing))); 
    return this.allServices;
  }

  // Updates the allProcesses[] array with unique values
  getAllProcesses(): string[]{
    this.allProcesses = Array.from(new Set(this.dataSource.data.flatMap(item => item.processesUsing))); 
    return this.allProcesses;
  }
  
  getAllConfigs(): string[] {
    // Extract unique config names from the data
    this.allConfigs = Array.from(new Set(this.dataSource.data.map(item => item.configName)));
    return this.allConfigs;
  }
  
  resetFilters() {
    this.filteredServices = [...this.allServices]; 
    this.filteredProcesses=[...this.allProcesses];
    this.filteredConfigs=[...this.allConfigs] // Reset filtered services on load
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
    
    this.dialog.open(ConfigDetailsComponent, {
      width: '80%',   // Set width as a percentage of the screen width
      height: '80%',
        // Set height as a percentage of the screen height
      // or specify fixed size (e.g., '500px', '600px', etc.)
      maxWidth: '90vw',  // To ensure it doesn't overflow
      maxHeight: '90vh',
      data: { configName: row.configName }
    });
  }
}
  
  
  




