import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from 'src/app/models/story';
import { Project } from 'src/app/models/project';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-storyboard-story',
  templateUrl: './storyboard-story.component.html',
  styleUrls: ['./storyboard-story.component.css']
})
export class StoryboardStoryComponent implements OnInit {

  @Input() public story: Story;
  @Input() public project: Project;

  @Output() public onError: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  updateAssignee(newAssignee: string) {
    this.storyService.updateAssignee(this.story, newAssignee).then(res =>{
      this.onError.emit({
        error: false,
        errorText: ''
      });
    }).catch((error) => {
      this.onError.emit({
        error: true,
        errorText: '• ' + error.message
      });
    });
  }

}
