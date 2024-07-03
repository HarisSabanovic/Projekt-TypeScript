import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';


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
  paginatedCourses: Course[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  
  constructor(private coursesService : CoursesService, private sharedService : SharedService) {}

  ngOnInit() {
    this.coursesService.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourses = data;
      this.updatePagination();
      //this.displayItem(data);
      this.removeDups();
    })


    this.loadSavedCourses();
  }

  addCourse(course: Course): void {
    this.sharedService.addCourse(course);
    console.log('Course added:', course);
    this.saveCourse();
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
    const startIndex: number = (this.currentPage) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.filteredCourses.slice(startIndex, endIndex);
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

  saveCourse() {
    localStorage.setItem("frameworkCourse", JSON.stringify(this.frameworkList));
  }
    
  loadSavedCourses() {
    let savedCourses = localStorage.getItem("frameworkCourse");
    if(savedCourses) {
      this.frameworkList = JSON.parse(savedCourses);
    }
  }


}
