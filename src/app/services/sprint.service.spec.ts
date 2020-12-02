import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { SprintService } from './sprint.service';
import { AuthService } from './auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { MockSprintService } from 'src/testbed/mock-sprint.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { of } from 'rxjs';

describe('SprintService', () => {
  let service: SprintService;
  let spy: any;
  let rh: ResourceHelper;
  
  const fakeAFS = jasmine.createSpyObj( 'AngularFirestore', [ 'collection' ]);
	fakeAFS.collection.and.returnValue(jasmine.createSpyObj( 'collection', [ 'doc', 'snapshotChanges', 'valueChanges', 'add' ]));
  fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj('doc', ['valueChanges', 'update']));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				{ provide: AuthService, useClass: MockAuthService },
        { provide: AngularFirestore, useValue: fakeAFS },
        { provide: service, useClass: MockSprintService }
      ]
    });
    rh = new ResourceHelper;
    service = TestBed.inject(SprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSprint gets called', () => {
		spy = spyOn(TestBed.get(SprintService), 'getSprint').and.callThrough();
		TestBed.get(SprintService).getSprint();

		expect(spy).toHaveBeenCalled();
  });
  
  it('updateSprint gets called', () => {
		spy = spyOn(TestBed.get(SprintService), 'updateSprint').and.callThrough();
		TestBed.get(SprintService).updateSprint(rh.getSprints(1)[0]);

		expect(spy).toHaveBeenCalled();
  });
});
