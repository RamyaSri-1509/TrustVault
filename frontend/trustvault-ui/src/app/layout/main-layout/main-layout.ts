
import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout implements OnInit {
  isMobile = false;
  mobileNavOpen = false;
  emailNotificationsEnabled = true;
  securityAlertsEnabled = true;

  @ViewChild('profileDialog') private profileDialog!: TemplateRef<unknown>;
  @ViewChild('preferencesDialog') private preferencesDialog!: TemplateRef<unknown>;
  @ViewChild('helpDialog') private helpDialog!: TemplateRef<unknown>;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateViewport();
  }

  @HostListener('window:resize')
  onViewportResize(): void {
    this.updateViewport();
  }

  closeMobileNav(): void {
    if (this.isMobile) {
      this.mobileNavOpen = false;
    }
  }

  async logout(menuTrigger: MatMenuTrigger): Promise<void> {
    sessionStorage.removeItem('trustvault_demo_user');
    menuTrigger.closeMenu();
    await this.router.navigate(['/login']);
  }

  openProfileDialog(menuTrigger: MatMenuTrigger): void {
    this.openDialog(menuTrigger, this.profileDialog);
  }

  openPreferencesDialog(menuTrigger: MatMenuTrigger): void {
    this.openDialog(menuTrigger, this.preferencesDialog);
  }

  openHelpDialog(menuTrigger: MatMenuTrigger): void {
    this.openDialog(menuTrigger, this.helpDialog);
  }

  toggleEmailNotifications(): void {
    this.emailNotificationsEnabled = !this.emailNotificationsEnabled;
    this.savePreference('trustvault_email_notifications', this.emailNotificationsEnabled);
  }

  toggleSecurityAlerts(): void {
    this.securityAlertsEnabled = !this.securityAlertsEnabled;
    this.savePreference('trustvault_security_alerts', this.securityAlertsEnabled);
  }

  private updateViewport(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.emailNotificationsEnabled =
      localStorage.getItem('trustvault_email_notifications') !== 'false';
    this.securityAlertsEnabled =
      localStorage.getItem('trustvault_security_alerts') !== 'false';

    this.isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (!this.isMobile) {
      this.mobileNavOpen = false;
    }
  }

  private openDialog(menuTrigger: MatMenuTrigger, content: TemplateRef<unknown>): void {
    menuTrigger.closeMenu();
    this.dialog.open(content, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      panelClass: 'trustvault-dialog'
    });
  }

  private savePreference(key: string, enabled: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, String(enabled));
    }
  }
}
