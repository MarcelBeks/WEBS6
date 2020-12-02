import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStoryboardComponent } from './sprint-storyboard.component';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

describe('SprintStoryboardComponent', () => {
  let component: SprintStoryboardComponent;
  let fixture: ComponentFixture<SprintStoryboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintStoryboardComponent],
      imports:[DragDropModule],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: SprintService, useClass: MockSprintService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintStoryboardComponent);
    component = fixture.componentInstance;
    component.stories = TestBed.get(StoryService).getStories();
    component.project = TestBed.get(ProjectService).getProjectNotObservable();
    component.sprint = TestBed.get(SprintService).getSprintNotObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
