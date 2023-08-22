import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Todo } from '../types/todos';
import { TodoTrackerError } from '../types/todoAppError';

describe('DataService Tests', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  let testTodos: Todo[] = [
    {
      id: '0be9d253-db4b-4847-9979-462d6774c75f',
      todoId: 'TD634',
      title: 'Documentary',
      description: 'Watch a documentary about the opioid crisis in the U.S.',
      tags: ['documentary', 'leisure', 'news'],
      status: 'PENDING',
      createdAt: '2023-08-14T10:07:49.216Z',
      updatedAt: '2023-08-14T10:07:49.216Z',
    },
    {
      id: '939a88a7-715e-41cf-9f20-86b7b87d365c',
      todoId: 'TD165',
      title: 'Buying Books',
      description:
        'Remember to buy the whole collection of Tintin and Asterix.',
      tags: ['books', 'leisure'],
      status: 'IN PROGRESS',
      createdAt: '2023-08-14T10:03:59.790Z',
      updatedAt: '2023-08-14T10:10:01.206Z',
    },
    {
      id: '4a1b48cf-435a-4f6d-81f5-ee3606386393',
      todoId: 'TD327',
      title: 'Movie',
      description: 'Rewatch Spiderman: Into the Spiderverse.',
      tags: ['movie', 'leisure'],
      status: 'DONE',
      createdAt: '2023-08-14T10:09:19.693Z',
      updatedAt: '2023-08-14T10:10:42.333Z',
    },
    {
      id: '5c37bc7e-b0b1-48ac-a7e5-06e683d67537',
      todoId: 'TD754',
      title: 'Formula 1',
      description: 'Watch the Dutch GP.',
      tags: ['f1', 'leisure'],
      status: 'PENDING',
      createdAt: '2023-08-18T12:48:16.292Z',
      updatedAt: '2023-08-18T12:48:16.292Z',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all books', () => {
    service.getAllTodos().subscribe({
      next: (data: Todo[] | TodoTrackerError) => {
        if (data instanceof TodoTrackerError) {
          expect(data.friendlyMessage).toBe(
            'An Error occured retrieving data.'
          );
        } else {
          expect(data.length).toBe(4);
        }
      },
    });

    let todosRequest: TestRequest = httpTestingController.expectOne(
      'http://localhost:8000/todos/'
    );

    expect(todosRequest.request.method).toEqual('GET');

    todosRequest.flush(testTodos);
  });

  it('should return Error', () => {
    service.getAllTodos().subscribe({
      next: (data: Todo[] | TodoTrackerError) =>
        fail('This should have been an error'),
      error: (err: TodoTrackerError) => {
        expect(err.errorNumber).toEqual(404);
        expect(err.friendlyMessage).toBe('An Error occured retrieving data.');
      },
    });

    let todosRequest: TestRequest = httpTestingController.expectOne(
      'http://localhost:8000/todos/'
    );

    todosRequest.flush('Error', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
