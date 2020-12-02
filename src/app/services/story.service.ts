import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(public firestore: AngularFirestore) { }

  getStory(id: string): Observable<Story> {
    return this.firestore.collection('stories').doc(id).valueChanges();
  }
  
  getStoriesSprint(sprintId: string): Observable<Story[]> {
    return this.firestore.collection('stories').valueChanges({ idField: 'id' })
      .pipe(map(stories => {
        return stories.filter((story: Story) => story.sprint == sprintId)
          .filter((story: Story) => story.archived == false)
      }))
  }

  getStoriesProject(projectId: string): Observable<Story[]> {
    return this.firestore.collection('stories').valueChanges({ idField: 'id' })
      .pipe(map(stories => {
        return stories.filter((story: Story) => story.project == projectId)
          .filter((story: Story) => story.archived == false)
      }))
  }

  getArchivedStoriesProject(projectId: string): Observable<Story[]> {
    return this.firestore.collection('stories').valueChanges({ idField: 'id' })
      .pipe(map(stories => {
        return stories.filter((story: Story) => story.project == projectId)
          .filter((story: Story) => story.archived == true)
      }))
  }

  getSprintlessStories(projectId: string): Observable<Story[]> {
    return this.firestore.collection('stories').valueChanges({ idField: 'id' })
      .pipe(map(stories => {
        return stories.filter((story: Story) => story.project == projectId)
          .filter((story: Story) => story.archived == false)
            .filter((story: Story) => story.sprint == "")
      }))
  }

  getCompletedStoriesSprint(sprintId: string): Observable<Story[]> {
    return this.firestore.collection('stories').valueChanges({ idField: 'id' })
      .pipe(map(stories => {
        return stories.filter((story: Story) => story.sprint == sprintId)
          .filter((story: Story) => story.status == 'done')
            .filter((story: Story) => story.archived == false)
      }))
  }

  createStory(story: Story) {
    return this.firestore.collection('stories').add({
      name: story.name,
      description: story.description,
      points: story.points,
      assignee: story.assignee,
      status: story.status,
      archived: story.archived,
      sprint: story.sprint,
      project: story.project,
      doneAt: ''
    }).then(ref => {
      ref.set({id: ref.id}, {merge: true});
    });
  }

  updateStoryInfo(story: Story) {
    return this.firestore.collection('stories').doc(story.id).update({
      name: story.name,
      description: story.description,
      points: story.points,
      assignee: story.assignee
    })
  }

  updateAssignee(story: Story, newAssignee: string) {
		return this.firestore.collection('stories').doc(story.id).update({
			assignee: newAssignee,
		});
  }
  
  updateStatus(storyId: string, newStatus: string) {
    let today: Date = new Date();
    let doneAt: string;

    if(newStatus == 'done') doneAt = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
    else doneAt = "";

		return this.firestore.collection('stories').doc(storyId).update({
      status: newStatus,
      doneAt: doneAt
		});
  }

  updateArchivedStory(story: Story) {
		return this.firestore.collection('stories').doc(story.id).update({
			archived: !story.archived,
		});
  }
  
  AssignToSprint(storyId: string, sprintId: string, sprint: Sprint, points: string) {
		return this.firestore.collection('stories').doc(storyId).update({
      sprint: sprintId,
      status: 'available',
		}).then(ref => {
      if(sprintId == '') {
        sprint.stories.splice(sprint.stories.indexOf(storyId), 1)
      } else {
        sprint.stories.push(storyId);
      }
      
      this.firestore.collection('sprints').doc(sprint.id).update({
        stories: sprint.stories
      })
    });
  }
}
