import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'tr[app-archived-project-item]',
  templateUrl: './archived-project-item.component.html',
  styleUrls: ['./archived-project-item.component.css']
})
export class ArchivedProjectItemComponent implements OnInit {

  @Input() public project: Project;

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
	}

  archive() {
		this.projectService.updateArchivedStatusProject(this.project);
  }
  
  getOwnerName(userId: string) {
		return Object.values(this.project.members).find((member: any) => member['userId'] === userId)['name'];
	}

}
