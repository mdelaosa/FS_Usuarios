import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { UserDetail } from './components/user-detail/user-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'user/:id', component: UserDetail},

];