import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class MockAuthService {
  
  user$ = of({});
  user = {
    displayName: 'TestUser',
    uid: 1
  }

  firebaseAuth = {
    auth: {
      currentUser: {
        uid: 1
      }
    },
    user: {
      uid: 1,
      pipe: function () {
        
      }
    }
  }

}