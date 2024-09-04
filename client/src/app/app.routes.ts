import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChannelManagementComponent } from './channel-management/channel-management.component';
import { ChatComponent } from './chat/chat.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupManagementComponent, canActivate: [AuthGuard] },
  { path: 'channels', component: ChannelManagementComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];
