import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SprintService } from 'src/app/services/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { Story } from 'src/app/models/story';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-stories-to-sprint',
  templateUrl: './add-stories-to-sprint.component.html',
  styleUrls: ['./add-stories-to-sprint.component.css']
})
export class AddStoriesToSprintComponent implements OnInit, OnDestroy {

  sprint$: Observable<Sprint>;
  project$: Observable<Project>
  availableStories$: Observable<Story[]>
  sprintStories$: Observable<Story[]>

  private subscriptions: Subscription[] = [];

  availableList: Story[];
  sprintList: Story[];

  error: boolean = false;
  errorText: string = "";

  constructor(public sprintService: SprintService, public storyService: StoryService, public projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      this.sprint$ = this.sprintService.getSprint(params.get('id2'));
      this.project$ = this.projectService.getProject(params.get('id'));
      this.availableStories$ = this.storyService.getSprintlessStories(params.get('id'));
      this.sprintStories$ = this.storyService.getStoriesSprint(params.get('id2'));

      this.subscriptions.push(this.availableStories$.subscribe(stories => {
        this.availableList = [];
        this.availableList = stories;
      }))
  
      this.subscriptions.push(this.sprintStories$.subscribe(stories => {
        this.sprintList = [];
        this.sprintList = stories;
      }))
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
  }

  drop(event: CdkDragDrop<string[]>, newSprint: string, sprint: Sprint) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.storyService.AssignToSprint(event.container.data[event.currentIndex]['id'], newSprint, sprint, event.container.data[event.currentIndex]['points']).then(res =>{
        this.error = false;
        this.errorText = '';
      }).catch(error => {
        this.error = true;
        this.errorText = '• ' + error.message;
      });
    }
  }

  throwError(errorInfo: any) {
    this.error = errorInfo.error;
    this.errorText = errorInfo.errorText;
  }

  trackByFn(index, story) {
    return story.id;
  }

}
