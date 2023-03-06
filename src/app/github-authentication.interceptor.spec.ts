import { TestBed } from '@angular/core/testing';

import { GithubAuthenticationInterceptor } from './github-authentication.interceptor';

describe('GithubAuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GithubAuthenticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GithubAuthenticationInterceptor = TestBed.inject(GithubAuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
