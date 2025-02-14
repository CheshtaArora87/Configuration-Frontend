import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface ProcessUsage {
  ProcessName: string;
  Definition: string;
}

export interface ServiceUsage {
  ServiceName: string;
  Usage: ProcessUsage[];
}

export interface ConfigData {
  ConfigName: string;
  Services: ServiceUsage[];
}

@Component({
  selector: 'app-config-details',
  templateUrl: 'config-details.component.html',
  styleUrls: ['config-details.component.css'],
  imports: [CommonModule],
})
export class ConfigDetailsComponent {
  configDetails: ConfigData | undefined;
  paginatedServices: ServiceUsage[] = []; // Stores only 2 services per page
  currentPage = 0;
  servicesPerPage = 2;
  totalPages = 0;

  mockData: ConfigData[] = [
    {
      ConfigName: 'Database Connection',
      Services: [
        {
          ServiceName: 'User Service',
          Usage: [
            { ProcessName: 'Background Sync', Definition: 'Synchronizes user data with the database.' },
            { ProcessName: 'Database Migration', Definition: 'Handles schema updates for user database.' },
            
          ],
        },
        {
          ServiceName: 'Order Service',
          Usage: [
            { ProcessName: 'Order Sync', Definition: 'Ensures order consistency in the database.' },
            { ProcessName: 'Payment Reconciliation', Definition: 'Verifies payments against orders.' },
          ],
        },
        {
          ServiceName: 'Inventory Service',
          Usage: [
            { ProcessName: 'Stock Update', Definition: 'Updates stock levels in real-time.' },
            { ProcessName: 'Low Stock Alert', Definition: 'Triggers alerts for low inventory.' },
          ],
        },
      ],
    },
    {
      ConfigName: 'Cache Timeout',
      Services: [
        {
          ServiceName: 'Auth Service',
          Usage: [
            { ProcessName: 'Session Cleanup', Definition: 'Removes expired user sessions to free up memory and maintain security.' },
            { ProcessName: 'Cache Invalidation', Definition: 'Refreshes cached authentication data to ensure accurate user access control.' },
          ],
        },
        {
          ServiceName: 'Payment Service',
          Usage: [
            { ProcessName: 'Payment Session Timeout', Definition: 'Cancels pending payments after a specified timeout to prevent transaction issues.' },
            { ProcessName: 'Transaction Cache Update', Definition: 'Updates transaction status in the cache to reflect the latest payment state.' },
          ],
        },
      ],
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const configName = decodeURIComponent(this.route.snapshot.paramMap.get('configName') || '');
    console.log('Received configName:', configName);

    this.configDetails = this.mockData.find((data) => data.ConfigName === configName);

    if (!this.configDetails) {
      console.warn(`Config '${configName}' not found! Redirecting...`);
      this.router.navigate(['/']); // Redirect to home if config is not found
      return;
    }

    this.totalPages = Math.ceil(this.configDetails.Services.length / this.servicesPerPage);
    this.updatePaginatedServices(); // Slice services for the first page
  }

  updatePaginatedServices() {
    if (this.configDetails) {
      const start = this.currentPage * this.servicesPerPage;
      const end = start + this.servicesPerPage;
      this.paginatedServices = this.configDetails.Services.slice(start, end);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedServices();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedServices();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
