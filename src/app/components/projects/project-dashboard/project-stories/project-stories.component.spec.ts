import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProjectStoriesComponent } from './project-stories.component';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { DOMHelper } from 'src/testbed/dom-helper';
import { MockComponent } from 'ng-mocks';
import { EditStoryComponent } from './edit-story/edit-story.component';

describe('ProjectStoriesComponent', () => {
  let component: ProjectStoriesComponent;
  let fixture: ComponentFixture<ProjectStoriesComponent>;
  let rh: ResourceHelper;
  let dh: DOMHelper<ProjectStoriesComponent>
  let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectStoriesComponent, MockComponent(EditStoryComponent)],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStoriesComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    dh = new DOMHelper(fixture);
    component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assignee should match with corresponding member name', () => {
    let story = rh.getStories(1)[0];
    story.assignee = Object.keys(component.project.members)[0].toString();
    fixture.detectChanges();

    let name = component.getAssigneeName(story.assignee);
    fixture.detectChanges();

    expect(name).toEqual(Object.values(component.project.members)[0]['name']);
  });

  it('prepareEdit to be called', () => {
    spy = spyOn(component, 'prepareEdit').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Edit');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });

  it('cancelEdit to be called on emit', fakeAsync(() => {
    spy = spyOn(component, 'cancelEditing').and.callThrough();
    component.editing = true;
    component.editStory = rh.getStories(1)[0];
    fixture.detectChanges();

    let childComponent = dh.find('app-edit-story');
    childComponent.triggerEventHandler('onCancel', false);

		expect(spy).toHaveBeenCalledWith(false);
  }));

  it('updateArchivedStory to be called on Archive with error', function (done) {
    spy = spyOn(component, 'updateArchivedStory').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Archive');
    fixture.detectChanges();
    
    TestBed.get(StoryService).updateArchivedStory({}, true)
      .then(done)
      .catch(result => {
        component.error = result;
        fixture.detectChanges();
        
        expect(component.error).toBe(result);
        done();
      });

		expect(spy).toHaveBeenCalled();
  });

  it('updateArchivedStory to be called on Archive without error', function (done) {
    spy = spyOn(component, 'updateArchivedStory').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Archive');
    fixture.detectChanges();
    
    TestBed.get(StoryService).updateArchivedStory({}, false)
      .then(done)
      .catch(result => {
        component.error = result;
        fixture.detectChanges();
        
        expect(component.error).toBe(result);
        done();
      });

		expect(spy).toHaveBeenCalled();
  });

  it('Show table with toggleVisibilityTable function on Show button click', async(() => {
		component.archivedStories$ = rh.getStoriesObservable(3);
		spy = spyOn(component, 'toggleVisibilityTable').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Show');
		fixture.detectChanges();

		expect(component.toggleVisibilityTable).toHaveBeenCalledWith('archivedTable', 'archivedTableButton');
	}));

	it('Hide table with toggleVisibilityTable function on Hide button click', async(() => {
		component.archivedStories$ = rh.getStoriesObservable(3);
		spy = spyOn(component, 'toggleVisibilityTable').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Show');
		fixture.detectChanges();

		dh.clickButton('Hide');
		fixture.detectChanges();

		expect(component.toggleVisibilityTable).toHaveBeenCalledWith('archivedTable', 'archivedTableButton');
	}));
});
