import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryboardStoryComponent } from './storyboard-story.component';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('StoryboardStoryComponent', () => {
  let component: StoryboardStoryComponent;
  let fixture: ComponentFixture<StoryboardStoryComponent>;
  let rh: ResourceHelper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryboardStoryComponent],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryboardStoryComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper
    component.story = TestBed.get(StoryService).getStory();
    component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
