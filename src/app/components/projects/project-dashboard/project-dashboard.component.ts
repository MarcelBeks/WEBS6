import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Subscription, Observable } from 'rxjs';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit, OnDestroy {

  project$: Observable<Project>;
  private subscriptions: Subscription[] = [];

  constructor(public projectService: ProjectService, private activatedRoute: ActivatedRoute) { 
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.project$ = this.projectService.getProject(params['id']);
    }))
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
  }

}
