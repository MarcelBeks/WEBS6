import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSprintComponent } from './add-sprint.component';
import { SprintService } from 'src/app/services/sprint.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { DOMHelper } from 'src/testbed/dom-helper';
import { FormsModule } from '@angular/forms';

describe('AddSprintComponent', () => {
  let component: AddSprintComponent;
  let fixture: ComponentFixture<AddSprintComponent>;
  let rh: ResourceHelper;
  let dh: DOMHelper<AddSprintComponent>
  let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddSprintComponent],
      providers: [
        { provide: SprintService, useClass: MockSprintService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSprintComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    dh = new DOMHelper(fixture);
    component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createSprint to be called', () => {
    spy = spyOn(component, 'createSprint')
    component.newSprint.name = 'Test Sprint 1'
    component.newSprint.startdate = '2020-06-11';
    component.newSprint.enddate = '2020-06-12';
		fixture.detectChanges();

		dh.clickButton('Create');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });
  
  it('createSprint to be called - create', () => {
    spy = spyOn(component, 'createSprint').and.callThrough();
    component.newSprint.name = 'Test Sprint 1';
    component.newSprint.startdate = '2020-06-11';
    component.newSprint.enddate = '2020-06-12';
		fixture.detectChanges();

		dh.clickButton('Create');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });

  it('should return no error on sprint creation', function (done) {
    component.newSprint.name = 'Test Sprint 1'
		fixture.detectChanges();

		dh.clickButton('Create');
    fixture.detectChanges();
    
    TestBed.get(SprintService).createSprint(component.newSprint, false)
      .then(result => {
        component.error = result;
        fixture.detectChanges();

        expect(component.error).toBe(result);
        done();
      })
      .catch(done);
  });

  it('should return error on sprint creation', function (done) {
    component.newSprint.name = 'Test Sprint 1'
		fixture.detectChanges();

		dh.clickButton('Create');
    fixture.detectChanges();
    
    TestBed.get(SprintService).createSprint(component.newSprint, true)
      .then(done)
      .catch(result => {
        component.error = result;
        fixture.detectChanges();
        
        expect(component.error).toBe(result);
        done();
      });
  });
});
