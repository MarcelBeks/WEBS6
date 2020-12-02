import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoriesToSprintComponent } from './add-stories-to-sprint.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoryService } from 'src/app/services/story.service';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddStoriesToSprintComponent', () => {
  let component: AddStoriesToSprintComponent;
  let fixture: ComponentFixture<AddStoriesToSprintComponent>;

  let activatedRoute = {
    paramMap: of({
      get: () => {}
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoriesToSprintComponent ],
      imports:[DragDropModule],
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
    fixture = TestBed.createComponent(AddStoriesToSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
