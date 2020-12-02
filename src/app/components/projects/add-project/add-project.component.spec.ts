import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AddProjectComponent', () => {
	let component: AddProjectComponent;
	let fixture: ComponentFixture<AddProjectComponent>;
	let spy: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports:[FormsModule],
			declarations: [AddProjectComponent],
			providers: [
				{ provide: ProjectService, useClass: MockProjectService },
				{ provide: AuthService, useClass: MockAuthService }
      ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('service called on story creation', () => {
		spy = spyOn(TestBed.get(ProjectService), 'createProject');
		component.createProject();
		expect(spy).toHaveBeenCalled();
	});
});
