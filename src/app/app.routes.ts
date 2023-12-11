import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { TablesComponent } from './pages/tables/tables.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    {path:  'about', component: AboutComponent },
    {path:  'charts', component: ChartsComponent},
    {path: "tables", component: TablesComponent}
];
