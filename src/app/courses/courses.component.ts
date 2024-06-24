import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courselist: Course[] = [];
  
  constructor(private coursesservice : CoursesService) {}

  ngOnInit() {
    this.coursesservice.getCourses().subscribe(data => {
      this.courselist = data;
    })
  }
}
