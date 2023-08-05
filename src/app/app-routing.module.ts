import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';


const routes: Routes = [
  {path:'', component:StudentListComponent},
  {path:'edit',component:EditStudentsComponent},
  {path:'add',component:EditStudentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }