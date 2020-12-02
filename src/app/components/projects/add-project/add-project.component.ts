import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
	public projectTitle: string;

	constructor(public projectService: ProjectService) {}

	ngOnInit(): void {}

	createProject() {
		this.projectService.createProject(this.projectTitle);
	}
}
