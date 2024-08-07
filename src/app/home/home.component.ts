import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  courseList: Course[] = [];

  constructor(private coursesService : CoursesService) {}

  ngOnInit() {
    this.coursesService.getCourses().subscribe(data => {
      this.courseList = data;
    })
  }
}
