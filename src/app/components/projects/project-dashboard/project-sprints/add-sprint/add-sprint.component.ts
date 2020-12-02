import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent implements OnInit {

  newSprint: Sprint = new Sprint;
  error: boolean = false;
  errorText: string = "";


  @Input()
  project: Project;

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
  }

  createSprint() {
    if(this.newSprint.startdate < this.newSprint.enddate){
      this.error = false;
      if(this.project.sprints.length > 0){
        this.newSprint.active = false;
      } else {
        this.newSprint.active = true;
      }
      this.newSprint.stories = [];
      this.sprintService.createSprint(this.newSprint, this.project).then(res =>{
        this.error = false;
        this.errorText = '';
      }).catch(error => {
        this.error = true;
        this.errorText = '• ' + error.message;
      });
      this.newSprint = new Sprint;
    } else {
      this.error = true;
      this.errorText = '• End date needs to be greater than start date';
    }
  }

}
