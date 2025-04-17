import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  { path: '', component: ContactFormComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
