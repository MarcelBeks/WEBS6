import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
	selector: 'tr[app-joined-project-item]',
	templateUrl: './joined-project-item.component.html',
	styleUrls: ['./joined-project-item.component.css'],
})
export class JoinedProjectItemComponent implements OnInit {

	@Input() public project: Project;

	constructor(public authService: AuthService, public projectService: ProjectService, private router: Router) {}

	ngOnInit(): void {
	}

	archive() {
		this.projectService.updateArchivedStatusProject(this.project);
	}

	dashboard() {
		this.router.navigate(['/projects/' + this.project.id + '/dashboard'])
	}

	getOwnerName(userId: string) {
		return Object.values(this.project.members).find((member: any) => member['userId'] === userId)['name'];
	}
}
