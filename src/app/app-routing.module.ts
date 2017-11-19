import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ImmutableListComponent }   from './immutable-list/immutable-list.component';

const appRoutes: Routes = [
    { path: 'immutable-list', component: ImmutableListComponent },
   
  ];
   
  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}