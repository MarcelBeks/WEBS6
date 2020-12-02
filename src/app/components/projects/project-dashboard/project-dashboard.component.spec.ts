import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectDashboardComponent', () => {
  let component: ProjectDashboardComponent;
  let fixture: ComponentFixture<ProjectDashboardComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProjectDashboardComponent],
      providers: [
        { provide: ProjectService, useClass: MockProjectService },
				{ provide: AuthService, useClass: MockAuthService },
      ]
		}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
