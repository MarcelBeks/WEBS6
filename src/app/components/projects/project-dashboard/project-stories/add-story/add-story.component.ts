import { Component, OnInit, Input } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoryService } from 'src/app/services/story.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {

  newStory: Story = new Story

  error: boolean = false;
  errorText: string = "";
  
  @Input()
  project: Project;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  createStory() {
    if(!this.newStory.description){
      this.newStory.description = "";
    }
    if(!this.newStory.points){
      this.newStory.points = "";
    }
    if(!this.newStory.assignee){
      this.newStory.assignee = "";
    }

    this.newStory.status = 'available';
    this.newStory.archived = false;
    this.newStory.sprint = "";
    this.newStory.project = this.project.id;

    this.storyService.createStory(this.newStory).then(res =>{
      this.error = false;
      this.errorText = '';
    }).catch(error => {
      this.error = true;
      this.errorText = '• ' + error.message;
    });
    this.newStory = new Story;
  }

}
