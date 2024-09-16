import { TaskLogsDto, TaskTimesheetDto } from '../_models/project';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {

  data: BehaviorSubject<TaskLogsDto[]> = new BehaviorSubject<
  TaskLogsDto[]
  >([]);

  currentData$ = this.data.asObservable();

  constructor() {}

  addData(newData: TaskLogsDto) {
    const currentValue = this.data.value;
    this.data.next([...currentValue, newData]);
  }

  deleteData(taskId: number) {
    const currentValue = this.data.value;
    const newData = currentValue.filter((data) => data.taskId !== taskId);
    this.data.next(newData);
  }

  updateData(taskId: number, newData: TaskLogsDto) {
    console.log(newData);
    const currentValue = this.data.value;
    const data = currentValue.map((data) =>
      data.taskId === taskId ? newData : data
    );
    this.data.next(data);
  }

  clearData() {
    this.data.next([]);
  }

  getData(index : number) {
    const currentValue = this.data.value;
    return currentValue.find((data) => data.taskId === index);
  }

  getTaskLogsDto() {
    return this.data.value;
  }

  setData(data: TaskLogsDto[]) {
    data.forEach(element => {
      this.addData(element);
    });
  }
}
