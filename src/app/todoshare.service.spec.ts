import { TestBed } from '@angular/core/testing';

import { TodoshareService } from './todoshare.service';

describe('TodoshareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoshareService = TestBed.get(TodoshareService);
    expect(service).toBeTruthy();
  });
});
