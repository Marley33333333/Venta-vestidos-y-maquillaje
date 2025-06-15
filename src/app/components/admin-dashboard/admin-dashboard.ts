import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart  } from 'chart.js';
import { PaymentData } from '../../models/paymentdata.interface';
import { LinearScale, CategoryScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, BarController, Title, Tooltip, Legend);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  paymentData: PaymentData[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pagos de Clientes por Mes' }
    },
    scales: {
      y: { 
        type: 'linear', // Explicitly specify linear scale
        beginAtZero: true, 
        title: { display: true, text: 'Monto (USD)' } 
      },
      x: { 
        type: 'category', // Explicitly specify category scale
        title: { display: true, text: 'Mes' } 
      }
    }
  };

  private apiUrl = 'https://tent-california-consumer-and.trycloudflare.com/api/v1';

  constructor( private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Verify admin role
    if (this.authService.getRole() !== 'admin') {
      console.error('Access denied: Not an admin');
      return;
    }

    // Load payment data for chart
    this.loadPaymentData();
  }

  loadPaymentData(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }

    this.http.get<PaymentData[]>(`${this.apiUrl}/admin/payments`).subscribe({
        next: (data) => {
            console.log('Payment Data Received:', data); // Debug
            this.paymentData = data;
            this.initChart();
        },
        error: (err) => {
            console.error('Failed to load payment data:', err);
            console.error('Error Status:', err.status);
            console.error('Error Message:', err.message);
            this.paymentData = [
                { month: '2025-01', total: 5000 },
                { month: '2025-02', total: 7000 },
                { month: '2025-03', total: 6000 },
                { month: '2025-04', total: 8000 }
            ];
            this.initChart();
        }
    });
  }

  initChart(): void {
    this.barChartData = {
      labels: this.paymentData.map(p => p.month),
      datasets: [
        {
          label: 'Pagos de Clientes (USD)',
          data: this.paymentData.map(p => p.total),
          backgroundColor: 'rgba(232, 62, 140, 0.2)', // Pink theme
          borderColor: '#e83e8c',
          borderWidth: 2
        }
      ]
    };
  }
  

  // Helper to navigate to management pages
  manageProducts(): void {
    // Logic to navigate or fetch products can be added
  }

  manageCategories(): void {
    // Logic for categories
  }

  manageSuppliers(): void {
    // Logic for suppliers
  }


}
