import { TestBed } from '@angular/core/testing';

import { LogResponseInterceptor } from './log-response.interceptor';

describe('LogResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogResponseInterceptor = TestBed.inject(LogResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
