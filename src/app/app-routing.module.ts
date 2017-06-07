import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { ErrorPageComponent } from './error-page/error-page.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers',
    // canActivate: [ AuthGuard ],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: {
          server: ServerResolver // server STORES THE RETURNED OBJECT OF THE resolve() METHOD
        }
      },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // {
  //   path: 'not-found', component: PageNotFoundComponent
  // },
  {
    path: 'not-found', component: ErrorPageComponent, data: { message: 'Page Not Found!' }
  },
  {
    path: '**', redirectTo: '/not-found' // MUST BE LAST ROUTE IN LIST
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, { useHash: true })
      RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule // EXPORT IT SO IT CAN BE USED BY OTHER MODULES THAT IMPORT AppRoutingModule
  ]
})
export class AppRoutingModule {


}
