import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'tr[app-project-item]',
	templateUrl: './project-item.component.html',
	styleUrls: ['./project-item.component.css'],
})
export class ProjectItemComponent implements OnInit {
	@Input()
	public project: Project;

	constructor(
		public authService: AuthService,
		public projectService: ProjectService
	) {}

	ngOnInit(): void {
	}

	joinProject(project, user) {
		this.projectService.joinProject(project, user);
	}

	getOwnerName(userId: string) {
		return Object.values(this.project.members).find((member: any) => member['userId'] === userId)['name'];
	}
}
