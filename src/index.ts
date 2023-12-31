enum ExperiencesEnum {
  Lower,
  Middle,
  Hight,
}
class Lecture {
  _name: string;
  _surname: string;
  _position: string;
  company: string;
  experience: ExperiencesEnum;
  courses: any[] = [];
  contacts: string;

  get fullName(): string {
    return `${this._surname} ${this._name}`;
  }
}
class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecture[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecture[] {
    return this._lecturers;
  }

  addArea(value: Area): void {
    this._areas.push(value);
  }

  removeArea(name: string): void {
    const index = this._areas.map((e) => e.name).indexOf(name);
    this._areas.splice(index, 1);
  }

  addLecture(value: Lecture): void {
    this._lecturers.push(value);
  }

  removeLecture(fullName: string): void {
    const index = this._lecturers.map((e) => e.fullName).indexOf(fullName);
    this._lecturers.splice(index, 1);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level) {
    this._levels.push(level);
  }

  removeLevel(name: string): void {
    const index = this._levels.map((e) => e.name).indexOf(name);
    this._levels.splice(index, 1);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  addGroup(group: Group) {
    this._groups.push(group);
  }

  removeGroup(name: string): void {
    const index = this._groups.map((e) => e.name).indexOf(name);
    this._groups.splice(index, 1);
  }
}

enum StatusEnum {
  Active = 1,
  Vacation = 0,
  Deducted = -1,
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area;
  _status: StatusEnum;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _directionName: string;
  _levelName: string;

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(fullName: string): void {
    const index = this._students.map((e) => e.fullName).indexOf(fullName);
    this._students.splice(index, 1);
  }

  set status(value: StatusEnum) {
    this._status = value;
  }

  get name(): string {
    return this._directionName;
  }

  showPerformance() {
    const sortedStudents: Student[] = this._students.sort(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

enum MarksEnum {
  Bad = 2,
  Satisfactory = 3,
  Good = 4,
  Excellent = 5,
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: number[] = []; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade(subjGrade: MarksEnum) {
    this._grades.push(subjGrade);
  }

  set visit(lessPresent: boolean) {
    this._visits.push(lessPresent);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
