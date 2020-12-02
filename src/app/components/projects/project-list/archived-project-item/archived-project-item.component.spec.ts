import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProjectItemComponent } from './archived-project-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { DOMHelper } from 'src/testbed/dom-helper';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('ArchivedProjectItemComponent', () => {
  let component: ArchivedProjectItemComponent;
  let fixture: ComponentFixture<ArchivedProjectItemComponent>;
  let dh: DOMHelper<ArchivedProjectItemComponent>
	let rh: ResourceHelper;
	let spy: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ArchivedProjectItemComponent],
			providers: [
				{ provide: ProjectService, useClass: MockProjectService },
      ]
		}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProjectItemComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
		rh = new ResourceHelper;
		component.project = rh.getProjects(1)[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateArchivedStatusProject service function on Dearchive button click', async(() => {
		spy = spyOn(TestBed.get(ProjectService), 'updateArchivedStatusProject');
		fixture.detectChanges();
		component.project = rh.getProjects(1)[0];
		dh.clickButton('Dearchive');

		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(rh.projects[0]);
	}));
});
