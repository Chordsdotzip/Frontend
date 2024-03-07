import App from './App';
import { render, screen } from '@testing-library/react';
import { api } from './axiosInstance';
import { describe, vi, it, expect, beforeEach } from 'vitest';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    const message = screen.queryByText(/Extract Chords From Song/i);
    expect(message).toBeVisible();
  });
  describe('result page', () => {
    beforeEach(() => {
      Object.defineProperty(globalThis, 'window', {
        value: { location: { href: 'http://localhost:3000/result' } },
        writable: true,
      });
    });
    it('expected url', () => {
      expect(window.location.href).toBe('http://localhost:3000/result');
    });
  });
});

describe('API test', () => {
  const acceptedResult = { detail: [[]] };
  const rejectedResult = {
    detail: 'Method Not Allowed',
  };
  it('API POST called', async () => {
    const apiPost = vi.spyOn(api, 'post').mockImplementation(() => {
      return acceptedResult;
    });
    apiPost();
    expect(apiPost).toBeCalled();
  });
  it('API POST accepted', async () => {
    const apiPostSuccessfully = vi.spyOn(api, 'post').mockImplementation(() => {
      return acceptedResult;
    });
    const result = await apiPostSuccessfully();
    expect(result).toStrictEqual(acceptedResult);
  });
  it('API POST rejected', async () => {
    const apiPostFailure = vi.spyOn(api, 'post').mockImplementation(() => {
      return rejectedResult;
    });
    const result = await apiPostFailure();
    expect(result).toStrictEqual(rejectedResult);
  });
});