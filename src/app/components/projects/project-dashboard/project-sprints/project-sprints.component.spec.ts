import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintsComponent } from './project-sprints.component';
import { SprintService } from 'src/app/services/sprint.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectSprintsComponent', () => {
  let component: ProjectSprintsComponent;
  let fixture: ComponentFixture<ProjectSprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSprintsComponent],
      providers: [
        { provide: SprintService, useClass: MockSprintService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: Router, useClass: RouterTestingModule }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSprintsComponent);
    component = fixture.componentInstance;
    component.project = TestBed.get(ProjectService).getProjectNotObservable()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
