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
    //hämtar den senaste listan från behaviorsubject
    const currentCourses = this.coursesFramework.getValue();
  
    //skapar en ny lista med kurser genom att lägga till den nya kursen
    const updatedCourses = [...currentCourses, course]; 

    //uppdaterar courseframework listan med den nya lista av kurser
    this.coursesFramework.next(updatedCourses);

    this.saveCourses(updatedCourses); // sparar kurser efter att ha lagt till
    console.log('Current courses after adding:', updatedCourses);
  }

   saveCourses(courses: Course[]): void {
    // konvertera till JSON och spara i localStorage
    localStorage.setItem('coursesFramework', JSON.stringify(courses));
  }

  removeCourse(course: Course): void {
    // hämtar den senaste värdet av courseframework listan
    const currentCourses = this.coursesFramework.getValue();
    //jämför ifall kurskoden är lika, ifall de inte är de läggs de till i den nya listan, annars exkluderas den
    const updatedCourses = currentCourses.filter(c => c.courseCode !== course.courseCode);
    //uppdaterar coursesframework med den nya listan
    this.coursesFramework.next(updatedCourses);
    this.saveCourses(updatedCourses);
  }

   loadCourses(): void {
    // hämtar sparade kurser från localStorage vid start
    const savedCourses = localStorage.getItem('coursesFramework');
    if (savedCourses) {
      this.coursesFramework.next(JSON.parse(savedCourses));
    }
  }

}
