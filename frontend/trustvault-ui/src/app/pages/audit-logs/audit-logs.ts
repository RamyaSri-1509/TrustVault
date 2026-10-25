
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface AuditLog {
  id: number;
  user: string;
  action: string;
  document: string;
  date: string;
  status: 'Success' | 'Denied';
  details: string;
}

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './audit-logs.html',
  styleUrl: './audit-logs.scss'
})
export class AuditLogs {
  searchText = '';

  logs: AuditLog[] = [
    {
      id: 1,
      user: 'Ramya',
      action: 'Uploaded',
      document: 'Project Proposal.pdf',
      date: '25 Oct 2026, 10:30 AM',
      status: 'Success',
      details: 'Document uploaded successfully'
    },
    {
      id: 2,
      user: 'Ananya Sharma',
      action: 'Access Granted',
      document: 'Project Proposal.pdf',
      date: '25 Oct 2026, 10:15 AM',
      status: 'Success',
      details: 'Edit permission granted'
    },
    {
      id: 3,
      user: 'Rahul Kumar',
      action: 'Access Denied',
      document: 'Requirements.docx',
      date: '24 Oct 2026, 04:20 PM',
      status: 'Denied',
      details: 'User does not have permission'
    },
    {
      id: 4,
      user: 'Ramya',
      action: 'Access Revoked',
      document: 'Meeting Notes.pdf',
      date: '24 Oct 2026, 02:00 PM',
      status: 'Success',
      details: 'User access revoked'
    },
    {
      id: 5,
      user: 'Priya Reddy',
      action: 'Downloaded',
      document: 'Project Timeline.xlsx',
      date: '23 Oct 2026, 11:45 AM',
      status: 'Success',
      details: 'Document downloaded'
    }
  ];

  get filteredLogs(): AuditLog[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.logs;
    }

    return this.logs.filter(log =>
      [
        log.user,
        log.action,
        log.document,
        log.status,
        log.details
      ].some(value => value.toLowerCase().includes(query))
    );
  }

  get successfulCount(): number {
    return this.logs.filter(log => log.status === 'Success').length;
  }

  get deniedCount(): number {
    return this.logs.filter(log => log.status === 'Denied').length;
  }
}
