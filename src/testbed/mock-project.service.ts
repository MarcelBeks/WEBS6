import { of } from 'rxjs';
import { Project } from 'src/app/models/project';

export class MockProjectService {

  getNotJoinedProjects() {
    // return of([
    //   { id: '1', title: 'Project 1', owner: '1', archived: false, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] },
    //   { id: '2', title: 'Project 2', owner: '1', archived: false, members: { 1: {name: 'marcel', role: 'tester', userId: '1'}, 2: {name: 'kees', role: 'programmer', userId: '2'}}, sprints: ['1', '2']}
    // ])
  }

  getJoinedProjects() {
    return of([
      { id: '1', title: 'Project 1', owner: '1', archived: false, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] },
      { id: '2', title: 'Project 2', owner: '1', archived: false, members: { 1: {name: 'marcel', role: 'tester', userId: '1'}, 2: {name: 'kees', role: 'programmer', userId: '2'}}, sprints: ['1', '2']}
    ])
  }

  getArchivedProjects() {
    // return of([
    //   { id: '1', title: 'Project 1', owner: '1', archived: true, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] },
    //   { id: '2', title: 'Project 2', owner: '1', archived: true, members: { 1: {name: 'marcel', role: 'tester', userId: '1'}, 2: {name: 'kees', role: 'programmer', userId: '2'}}, sprints: ['1', '2']}
    // ])
  }

  updateArchivedStatusProject(project: Project) { 
    // project.archived = !project.archived;
  }

  getArchivedProject(id: string) {
    // return { id: '1', title: 'Project 1', owner: '1', archived: true, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] }
  }

  getProjectNotObservable(id: string) {
    // return { id: '1', title: 'Project 1', owner: '1', archived: false, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] }
  }

  getProject(id: string) {
    // return of({ id: '1', title: 'Project 1', owner: '1', archived: false, members: { 1: { name: 'marcel', role: 'tester', userId: '1' }, 2: { name: 'kees', role: 'programmer', userId: '2' } }, sprints: ['1', '2'] })
  }

  createProject() { }

  joinProject(project: Project, user: any) { }

  updateProject() { }
}