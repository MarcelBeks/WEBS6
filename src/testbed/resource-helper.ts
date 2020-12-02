import { Project } from 'src/app/models/project';
import { Observable, of } from 'rxjs';
import { Story } from 'src/app/models/story';
import { Sprint } from 'src/app/models/sprint';

export class ResourceHelper {

  projects: Project[] = [];
  stories: Story[] = [];
  sprints: Sprint[] = [];

  getProjectsObservable(amount: number): Observable<Project[]> {
    for (let i = 0; i < amount; i++) {
      this.projects.push(
        { id: '' + (1 + i), title: 'Project ' + (1 + i), owner: '1', archived: false, members: { '1': {name: 'marcel', role: 'tester', userId: '1'}, '2': {name: 'kees', role: 'programmer', userId: '2'}}, sprints: ['1', '2'] }
      );
    }
    return of(this.projects);
  }

  getProjects(amount: number): Project[] {
    for (let i = 0; i < amount; i++) {
      this.projects.push(
        { id: '' + (1 + i), title: 'Project ' + (1 + i), owner: '1', archived: false, members: { '1': {name: 'marcel', role: 'tester', userId: '1'}, '2': {name: 'kees', role: 'programmer', userId: '2'}}, sprints: ['1', '2'] }
      );
    }
    return this.projects;
  }

  getStories(amount: number): Story[] {
    for (let i = 0; i < amount; i++) {
      this.stories.push(
        { id: '' + (1 + i), name: 'Story ' + (1 + i), points: '5', project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: null },
      );
    }
    return this.stories;
  }

  getStoriesObservable(amount: number): Observable<Story[]> {
    for (let i = 0; i < amount; i++) {
      this.stories.push(
        { id: '' + (1 + i), name: 'Story ' + (1 + i), points: '5', project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: null },
      );
    }
    return of(this.stories);
  }

  getSprints(amount: number): Sprint[] {
    for (let i = 0; i < amount; i++) {
      this.sprints.push(
        { id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] },
      );
    }
    return this.sprints;
  }

  getSprintsObservable(amount: number): Observable<Sprint[]> {
    for (let i = 0; i < amount; i++) {
      this.sprints.push(
        { id: '1', name: 'Sprint 1', startdate: '2020-05-31', enddate: '2020-06-01', dates: ['2020-05-31', '2020-06-01'], project: '1', active: true, stories: ['1', '2', '3', '4'] },
      );
    }
    return of(this.sprints);
  }
}