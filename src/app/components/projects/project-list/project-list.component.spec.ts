import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from 'src/app/models/project';
import { DOMHelper } from 'src/testbed/dom-helper';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { of } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let dh: DOMHelper<ProjectListComponent>;
  let rh: ResourceHelper;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectListComponent],
      providers: [
        { provide: ProjectService, useClass: MockProjectService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    rh = new ResourceHelper;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('there should be three tables, when projects of all categories exist', () => {
    let projects: Project[] = rh.getProjects(3);
    component.joinedProjects$ = TestBed.get(ProjectService).getJoinedProjects();
    component.notJoinedProjects$ = of([projects[1]]);
    component.archivedProjects$ = of([projects[2]]);
    fixture.detectChanges();

    expect(dh.count('table')).toBe(3);
  });

  it('should call toggleVisibilityTable function on Show button click', async(() => {
    spy = spyOn(component, 'toggleVisibilityTable');
    component.archivedProjects$ = rh.getProjectsObservable(3);
    fixture.detectChanges();

    dh.clickButton('Show');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('archivedTable', 'archivedTableButton');
  }));

  it('Show table with toggleVisibilityTable function on Show button click', async(() => {
    component.archivedProjects$ = rh.getProjectsObservable(3);
    spy = spyOn(component, 'toggleVisibilityTable').and.callThrough();
    fixture.detectChanges();

    dh.clickButton('Show');
    fixture.detectChanges();

    expect(component.toggleVisibilityTable).toHaveBeenCalledWith('archivedTable', 'archivedTableButton');
  }));

  it('Hide table with toggleVisibilityTable function on Hide button click', async(() => {
    component.archivedProjects$ = rh.getProjectsObservable(3);
    spy = spyOn(component, 'toggleVisibilityTable').and.callThrough();
    fixture.detectChanges();

    dh.clickButton('Show');
    fixture.detectChanges();

    dh.clickButton('Hide');
    fixture.detectChanges();

    expect(component.toggleVisibilityTable).toHaveBeenCalledWith('archivedTable', 'archivedTableButton');
  }));
});
