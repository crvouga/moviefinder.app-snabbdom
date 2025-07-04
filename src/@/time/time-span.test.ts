import { describe, expect, test } from "bun:test";
import { TimeSpan } from "./time-span";

describe("TimeSpan", () => {
  test("should return 'X year(s) ago' for year intervals", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(365))).toEqual("1 year");
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(365 * 2))).toEqual(
      "2 years"
    );
  });

  test("should return 'X month(s) ago' for month intervals", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(32))).toEqual("1 month");
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(64))).toEqual("2 months");
  });

  test("should return 'X day(s) ago' for day intervals", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(1))).toEqual("1 day");
    expect(TimeSpan.humanFriendlyString(TimeSpan.days(2))).toEqual("2 days");
  });

  test("should return 'X hour(s) ago' for hour intervals", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.hours(1))).toEqual("1 hour");
    expect(TimeSpan.humanFriendlyString(TimeSpan.hours(2))).toEqual("2 hours");
  });

  test("should return 'X minute(s) ago' for minute intervals", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.minutes(1))).toEqual(
      "1 minute"
    );
    expect(TimeSpan.humanFriendlyString(TimeSpan.minutes(2))).toEqual(
      "2 minutes"
    );
  });

  test("should return 'A moment ago' for intervals less than a minute", () => {
    expect(TimeSpan.humanFriendlyString(TimeSpan.seconds(30))).toEqual(
      "moment ago"
    );
  });
});
