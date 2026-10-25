
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Permission {
  id: number;
  documentName: string;
  userName: string;
  email: string;
  role: 'Owner' | 'Viewer' | 'Editor';
  access: 'Read' | 'Edit';
  sharedDate: string;
}

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './permissions.html',
  styleUrl: './permissions.scss'
})
export class Permissions {
  pendingRevokeId: number | null = null;

  permissions: Permission[] = [
    {
      id: 1,
      documentName: 'Project Proposal.pdf',
      userName: 'Ramya',
      email: 'ramya@example.com',
      role: 'Owner',
      access: 'Edit',
      sharedDate: '25 Oct 2026'
    },
    {
      id: 2,
      documentName: 'Project Proposal.pdf',
      userName: 'Ananya Sharma',
      email: 'ananya@example.com',
      role: 'Editor',
      access: 'Edit',
      sharedDate: '24 Oct 2026'
    },
    {
      id: 3,
      documentName: 'Requirements.docx',
      userName: 'Rahul Kumar',
      email: 'rahul@example.com',
      role: 'Viewer',
      access: 'Read',
      sharedDate: '23 Oct 2026'
    }
  ];
  
countByRole(role: 'Owner' | 'Viewer' | 'Editor'): number {
  return this.permissions.filter(item => item.role === role).length;
}

  requestRevoke(id: number): void {
    const permission = this.permissions.find(item => item.id === id);

    if (permission && permission.role !== 'Owner') {
      this.pendingRevokeId = id;
    }
  }

  confirmRevokeAccess(): void {
    if (this.pendingRevokeId !== null) {
      this.revokeAccess(this.pendingRevokeId);
      this.pendingRevokeId = null;
    }
  }

  cancelRevokeAccess(): void {
    this.pendingRevokeId = null;
  }

  revokeAccess(id: number): void {
    const permission = this.permissions.find(item => item.id === id);

    if (!permission || permission.role === 'Owner') {
      return;
    }

    this.permissions = this.permissions.filter(
      item => item.id !== id
    );
  }
}
