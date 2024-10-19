import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

const mockTimeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, mockTimeout);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();

    doStuffByInterval(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const mockPath = './pathToFile.txt';
  const mockFileContent = 'fileContent';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(expect.any(String), mockPath);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe(mockFileContent);
  });
});
