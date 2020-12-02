import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private authService: AuthService, public firestore: AngularFirestore) {
		
	}

	getJoinedProjects(): Observable<Project[]> {
		return this.authService.firebaseAuth.user
      .pipe(switchMap((user) => {
        return this.firestore.collection('projects').valueChanges({ idField: 'id' })
          .pipe(map(projects => {
            return projects.filter((project: Project) => Object.keys(project.members).some(member => member === user.uid))
              .filter((project: Project) => project.archived == false)
          }))
      }))
  }
  
	getNotJoinedProjects(): Observable<Project[]> {
    return this.authService.firebaseAuth.user
      .pipe(switchMap((user) => {
        return this.firestore.collection('projects').valueChanges({ idField: 'id' })
          .pipe(map(projects => {
            return projects.filter((project: Project) => !Object.keys(project.members).some(member => member === user.uid))
              .filter((project: Project) => project.archived == false)
          }))
      }))
  }

  getAllProjects(): Observable<Project[]> {
    return this.firestore.collection('projects').valueChanges({ idField: 'id' });
  }
  
	getArchivedProjects(): Observable<Project[]> {
		return this.authService.firebaseAuth.user
      .pipe(switchMap((user) => {
        return this.firestore.collection('projects').valueChanges({ idField: 'id' })
          .pipe(map(projects => {
            return projects.filter((project: Project) => project.archived == true);
          }));
      }));
	}
  
  getProject(id: string): Observable<Project> {
    return this.firestore.collection('projects').doc(id).valueChanges();
	}

	createProject(projectTitle: string) {
    let newMembers : object = {};
    newMembers[this.authService.firebaseAuth.auth.currentUser.uid] = {
      userId: this.authService.firebaseAuth.auth.currentUser.uid,
      name: this.authService.firebaseAuth.auth.currentUser.displayName,
      role: 'Owner'
    }
		this.firestore.collection('projects').add({
			title: projectTitle,
			owner: this.authService.firebaseAuth.auth.currentUser.uid,
			members: newMembers,
      archived: false,
      sprints: [],
      id: null
		}).then(ref => {
      ref.set({id: ref.id}, {merge: true})
    });
	}

	joinProject(project: Project, user) {
		project.members[user.uid] = { 
      userId: user.uid,
      name: user.displayName,
      role: 'Member'
    };
		this.firestore.collection('projects').doc(project.id).update({members: project.members});
  }

  updateProject(project: Project) {
    this.firestore.collection('projects').doc(project.id).update(project);
  }
  
  updateArchivedStatusProject(project: Project) {
		this.firestore.collection('projects').doc(project.id).update({
			archived: !project.archived,
		});
	}
}
