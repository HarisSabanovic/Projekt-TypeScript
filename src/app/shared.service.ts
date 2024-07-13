import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../app/model/course';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //en behaviorsubject som innehåller listan av kurser
  private coursesFramework = new BehaviorSubject<Course[]>([]);
  
  // gör listan till en observable så att komponenter kan prenumerera på det och använda den
  course$ = this.coursesFramework.asObservable();

  constructor() {
    // laddar sparade kurser vid initialisering
    this.loadCourses();
  } 

  addCourse(course: Course) {
    const currentCourses = this.coursesFramework.getValue();
    const updatedCourses = [...currentCourses, course];
    this.coursesFramework.next(updatedCourses);
    this.saveCourses(updatedCourses); // Spara kurser efter att ha lagt till
    console.log('Current courses after adding:', updatedCourses);
  }

   saveCourses(courses: Course[]): void {
    // Konvertera till JSON och spara i localStorage
    localStorage.setItem('coursesFramework', JSON.stringify(courses));
  }

  removeCourse(course: Course): void {
    const currentCourses = this.coursesFramework.getValue();
    const updatedCourses = currentCourses.filter(c => c.courseCode !== course.courseCode);
    this.coursesFramework.next(updatedCourses);
    this.saveCourses(updatedCourses);
    console.log('Current courses after removing:', updatedCourses);
  }

   loadCourses(): void {
    // Hämta sparade kurser från localStorage vid start
    const savedCourses = localStorage.getItem('coursesFramework');
    if (savedCourses) {
      this.coursesFramework.next(JSON.parse(savedCourses));
    }
  }

}
