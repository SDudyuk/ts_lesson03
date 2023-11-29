class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas = [];
  _lecturers = []; // Name, surname, position, company, experience, courses, contacts

  get areas() {
    this._areas;
  }

  get lecturers() {
    this._lecturers;
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

  removeLevel(): Level | undefined {
    return this._levels.pop();
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

  addGroup(group: Group) {
    this._groups.push(group);
  }

  removeGroup(): Group | undefined {
    return this._groups.pop();
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area;
  _status;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  //_studentsFix = new Uint8Array(this._students);

  constructor(directionName, levelName) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  showPerformance() {
    const sortedStudents = this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
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
