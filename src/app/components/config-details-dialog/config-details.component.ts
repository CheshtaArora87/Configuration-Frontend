import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; 

export interface ProcessUsage {
  ProcessName: string;
  Definition: string;
  createdAt: string
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
  imports: [CommonModule, MatIconModule, MatTableModule],
})
export class ConfigDetailsComponent {
  configDetails: ConfigData | undefined;


  mockData: ConfigData[] = [
    {
      ConfigName: 'Database Connection',
      Services: [
        {
          ServiceName: 'User Service',
          Usage: [
            { ProcessName: 'Background Sync', Definition: 'Synchronizes user data with the database.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Database Migration', Definition: 'Handles schema updates for user database.',createdAt: '2025-01-01T12:00:00Z' },
            
          ],
        },
        {
          ServiceName: 'Order Service',
          Usage: [
            { ProcessName: 'Order Sync', Definition: 'Ensures order consistency in the database.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Payment Reconciliation', Definition: 'Verifies payments against orders.' ,createdAt: '2025-01-01T12:00:00Z'},
          ],
        },
        {
          ServiceName: 'Inventory Service',
          Usage: [
            { ProcessName: 'Stock Update', Definition: 'Updates stock levels in real-time.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Low Stock Alert', Definition: 'Triggers alerts for low inventory.',createdAt: '2025-01-01T12:00:00Z' },
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
            { ProcessName: 'Session Cleanup', Definition: 'Removes expired user sessions to free up memory and maintain security. Refreshes cached authentication data to ensure accurate user access control',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Cache Invalidation', Definition: 'Refreshes cached authentication data to ensure accurate user access control.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Stock Update', Definition: 'Updates stock levels in real-time.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Low Stock Alert', Definition: 'Triggers alerts for low inventory.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Order Sync', Definition: 'Ensures order consistency in the database.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Payment Reconciliation', Definition: 'Verifies payments against orders.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Background Sync', Definition: 'Synchronizes user data with the database.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Database Migration', Definition: 'Handles schema updates for user database.',createdAt: '2025-01-01T12:00:00Z' }

          ],
        },
        {
          ServiceName: 'Payment Service',
          Usage: [
            { ProcessName: 'Payment Session Timeout', Definition: 'Cancels pending payments after a specified timeout to prevent transaction issues.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Transaction Cache Update', Definition: 'Updates transaction status in the cache to reflect the latest payment state.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Stock Update', Definition: 'Updates stock levels in real-time.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Low Stock Alert', Definition: 'Triggers alerts for low inventory.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Order Sync', Definition: 'Ensures order consistency in the database.',createdAt: '2025-01-01T12:00:00Z' },
            { ProcessName: 'Payment Reconciliation', Definition: 'Verifies payments against orders.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Background Sync', Definition: 'Synchronizes user data with the database.' ,createdAt: '2025-01-01T12:00:00Z'},
            { ProcessName: 'Database Migration', Definition: 'Handles schema updates for user database.' ,createdAt: '2025-01-01T12:00:00Z'},
          ],
        },
      ],
    }
  ];

  constructor(public dialogRef: MatDialogRef<ConfigDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: { configName: string }) {}


  ngOnInit() {
    const configName = decodeURIComponent(this.data.configName || '');
    console.log('Received configName:', configName);
  
    this.configDetails = this.mockData.find((data) => data.ConfigName === configName);
  
    if (!this.configDetails) {
      console.warn(`Config '${configName}' not found!`);
      return;
    }
  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
