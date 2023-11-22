import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePresentationComponent } from './components/create-presentation/create-presentation.component';
import { JoinPresentationComponent } from './components/join-presentation/join-presentation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full' 
  },
  {
    path: "create",
    component: CreatePresentationComponent
  },
  {
    path: 'join/:prId',
    component: JoinPresentationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }