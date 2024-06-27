import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courselist: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = "" ;
  uniqueSubjects: string [] = [];
  selectedSubject: string = "";
  frameworkList: Course[] = [];
  
  constructor(private coursesservice : CoursesService) {}

  ngOnInit() {
    this.coursesservice.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourses = data;
      this.removeDups();
    })
  }

  sortCourseCode() {
    this.courselist.sort((a,b) => a.courseCode.localeCompare(b.courseCode))
  };

  sortCourseName() {
    this.courselist.sort((a,b) => a.courseName.localeCompare(b.courseName))
  };

  applyFilter(): void {
    this.filteredCourses = this.courselist.filter((course) => 
      course.courseName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  removeDups(): void {
    const subjectsSet = new Set<string>();
    this.filteredCourses.forEach(course => subjectsSet.add(course.subject));
    this.uniqueSubjects = Array.from(subjectsSet);
  }

  filterSubjects(): void {
    this.filteredCourses = this.courselist.filter((course) => 
      course.subject.toLowerCase().includes(this.selectedSubject.toLowerCase())
    );
  }
  addcourse(course: Course): void {
    if(!this.frameworkList.includes(course)) {
      this.frameworkList.push(course);
    }
  }
    
}
