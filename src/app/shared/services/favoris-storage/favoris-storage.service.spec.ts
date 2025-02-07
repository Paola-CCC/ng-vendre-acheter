/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavorisStorageService } from './favoris-storage.service';

describe('Service: FavorisStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavorisStorageService]
    });
  });

  it('should ...', inject([FavorisStorageService], (service: FavorisStorageService) => {
    expect(service).toBeTruthy();
  }));
});
