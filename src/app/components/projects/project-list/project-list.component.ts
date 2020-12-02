import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  joinedProjects$: Observable<Project[]>;
  notJoinedProjects$: Observable<Project[]>;
  archivedProjects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.notJoinedProjects$ = this.projectService.getNotJoinedProjects();
    this.joinedProjects$ = this.projectService.getJoinedProjects();
    this.archivedProjects$ = this.projectService.getArchivedProjects();
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
