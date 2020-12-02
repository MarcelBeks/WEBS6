import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDashboardComponent } from './sprint-dashboard.component';
import { SprintService } from 'src/app/services/sprint.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('SprintDashboardComponent', () => {
  let component: SprintDashboardComponent;
  let fixture: ComponentFixture<SprintDashboardComponent>;

  let activatedRoute =  { params: of({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SprintDashboardComponent ],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: SprintService, useClass: MockSprintService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
