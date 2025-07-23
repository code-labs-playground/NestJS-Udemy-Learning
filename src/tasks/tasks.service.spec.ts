import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'admin',
  id: 'someId',
  password: 'password',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks() and returns the result', async () => {
      // Arrange: Set up mock data
      const mockTasks = [
        {
          id: '1',
          title: 'Test Task 1',
          description: 'Test Description 1',
          status: TaskStatus.OPEN,
          user: mockUser,
        },
        {
          id: '2',
          title: 'Test Task 2',
          description: 'Test Description 2',
          status: TaskStatus.IN_PROGRESS,
          user: mockUser,
        },
      ];

      // Mock the repository method to return our mock data
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue(mockTasks);

      // Act & Assert: Verify the method hasn't been called yet
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      // Act: Call the service method (without filter)
      const filterDto: GetTasksFilterDto = {};
      const result = await tasksService.getTasks(filterDto, mockUser);

      // Assert: Verify the repository method was called with correct parameters
      expect(tasksRepository.getTasks).toHaveBeenCalledWith(
        filterDto,
        mockUser,
      );
      expect(tasksRepository.getTasks).toHaveBeenCalledTimes(1);

      // Assert: Verify the result matches what we expected
      expect(result).toEqual(mockTasks);
    });

    it('calls TasksRepository.getTasks() with filter and returns filtered results', async () => {
      // Arrange: Set up filter and mock data
      const filterDto: GetTasksFilterDto = {
        status: TaskStatus.OPEN,
        search: 'test',
      };
      const mockFilteredTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: TaskStatus.OPEN,
          user: mockUser,
        },
      ];

      // Mock the repository method
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue(
        mockFilteredTasks,
      );

      // Act: Call the service method with filter
      const result = await tasksService.getTasks(filterDto, mockUser);

      // Assert: Verify the repository method was called with correct parameters
      expect(tasksRepository.getTasks).toHaveBeenCalledWith(
        filterDto,
        mockUser,
      );
      expect(result).toEqual(mockFilteredTasks);
    });

    it('returns empty array when no tasks are found', async () => {
      // Arrange: Mock empty result
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue([]);

      // Act: Call the service method
      const filterDto: GetTasksFilterDto = {};
      const result = await tasksService.getTasks(filterDto, mockUser);

      // Assert: Verify empty array is returned
      expect(result).toEqual([]);
      expect(tasksRepository.getTasks).toHaveBeenCalledWith(
        filterDto,
        mockUser,
      );
    });
  });
});
