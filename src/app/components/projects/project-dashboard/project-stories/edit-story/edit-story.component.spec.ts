import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoryComponent } from './edit-story.component';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { FormsModule } from '@angular/forms';

describe('EditStoryComponent', () => {
  let component: EditStoryComponent;
  let fixture: ComponentFixture<EditStoryComponent>;
  let rh: ResourceHelper

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ EditStoryComponent ],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoryComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    component.project = rh.getProjects(1)[0];
    component.story = TestBed.get(StoryService).getStory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
