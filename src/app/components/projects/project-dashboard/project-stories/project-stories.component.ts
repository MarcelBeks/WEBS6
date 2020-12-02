import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story';
import { StoryService } from 'src/app/services/story.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-project-stories',
  templateUrl: './project-stories.component.html',
  styleUrls: ['./project-stories.component.css']
})
export class ProjectStoriesComponent implements OnInit {

  @Input()
  project: Project;

  stories$: Observable<Story[]>
  archivedStories$: Observable<Story[]>
  createActive: boolean = false;

  editing: boolean = false;
  editStory: Story = new Story;

  error: boolean = false;
  errorText: string = "";
  
  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.stories$ = this.storyService.getStoriesProject(this.project.id);
    this.archivedStories$ = this.storyService.getArchivedStoriesProject(this.project.id);
  }

  getAssigneeName(userId: string) {
    return Object.values(this.project.members).find((member: any) => member['userId'] === userId)['name'];
  }

  updateArchivedStory(story: Story) {
    this.storyService.updateArchivedStory(story).then(res =>{
      this.error = false;
      this.errorText = '';
    }).catch(error => {
      this.error = true;
      this.errorText = '• ' + error.message;
    });;
  }

  prepareEdit(story: Story) {
    this.editStory = cloneDeep(story);
    this.editing = true;
  }

  cancelEditing(editing: boolean) {
    this.editing = editing;
    this.editStory = null;
  }

  toggleVisibilityTable(table, button) {
		let elementTable = document.getElementById(table);
		let elementButton = document.getElementById(button);
		if(window.getComputedStyle(elementTable).visibility == 'hidden') {
			elementTable.style.visibility = 'visible';
			elementButton.innerHTML = 'Hide'
		} else {
			elementTable.style.visibility = 'hidden';
			elementButton.innerHTML = 'Show'
		}
	}

}
