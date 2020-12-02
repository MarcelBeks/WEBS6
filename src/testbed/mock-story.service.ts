import { of } from 'rxjs';
import { Story } from 'src/app/models/story';

export class MockStoryService {

  getStoriesProject(id: string) {
    return of([
      { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: false, assignee: '', description: '', doneAt: '' },
      { id: '2', name: 'Story 2', points: 2, project: '1', sprint: '', status: 'todo', archived: false, assignee: '', description: '', doneAt: '' },
      { id: '3', name: 'Story 3', points: 8, project: '1', sprint: '', status: 'inprogress', archived: false, assignee: '', description: '', doneAt: '' },
      { id: '4', name: 'Story 4', points: 12, project: '1', sprint: '', status: 'done', archived: false, assignee: '', description: '', doneAt: '' },
    ])
  }

  getArchivedStoriesProject(id: string) {
    return of([
      { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '2', name: 'Story 2', points: 2, project: '1', sprint: '', status: 'todo', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '3', name: 'Story 3', points: 8, project: '1', sprint: '', status: 'inprogress', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '4', name: 'Story 4', points: 12, project: '1', sprint: '', status: 'done', archived: true, assignee: '', description: '', doneAt: '' },
    ])
  }

  getStory() {
    return { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: '' }
  }

  getStories(id: string) {
    return [
      { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '2', name: 'Story 2', points: 2, project: '1', sprint: '', status: 'todo', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '3', name: 'Story 3', points: 8, project: '1', sprint: '', status: 'inprogress', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '4', name: 'Story 4', points: 12, project: '1', sprint: '', status: 'done', archived: true, assignee: '', description: '', doneAt: '' },
    ]
  }

  getStoriesSprint(id: string) {
    return of([
      { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '2', name: 'Story 2', points: 2, project: '1', sprint: '', status: 'todo', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '3', name: 'Story 3', points: 8, project: '1', sprint: '', status: 'inprogress', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '4', name: 'Story 4', points: 12, project: '1', sprint: '', status: 'done', archived: true, assignee: '', description: '', doneAt: '' },
    ])
  }

  getSprintlessStories(id: string) {
    return of([
      { id: '1', name: 'Story 1', points: 5, project: '1', sprint: '', status: 'available', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '2', name: 'Story 2', points: 2, project: '1', sprint: '', status: 'todo', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '3', name: 'Story 3', points: 8, project: '1', sprint: '', status: 'inprogress', archived: true, assignee: '', description: '', doneAt: '' },
      { id: '4', name: 'Story 4', points: 12, project: '1', sprint: '', status: 'done', archived: true, assignee: '', description: '', doneAt: '' },
    ])
  }

  createStory(story: Story, error: boolean) { 
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(error);
  }

  updateArchivedStory(story: Story, error: boolean) { 
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(error);
  }

}