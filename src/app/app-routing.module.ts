import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'payment', component: PaymentFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
