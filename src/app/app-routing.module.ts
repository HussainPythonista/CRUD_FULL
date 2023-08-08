import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { LoginComponent } from './login/LoginComponent';


const newLocal = 'info';
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'edit',component:EditStudentsComponent},
  {path:'add',component:EditStudentsComponent},
  {path: newLocal, component:StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }