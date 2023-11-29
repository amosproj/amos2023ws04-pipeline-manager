import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RestApiService } from './rest-api.service'; // 替换为你的服务文件路径

describe('RestApiService', () => {
  let service: RestApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestApiService] // 替换为你的服务类
    });

    service = TestBed.inject(RestApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get presigned URL', () => {
    const mockPresignedUrl = 'your-mock-presigned-url';

    service.getPresignedUrl().then((url: string) => {
      expect(url).toBe(mockPresignedUrl);
    });

    const req = httpMock.expectOne('apiURL/get-presigned-url');
    expect(req.request.method).toBe('GET');

    req.flush({ presigned_url: mockPresignedUrl });
  });

  it('should handle error', () => {
    const mockError = 'some error';

    service.getPresignedUrl().catch(error => {
      expect(error).toBe(mockError);
    });

    const req = httpMock.expectOne('apiURL/get-presigned-url');
    req.error(new ErrorEvent('Network error', { message: mockError }));
  });
});