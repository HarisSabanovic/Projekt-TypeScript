import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { FrameworkComponent } from './framework/framework.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "courses", component: CoursesComponent},
    { path: "framework", component: FrameworkComponent}
];
