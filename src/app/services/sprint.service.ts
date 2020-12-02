import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { Sprint } from '../models/sprint';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(public firestore: AngularFirestore) { }

  getSprint(id: string): Observable<Project> {
    return this.firestore.collection('sprints').doc(id).valueChanges();
	}

  getOtherSprints(project: Project): Observable<Sprint[]>{    
    return this.firestore.collection('sprints').valueChanges({ idField: 'id' })
      .pipe(map(sprints => {
        return sprints.filter((sprint: Sprint) => project.sprints.some(s => s === sprint.id))
          .filter((sprint: Sprint) => sprint.active == false)
      }))
  }

  getActiveSprint(project: Project): Observable<Sprint>{
    return this.firestore.collection('sprints').valueChanges({ idField: 'id' })
      .pipe(map(sprints => {
        return sprints.filter((sprint: Sprint) => project.sprints.some(s => s === sprint.id))
          .find((sprint: Sprint) => sprint.active == true)
      }))
  }

  changeActiveSprint(sprint: Sprint, activeSprint: Sprint) {
    return this.firestore.collection('sprints').doc(sprint.id).update({
			active: sprint.active,
    }).then(res => {
      this.firestore.collection('sprints').doc(activeSprint.id).update({
        active: activeSprint.active,
      });
    });
  }

  createSprint(sprint: Sprint, project: Project) {
    let dates = this.getDates(new Date(sprint.startdate), new Date(sprint.enddate))
    return this.firestore.collection('sprints').add({
      name: sprint.name,
      startdate: sprint.startdate,
      enddate: sprint.enddate,
      active: sprint.active,
      stories: sprint.stories,
      project: project.id,
      dates: dates
    }).then(ref => {
      ref.set({id: ref.id}, {merge: true})
      project.sprints.push(ref.id);
      this.firestore.collection('projects').doc(project.id).update({
        sprints: project.sprints
      })
    });
  }

  updateSprint(sprint: Sprint) {
    let dates = this.getDates(new Date(sprint.startdate), new Date(sprint.enddate))
    sprint.dates = dates;
    return this.firestore.collection('sprints').doc(sprint.id).update(sprint);
  }

  getDates(startDate, endDate) {
    var dates = [],
        currentDate: Date = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate.getFullYear() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentDate.getDate()).slice(-2));
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
}
