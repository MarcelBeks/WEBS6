import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoryService } from 'src/app/services/story.service';
import { Sprint } from 'src/app/models/sprint';
import { Project } from 'src/app/models/project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sprint-storyboard',
  templateUrl: './sprint-storyboard.component.html',
  styleUrls: ['./sprint-storyboard.component.css']
})
export class SprintStoryboardComponent implements OnInit, OnChanges {

  @Input() public sprint: Sprint;
  @Input() public project: Project;
  @Input() public stories: Story[];

  available: Story[] = [];
  todo: Story[] = [];
  inprogress: Story[] = [];
  done: Story[] = [];

  error: boolean = false;
  errorText: string = "";

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.orderStories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.orderStories();
  }

  drop(event: CdkDragDrop<string[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.storyService.updateStatus(event.container.data[event.currentIndex]['id'], newStatus).then(res =>{
        this.error = false;
        this.errorText = '';
      }).catch(error => {
        this.error = true;
        this.errorText = '• ' + error.message;
      });
    }
  }

  orderStories() {
    this.available = []; this.todo = []; this.inprogress = []; this.done = [];
    this.stories.forEach(story => {
      if(story.status == 'available'){
        this.available.push(story);
      }
      if(story.status == 'todo'){
        this.todo.push(story);
      }
      if(story.status == 'inprogress'){
        this.inprogress.push(story);
      }
      if(story.status == 'done'){
        this.done.push(story);
      }
    })
  }

  throwError(errorInfo: any) {
    this.error = errorInfo.error;
    this.errorText = errorInfo.errorText;
  }

  trackByFn(index, story) {
    return story.id;
  }

}
