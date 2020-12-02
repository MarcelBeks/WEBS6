import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersComponent } from './project-members.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenubarComponent } from 'src/app/components/layout/menubar/menubar.component';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { DOMHelper } from 'src/testbed/dom-helper';
import { FormsModule } from '@angular/forms';

describe('ProjectMembersComponent', () => {
  let component: ProjectMembersComponent;
  let fixture: ComponentFixture<ProjectMembersComponent>;
  let rh: ResourceHelper;
  let dh: DOMHelper<ProjectMembersComponent>
  let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
			declarations: [ProjectMembersComponent],
      providers: [
        { provide: ProjectService, useClass: MockProjectService },
				{ provide: AuthService, useClass: MockAuthService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersComponent);
    component = fixture.componentInstance;
    rh = new ResourceHelper;
    dh = new DOMHelper(fixture);
    component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prepareEdit to be called', () => {
    spy = spyOn(component, 'prepareEdit').and.callThrough();
		fixture.detectChanges();

		dh.clickButton('Edit');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(component.project);
  });

  it('cancelEdit to be called', () => {
    spy = spyOn(component, 'cancelEdit').and.callThrough();
    component.editing = true;
    component.editProject = rh.getProjects(1)[0];
		fixture.detectChanges();

		dh.clickButton('Cancel');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
  });

  it('updateProject to be called', () => {
    spy = spyOn(component, 'updateProject').and.callThrough();
    component.editing = true;
    component.editProject = rh.getProjects(1)[0];
		fixture.detectChanges();

		dh.clickButton('Save');
		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(component.editProject);
  });
});
