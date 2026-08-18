import "server-only";

import {
  timingSafeEqual,
} from "node:crypto";

const HEADER_NAME =
  "x-directti-automation-secret";

export function isAutomationAuthorized(
  request: Request,
) {
  const expected =
    process.env.N8N_AUTOMATION_SECRET?.trim();

  const received =
    request.headers
      .get(HEADER_NAME)
      ?.trim();

  if (!expected || !received) {
    return false;
  }

  const expectedBuffer =
    Buffer.from(expected);

  const receivedBuffer =
    Buffer.from(received);

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  );
}