import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AddStoryComponent } from './add-story.component';
import { StoryService } from 'src/app/services/story.service';
import { MockStoryService } from 'src/testbed/mock-story.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { DOMHelper } from 'src/testbed/dom-helper';
import { promise } from 'protractor';
import { FormsModule } from '@angular/forms';

describe('AddStoryComponent', () => {
  let component: AddStoryComponent;
  let fixture: ComponentFixture<AddStoryComponent>;
  let rh: ResourceHelper;
  let dh: DOMHelper<AddStoryComponent>
  let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddStoryComponent],
      providers: [
        { provide: StoryService, useClass: MockStoryService },
        { provide: ProjectService, useClass: MockProjectService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    dh = new DOMHelper(fixture);
    component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createStory to be called', () => {
    spy = spyOn(component, 'createStory')
    component.newStory.name = 'Test Story 1'
		fixture.detectChanges();

		dh.clickButton('Create');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });
  
  it('createStory to be called - create', () => {
    spy = spyOn(component, 'createStory').and.callThrough();
    component.newStory.name = 'Test Story 1'
		fixture.detectChanges();

		dh.clickButton('Create');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });

  it('should return no error on story creation', function (done) {
    component.newStory.name = 'Test Story 1'
		fixture.detectChanges();

		dh.clickButton('Create');
    fixture.detectChanges();
    
    TestBed.get(StoryService).createStory(component.newStory, false)
      .then(result => {
        component.error = result;
        fixture.detectChanges();

        expect(component.error).toBe(result);
        done();
      })
      .catch(done);
  });

  it('should return error on story creation', function (done) {
    component.newStory.name = 'Test Story 1'
		fixture.detectChanges();

		dh.clickButton('Create');
    fixture.detectChanges();
    
    TestBed.get(StoryService).createStory(component.newStory, true)
      .then(done)
      .catch(result => {
        component.error = result;
        fixture.detectChanges();
        
        expect(component.error).toBe(result);
        done();
      });
  });
});
