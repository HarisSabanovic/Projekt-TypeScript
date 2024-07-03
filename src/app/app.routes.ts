import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { FrameworkComponent } from './framework/framework.component';

export const routes: Routes = [
    { path: "", component: CoursesComponent },
    { path: "framework", component: FrameworkComponent}
];
