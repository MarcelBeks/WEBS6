import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './components/layout/menubar/menubar.component';
import { ContentComponent } from './components/layout/content/content.component';
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectItemComponent } from './components/projects/project-list/project-item/project-item.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { JoinedProjectItemComponent } from './components/projects/project-list/joined-project-item/joined-project-item.component';
import { AuthGuard } from './core/auth.guard';
import { ArchivedProjectItemComponent } from './components/projects/project-list/archived-project-item/archived-project-item.component';
import { ProjectMembersComponent } from './components/projects/project-dashboard/project-members/project-members.component';
import { ProjectSprintsComponent } from './components/projects/project-dashboard/project-sprints/project-sprints.component';
import { SprintService } from './services/sprint.service';
import { AddSprintComponent } from './components/projects/project-dashboard/project-sprints/add-sprint/add-sprint.component';
import { SprintStoryboardComponent } from './components/projects/project-dashboard/project-sprints/sprint-dashboard/sprint-storyboard/sprint-storyboard.component';
import { StoryboardStoryComponent } from './components/projects/project-dashboard/project-sprints/sprint-dashboard/sprint-storyboard/storyboard-story/storyboard-story.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectStoriesComponent } from './components/projects/project-dashboard/project-stories/project-stories.component';
import { AddStoryComponent } from './components/projects/project-dashboard/project-stories/add-story/add-story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditStoryComponent } from './components/projects/project-dashboard/project-stories/edit-story/edit-story.component';
import { SprintBurndownchartComponent } from './components/projects/project-dashboard/project-sprints/sprint-dashboard/sprint-burndownchart/sprint-burndownchart.component';
import { ReverseAuthCheckGuard } from './core/reverse-auth-check.guard';

@NgModule({
	declarations: [
		AppComponent,
		MenubarComponent,
		ContentComponent,
		routingComponents,
		ProjectListComponent,
		ProjectItemComponent,
		AddProjectComponent,
		JoinedProjectItemComponent,
		ArchivedProjectItemComponent,
		ProjectMembersComponent,
		ProjectSprintsComponent,
		AddSprintComponent,
		SprintStoryboardComponent,
		StoryboardStoryComponent,
		ProjectStoriesComponent,
		AddStoryComponent,
		EditStoryComponent,
		SprintBurndownchartComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase, 'taskmanager'),
		AngularFirestoreModule,
		AngularFireAuthModule,
		DragDropModule,
		BrowserAnimationsModule,
		MatDialogModule
	],
	providers: [AuthService, ProjectService, SprintService, AuthGuard, ReverseAuthCheckGuard],
	bootstrap: [AppComponent],
	entryComponents: []
})
export class AppModule {}
