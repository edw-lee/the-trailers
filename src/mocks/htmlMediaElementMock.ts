/**
 * Mocks for HTMLMediaElement to be used in tests
 * This should be imported in test setup files or at the beginning of test files
 * that test components using HTMLMediaElement (audio/video)
 */

// Store original implementation
const originalMediaElement = window.HTMLMediaElement.prototype;

// Mock implementation
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();
const mockLoad = jest.fn();
const mockAddTextTrack = jest.fn();
const mockCanPlayType = jest.fn().mockReturnValue("");

// Mock properties
const mockPaused = jest.fn().mockReturnValue(true);
const mockCurrentTime = {
  get: jest.fn().mockReturnValue(0),
  set: jest.fn(),
};
const mockDuration = jest.fn().mockReturnValue(0);
const mockVolume = {
  get: jest.fn().mockReturnValue(1),
  set: jest.fn(),
};
const mockMuted = {
  get: jest.fn().mockReturnValue(false),
  set: jest.fn(),
};
const mockReadyState = jest.fn().mockReturnValue(0);
const mockSeekable = jest.fn().mockReturnValue({
  length: 0,
  start: jest.fn(),
  end: jest.fn(),
});

/**
 * Setup HTMLMediaElement mocks
 */
export const setupMediaElementMocks = () => {
  // Mock methods
  window.HTMLMediaElement.prototype.play = mockPlay;
  window.HTMLMediaElement.prototype.pause = mockPause;
  window.HTMLMediaElement.prototype.load = mockLoad;
  window.HTMLMediaElement.prototype.addTextTrack = mockAddTextTrack;
  window.HTMLMediaElement.prototype.canPlayType = mockCanPlayType;

  // Mock properties
  Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
    get: mockPaused,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "currentTime", {
    get: mockCurrentTime.get,
    set: mockCurrentTime.set,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
    get: mockDuration,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "volume", {
    get: mockVolume.get,
    set: mockVolume.set,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "muted", {
    get: mockMuted.get,
    set: mockMuted.set,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "readyState", {
    get: mockReadyState,
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, "seekable", {
    get: mockSeekable,
    configurable: true,
  });
};

/**
 * Reset all mocks
 */
export const resetMediaElementMocks = () => {
  mockPlay.mockClear();
  mockPause.mockClear();
  mockLoad.mockClear();
  mockAddTextTrack.mockClear();
  mockCanPlayType.mockClear();

  mockPaused.mockClear();
  mockCurrentTime.get.mockClear();
  mockCurrentTime.set.mockClear();
  mockDuration.mockClear();
  mockVolume.get.mockClear();
  mockVolume.set.mockClear();
  mockMuted.get.mockClear();
  mockMuted.set.mockClear();
  mockReadyState.mockClear();
};

/**
 * Restore original HTMLMediaElement implementation
 */
export const restoreMediaElement = () => {
  // Restore original methods
  window.HTMLMediaElement.prototype = originalMediaElement;
};

// Export mock functions for individual testing
export const mediaElementMocks = {
  mockPlay,
  mockPause,
  mockLoad,
  mockAddTextTrack,
  mockCanPlayType,
  mockPaused,
  mockCurrentTime,
  mockDuration,
  mockVolume,
  mockMuted,
  mockReadyState,
  mockSeekable,
};
