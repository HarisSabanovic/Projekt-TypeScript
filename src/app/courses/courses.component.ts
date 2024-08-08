import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';
import { FrameworkComponent } from '../framework/framework.component';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FrameworkComponent],
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
  paginatedCourses: Course[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  
  constructor(private coursesService : CoursesService, private sharedService : SharedService) {}

  ngOnInit() {

    this.sharedService.course$.subscribe(courses => {
      this.frameworkList = courses;
    });

    this.coursesService.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourses = data;
      this.updatePagination();
      this.removeDups();
    })
  }

  addCourse(course: Course): void {


    let isSame = this.frameworkList.some(function(c) {
      return c.courseCode.toLowerCase() === course.courseCode.toLowerCase();
    });

    if (isSame) {
      const errorNotification = document.getElementById("errorNotification") as HTMLDivElement;
      errorNotification.classList.remove("hidden");
      errorNotification.classList.add("show");

      setTimeout(() => {
        errorNotification.classList.remove("show");
        errorNotification.classList.add("hidden");
      }, 2000);

    } else {
      this.sharedService.addCourse(course);
      const notification = document.getElementById("notification") as HTMLDivElement;
      notification.classList.remove("hidden");
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hidden");
      }, 2000);

    }

    console.log('Course added:', course);
  }


  sortCourseCode() {
    this.courselist.sort((a,b) => a.courseCode.localeCompare(b.courseCode));
    this.updatePagination();
  }

  sortCourseName() {
    this.courselist.sort((a,b) => a.courseName.localeCompare(b.courseName));
    this.updatePagination();
  }

  sortCourseSubject() {
    this.courselist.sort((a,b) => a.subject.localeCompare(b.subject));
    this.updatePagination();
  }

  sortCoursePoints() {
    this.courselist.sort((a,b) => a.points - b.points);
    this.updatePagination();
  }

  applyFilter(): void {
    this.filteredCourses = this.courselist.filter((course) => 
      course.courseName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase())
    );

    this.currentPage = 1;
    this.updatePagination();
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

    this.currentPage = 1;
    this.updatePagination();
  }
  

  updatePagination(): void {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = Math.min(startIndex + this.itemsPerPage, this.filteredCourses.length);
    this.paginatedCourses = this.filteredCourses.slice(startIndex, endIndex);

    this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  previousPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if(this.currentPage < Math.ceil(this.filteredCourses.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePagination();
    }
  }



}
