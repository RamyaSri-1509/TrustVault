
import { Signup } from './pages/signup/signup';
import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Documents } from './pages/documents/documents';
import { SharedDocuments } from './pages/shared-documents/shared-documents';
import { Permissions } from './pages/permissions/permissions';
import { AuditLogs } from './pages/audit-logs/audit-logs';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'documents', component: Documents },
      { path: 'shared', component: SharedDocuments },
      { path: 'permissions', component: Permissions },
      { path: 'signup', component: Signup },
      { path: 'audit-logs', component: AuditLogs }
    ]
  },
  { path: '**', redirectTo: '' }
];
