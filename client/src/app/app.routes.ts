import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChannelManagementComponent } from './channel-management/channel-management.component';
import { ChatComponent } from './chat/chat.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'groups', component: GroupManagementComponent },
  { path: 'channels', component: ChannelManagementComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'profile', component: UserProfileComponent },
];
