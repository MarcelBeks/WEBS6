import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {

  @Input()
  public project: Project;

  editProject: Project;
  editing: boolean = false;
  
  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
  }

  prepareEdit(project: Project) {
    this.editProject = cloneDeep(project);
    this.editing = true;
  }

  cancelEdit(){
    this.editing = false;
    this.editProject = null;
  }

  updateProject(project: Project){
    this.editing = false;
    this.projectService.updateProject(project);
  }

}
