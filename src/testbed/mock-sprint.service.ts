import { of } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';

export class MockSprintService {

  getSprint() {
    return of({ id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] })
  }

  getSprintNotObservable() {
    return { id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] }
  }

  getActiveSprint() {
    return of({ id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] })
  }

  getOtherSprints() {
    return of([
      { id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] },
      { id: '2', name: 'Sprint 2', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] },
      { id: '3', name: 'Sprint 3', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] }
    ])
  }

  createSprint(sprint: Sprint, error: boolean) { 
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(error);
  }

}