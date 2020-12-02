import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoryService } from './story.service';
import { AuthService } from './auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { ResourceHelper } from 'src/testbed/resource-helper';
import { Observable } from 'rxjs';
import { MockStoryService } from 'src/testbed/mock-story.service';

describe('StoryService', () => {
  let service: StoryService;
  let rh: ResourceHelper;
  let spy: any

  const fakeAFS = jasmine.createSpyObj( 'AngularFirestore', [ 'collection' ]);
	fakeAFS.collection.and.returnValue(jasmine.createSpyObj( 'collection', [ 'doc', 'snapshotChanges', 'valueChanges', 'add' ]));
	fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj( 'doc', ['valueChanges', 'update']));

  const AngularFirestoreStub = {
    collection: (someString) => { },
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				{ provide: AuthService, useClass: MockAuthService },
        { provide: AngularFirestore, useValue: fakeAFS },
        { provide: service, useClass: MockStoryService }
      ]
    });
    service = TestBed.inject(StoryService);
    rh = new ResourceHelper;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStory gets called', () => {
		spy = spyOn(TestBed.get(StoryService), 'getStory').and.callThrough();
		TestBed.get(StoryService).getStory();

		expect(spy).toHaveBeenCalled();
  });

  it('updateStoryInfo gets called', () => {
		spy = spyOn(TestBed.get(StoryService), 'updateStoryInfo').and.callThrough();
		TestBed.get(StoryService).updateStoryInfo(rh.getStories(1)[0]);

		expect(spy).toHaveBeenCalled();
  });

  it('updateAssignee gets called', () => {
		spy = spyOn(TestBed.get(StoryService), 'updateAssignee').and.callThrough();
		TestBed.get(StoryService).updateAssignee(rh.getStories(1)[0], '1');

		expect(spy).toHaveBeenCalled();
  });

  it('updateStatus gets called', () => {
		spy = spyOn(TestBed.get(StoryService), 'updateStatus').and.callThrough();
		TestBed.get(StoryService).updateStatus('1', 'done');

    expect(spy).toHaveBeenCalled();
    
    TestBed.get(StoryService).updateStatus('1', 'available');
    expect(spy).toHaveBeenCalled();
  });

  it('updateArchivedStory gets called', () => {
		spy = spyOn(TestBed.get(StoryService), 'updateArchivedStory').and.callThrough();
		TestBed.get(StoryService).updateArchivedStory(rh.getStories(1)[0]);

		expect(spy).toHaveBeenCalled();
  });
});
