import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainViewComponent} from "./views/main-view/main-view.component";
import {HomeModule} from "./components/pages/home/home.module";

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/pages/home/home.module').then((m) => m.HomeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
