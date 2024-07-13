import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../model/course';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.scss'
})
export class FrameworkComponent {
 frameworkList: Course[] = [];
 totalPoints: number = 0;


 constructor(private sharedservice : SharedService) {}

 ngOnInit() {
  this.sharedservice.course$.subscribe(courses => {
    this.frameworkList = courses;
    this.addPoints();
    console.log('Framework list:', this.frameworkList);
  })
 }

 removeCourse(course: Course):void {
  this.sharedservice.removeCourse(course);
 }

 addPoints(): void  {
  this.totalPoints = this.frameworkList.reduce((sum, course) => sum + course.points, 0)
 }
  
}
