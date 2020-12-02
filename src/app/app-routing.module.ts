import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDashboardComponent } from './components/projects/project-dashboard/project-dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SprintDashboardComponent } from './components/projects/project-dashboard/project-sprints/sprint-dashboard/sprint-dashboard.component';
import { AddStoriesToSprintComponent } from './components/projects/project-dashboard/project-sprints/add-stories-to-sprint/add-stories-to-sprint.component'
import { AuthGuard } from './core/auth.guard';
import { ReverseAuthCheckGuard } from './core/reverse-auth-check.guard';

const routes: Routes = [
	{ 
		path: '',
		component: HomeComponent 
	},
	{ 
		path: 'authentication',
		component: AuthenticationComponent,
		canActivate: [ReverseAuthCheckGuard]
	},
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'projects/:id/dashboard',
		component: ProjectDashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'projects/:id/sprints/:id2/dashboard',
		component: SprintDashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'projects/:id/sprints/:id2/add-stories',
		component: AddStoriesToSprintComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
	HomeComponent,
	ProjectsComponent,
	ProjectDashboardComponent,
	AuthenticationComponent,
	SprintDashboardComponent,
	AddStoriesToSprintComponent
];
