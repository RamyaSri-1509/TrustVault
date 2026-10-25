
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  readonly stats = [
    { label: 'Total Documents', value: '24', detail: 'Across your workspace', icon: 'description', tone: 'green' },
    { label: 'Shared Documents', value: '8', detail: '4 shared by you', icon: 'share', tone: 'mint' },
    { label: 'Storage Used', value: '6.8 GB', detail: 'of 10 GB available', icon: 'cloud_done', tone: 'blue' },
    { label: 'Recent Activity', value: '12', detail: 'Events this month', icon: 'timeline', tone: 'amber' }
  ];

  readonly recentDocuments = [
    { name: 'Project Proposal.pdf', category: 'Projects', modified: 'Today, 10:30 AM', access: 'Private', icon: 'picture_as_pdf', tone: 'pdf' },
    { name: 'Requirements.docx', category: 'Reports', modified: 'Yesterday, 4:20 PM', access: 'Shared', icon: 'description', tone: 'doc' },
    { name: 'Design System.fig', category: 'Design', modified: 'Oct 23, 2026', access: 'Private', icon: 'draw', tone: 'design' },
    { name: 'Project Timeline.xlsx', category: 'Projects', modified: 'Oct 21, 2026', access: 'Shared', icon: 'table_chart', tone: 'sheet' }
  ];
}
