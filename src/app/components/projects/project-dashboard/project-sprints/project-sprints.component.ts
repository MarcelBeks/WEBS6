import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Subscription, Observable } from 'rxjs';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/sprint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-sprints',
  templateUrl: './project-sprints.component.html',
  styleUrls: ['./project-sprints.component.css']
})
export class ProjectSprintsComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public project: Project;

  activeSprint: Observable<Sprint>;
  sprints: Observable<Sprint[]>;

  error: boolean = false;
  errorText: string = "";
  createActive = false;
  
  private subscriptions: Subscription[] = [];
  
  constructor(private sprintService: SprintService, private router: Router) { }

  ngOnInit(): void {
    this.activeSprint = this.sprintService.getActiveSprint(this.project);
    this.sprints = this.sprintService.getOtherSprints(this.project);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
  }

  ngOnChanges(): void {
    this.activeSprint = this.sprintService.getActiveSprint(this.project);
    this.sprints = this.sprintService.getOtherSprints(this.project);
  }

  changeActiveSprint(sprint: Sprint, activeSprint: Sprint) {
    sprint.active = !sprint.active;
    activeSprint.active = !sprint.active;
    this.sprintService.changeActiveSprint(sprint, activeSprint).then(res =>{
      this.error = false;
      this.errorText = '';
    }).catch(error => {
      this.error = true;
      this.errorText = '• ' + error.message;
    })
  }

  dashboard(sprint: Sprint) {
		this.router.navigate(['/projects/' + this.project.id + '/sprints/' + sprint.id + '/dashboard'])
  }

  addStories(sprint: Sprint) {
		this.router.navigate(['/projects/' + this.project.id + '/sprints/' + sprint.id + '/add-stories'])
  }
}
