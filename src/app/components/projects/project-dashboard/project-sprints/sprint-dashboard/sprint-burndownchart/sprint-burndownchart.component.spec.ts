import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurndownchartComponent } from './sprint-burndownchart.component';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { DOMHelper } from 'src/testbed/dom-helper';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('SprintBurndownchartComponent', () => {
  let component: SprintBurndownchartComponent;
  let fixture: ComponentFixture<SprintBurndownchartComponent>;
  let rh: ResourceHelper;
  let dh: DOMHelper<SprintBurndownchartComponent>
  let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBurndownchartComponent ],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: SprintService, useClass: MockSprintService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurndownchartComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    dh = new DOMHelper(fixture);
    component.stories = rh.getStories(5);
    component.project = rh.getProjects(1)[0];
    component.sprint = rh.getSprints(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should trigger ngOnChanges', () => {
    spy = spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();

    expect(spy).toHaveBeenCalled();
  })
});
