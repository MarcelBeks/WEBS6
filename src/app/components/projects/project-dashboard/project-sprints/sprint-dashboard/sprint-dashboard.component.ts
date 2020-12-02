import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { Observable, Subscription } from 'rxjs';
import { SprintService } from 'src/app/services/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/models/story';
import { cloneDeep } from 'lodash';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.css']
})
export class SprintDashboardComponent implements OnInit, OnDestroy {

  sprint$: Observable<Sprint>;
  project$: Observable<Project>
  stories$: Observable<Story[]>
  editing: boolean = false;
  editSprint: Sprint;
  private subscriptions: Subscription[] = [];

  error: boolean = false;
  errorText: string = "";

  constructor(public sprintService: SprintService, public projectService: ProjectService, public storyService: StoryService, private activatedRoute: ActivatedRoute) {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.sprint$ = this.sprintService.getSprint(params['id2']);
      this.project$ = this.projectService.getProject(params['id']);
      this.stories$ = this.storyService.getStoriesSprint(params['id2']);
    }))
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
  }

  prepareEdit(sprint: Sprint) {
    this.editSprint = cloneDeep(sprint);
    this.editing = true;
  }

  cancelEdit(){
    this.error = false;
    this.editing = false;
    this.editSprint = null;
  }

  updateSprint(sprint: Sprint){
    if(sprint.startdate < sprint.enddate){
      this.sprintService.updateSprint(sprint).then(res =>{
        this.error = false;
        this.errorText = '';
        this.editing = false;
      }).catch(error => {
        this.error = true;
        this.errorText = '• ' + error.message;
      })
    } else {
      this.error = true;
      this.errorText = '• End date needs to be greater than start date';
    }
  }

}
