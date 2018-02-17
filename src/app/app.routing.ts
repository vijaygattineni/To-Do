import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ToDoHomeComponent } from './to-do-home/to-do-home.component';

const routes: Routes = [
    { path: '', redirectTo: '/todohome', pathMatch: 'full' },
    { path: 'todohome', component: ToDoHomeComponent }
];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
