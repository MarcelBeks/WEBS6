import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { of } from 'rxjs';
import { MockProjectService } from 'src/testbed/mock-project.service';
import { ResourceHelper } from 'src/testbed/resource-helper';

describe('ProjectService', () => {
	let service: ProjectService;
	let spy: any;
	let rh: ResourceHelper;

	const fakeAFS = jasmine.createSpyObj( 'AngularFirestore', [ 'collection' ]);
	fakeAFS.collection.and.returnValue(jasmine.createSpyObj( 'collection', [ 'doc', 'snapshotChanges', 'valueChanges', 'add' ]));
	fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj( 'doc', ['valueChanges', 'update']));

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: AngularFirestore, useValue: fakeAFS },
				{ provide: service, useClass: MockProjectService }
      ]
		});
		rh = new ResourceHelper;
		service = TestBed.inject(ProjectService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('getJoinedProjects gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'getJoinedProjects').and.callThrough();
		TestBed.get(ProjectService).getJoinedProjects();

		expect(spy).toHaveBeenCalled();
	});

	it('getNotJoinedProjects gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'getNotJoinedProjects').and.callThrough();
		TestBed.get(ProjectService).getNotJoinedProjects();

		expect(spy).toHaveBeenCalled();
	});
	
	it('getAllProjects gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'getAllProjects').and.callThrough();
		TestBed.get(ProjectService).getAllProjects();

		expect(spy).toHaveBeenCalled();
	});

	it('getArchivedProjects gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'getArchivedProjects').and.callThrough();
		TestBed.get(ProjectService).getArchivedProjects();

		expect(spy).toHaveBeenCalled();
	});

	it('getProject gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'getProject').and.callThrough();
		TestBed.get(ProjectService).getProject();

		expect(spy).toHaveBeenCalled();
	});

	it('joinProject gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'joinProject').and.callThrough();
		TestBed.get(ProjectService).joinProject(rh.getProjects(1)[0], TestBed.get(AuthService).user);

		expect(spy).toHaveBeenCalled();
	});

	it('updateProject gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'updateProject').and.callThrough();
		TestBed.get(ProjectService).updateProject(rh.getProjects(1)[0]);

		expect(spy).toHaveBeenCalled();
	});

	it('updateArchivedStatusProject gets called', () => {
		spy = spyOn(TestBed.get(ProjectService), 'updateArchivedStatusProject').and.callThrough();
		TestBed.get(ProjectService).updateArchivedStatusProject(rh.getProjects(1)[0]);

		expect(spy).toHaveBeenCalled();
	});
});
