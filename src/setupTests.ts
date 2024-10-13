import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";

// @ts-ignore
import { server } from "./mocks/server";
// import * as matchers from "@testing-library/jest-dom/matchers";
// import { expect } from "vitest";

// expect.extend(matchers);

// Establishing API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
