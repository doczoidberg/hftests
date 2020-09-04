import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XlsconvComponent } from './xlsconv/xlsconv.component';


const routes: Routes = [
  { path: '', component: XlsconvComponent },
  { path: 'xlsconv', component: XlsconvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
