import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { JoinedProjectItemComponent } from './joined-project-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { Router } from '@angular/router';
import { DOMHelper } from 'src/testbed/dom-helper';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('JoinedProjectItemComponent', () => {
	let component: JoinedProjectItemComponent;
	let fixture: ComponentFixture<JoinedProjectItemComponent>;
	let routerSpy = { navigate: jasmine.createSpy('navigate') };
	let dh: DOMHelper<JoinedProjectItemComponent>
	let rh: ResourceHelper;
	let spy: any

	beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [JoinedProjectItemComponent],
			providers: [
				{ provide: ProjectService, useClass: MockProjectService },
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: Router, useValue: routerSpy }
      ]
		}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedProjectItemComponent);
		component = fixture.componentInstance;
		dh = new DOMHelper(fixture);
		rh = new ResourceHelper;
		component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call updateArchivedStatusProject service function on Archive button click', async(() => {
		spy = spyOn(TestBed.get(ProjectService), 'updateArchivedStatusProject');
		fixture.detectChanges();
		component.project = rh.getProjects(1)[0];
		dh.clickButton('Archive');

		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(rh.projects[0]);
	}));

	it('url of clicked project', () => {
		component.project = rh.getProjects(1)[0];
		fixture.detectChanges();
		dh.clickButton('Dashboard');

		expect(routerSpy.navigate).toHaveBeenCalledWith(['/projects/' + rh.projects[0].id + '/dashboard']);
	});
});
