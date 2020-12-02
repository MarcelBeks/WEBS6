import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemComponent } from './project-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { DOMHelper } from 'src/testbed/dom-helper';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('ProjectItemComponent', () => {
	let component: ProjectItemComponent;
	let fixture: ComponentFixture<ProjectItemComponent>;
	let dh: DOMHelper<ProjectItemComponent>
	let rh: ResourceHelper;
	let spy: any

	beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProjectItemComponent],
			providers: [
				{ provide: ProjectService, useClass: MockProjectService },
				{ provide: AuthService, useClass: MockAuthService },
      ]
		}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
		rh = new ResourceHelper;
		component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call joinProject service function on Join button click', async(() => {
		spy = spyOn(TestBed.get(ProjectService), 'joinProject');
		fixture.detectChanges();
		component.project = rh.getProjects(1)[0];
		dh.clickButton('Join');

		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(rh.projects[0], TestBed.get(AuthService).user);
	}));
});
