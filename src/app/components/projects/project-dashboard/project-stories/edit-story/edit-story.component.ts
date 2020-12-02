import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoryService } from 'src/app/services/story.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit {

  @Input() story: Story;
  @Input() project: Project;

  @Output() public onCancel: EventEmitter<any> = new EventEmitter<any>();

  error: boolean = false;
  errorText: string = "";

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  editStory() {
    this.storyService.updateStoryInfo(this.story).then(res =>{
      this.error = false;
      this.errorText = '';
      this.cancel();
    }).catch(error => {
      this.error = true;
      this.errorText = '• ' + error.message;
    });
  }

  cancel() {
    this.onCancel.emit(false);
  }

}
