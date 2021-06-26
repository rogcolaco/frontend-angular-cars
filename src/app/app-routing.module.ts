import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardCarComponent } from './card-car/card-car.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'cadastro', component: FormComponent},
  { path: '', component: CardCarComponent},
  { path: '/', component: CardCarComponent},
  { path: '/frontend-angular-cars/', component: CardCarComponent},
  { path: 'selected/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
