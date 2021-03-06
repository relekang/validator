// @flow
/* eslint-env jest */
import duration from "../duration";

it("duration should return null for duration values", () => {
  expect(duration("field", {})).toBe(null);
  expect(duration("field", {years: 10})).toBe(null);
  expect(duration("field", {months: 10})).toBe(null);
  expect(duration("field", {years: 10, months: 10})).toBe(null);
});

it("duration should validate min value", () => {
  expect(duration("field", {}, {min: 0})).toBe(null);

  expect(duration("field", {years: 10}, {min: 120})).toBe(null);
  expect(duration("field", {months: 10}, {min: 10})).toBe(null);
  expect(duration("field", {years: 10, months: 10}, {min: 120})).toBe(null);

  expect(duration("field", {years: 10}, {min: 121})).toBe("duration.min");
  expect(duration("field", {months: 10}, {min: 11})).toBe("duration.min");
  expect(duration("field", {years: 10, months: 10}, {min: 131})).toBe("duration.min");
});

it("duration should validate min value from a field", () => {
  expect(duration("field", {}, {min: {field: "a"}, values: {}})).toBe(null);
  expect(duration("field", {}, {min: {field: "a"}, values: {a: null}})).toBe(null);
  expect(duration("field", {}, {min: {field: "a"}, values: {a: ""}})).toBe(null);
  expect(duration("field", {}, {min: {field: "a"}, values: {a: {}}})).toBe(null);

  expect(duration("field", {years: 10}, {min: {field: "a"}, values: {a: {years: 10}}})).toBe(null);
  expect(
    duration("field", {years: 10}, {min: {field: "a"}, values: {a: {years: 10, months: 0}}}),
  ).toBe(null);
  expect(duration("field", {months: 10}, {min: {field: "a"}, values: {a: {months: 10}}})).toBe(
    null,
  );
  expect(
    duration("field", {months: 10}, {min: {field: "a"}, values: {a: {years: 0, months: 10}}}),
  ).toBe(null);
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {min: {field: "a"}, values: {a: {years: 10, months: 10}}},
    ),
  ).toBe(null);
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {min: {field: "a"}, values: {a: {years: "10", months: "10"}}},
    ),
  ).toBe(null);
  expect(duration("field", {years: 10}, {min: {field: ""}, values: {}})).toBe(null);
  expect(duration("field", {years: 10}, {min: {field: undefined}, values: {}})).toBe(null);
  expect(duration("field", {years: 10}, {min: {field: null}, values: {}})).toBe(null);

  expect(
    duration("field", {years: 10}, {min: {field: "a"}, values: {a: {years: 10, months: 11}}}),
  ).toBe("duration.min.field");
  expect(duration("field", {months: 10}, {min: {field: "a"}, values: {a: {months: 11}}})).toBe(
    "duration.min.field",
  );
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {min: {field: "a"}, values: {a: {years: 10, months: 11}}},
    ),
  ).toBe("duration.min.field");
});

it("duration should validate max value", () => {
  expect(duration("field", {}, {max: 0})).toBe(null);

  expect(duration("field", {years: 10}, {max: 120})).toBe(null);
  expect(duration("field", {months: 10}, {max: 10})).toBe(null);
  expect(duration("field", {years: 10, months: 10}, {max: 130})).toBe(null);

  expect(duration("field", {years: 10}, {max: 119})).toBe("duration.max");
  expect(duration("field", {months: 10}, {max: 9})).toBe("duration.max");
  expect(duration("field", {years: 10, months: 10}, {max: 129})).toBe("duration.max");
});

it("duration should validate max value from a field", () => {
  expect(duration("field", {}, {max: {field: "a"}, values: {}})).toBe(null);
  expect(duration("field", {}, {max: {field: "a"}, values: {a: null}})).toBe(null);
  expect(duration("field", {}, {max: {field: "a"}, values: {a: ""}})).toBe(null);
  expect(duration("field", {}, {max: {field: "a"}, values: {a: {}}})).toBe(null);

  expect(duration("field", {years: 10}, {max: {field: "a"}, values: {a: {years: 10}}})).toBe(null);
  expect(
    duration("field", {years: 10}, {max: {field: "a"}, values: {a: {years: 10, months: 0}}}),
  ).toBe(null);
  expect(duration("field", {months: 10}, {max: {field: "a"}, values: {a: {months: 10}}})).toBe(
    null,
  );
  expect(
    duration("field", {months: 10}, {max: {field: "a"}, values: {a: {years: 0, months: 10}}}),
  ).toBe(null);
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {max: {field: "a"}, values: {a: {years: 10, months: 10}}},
    ),
  ).toBe(null);
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {max: {field: "a"}, values: {a: {years: "10", months: "10"}}},
    ),
  ).toBe(null);
  expect(duration("field", {years: 10}, {max: {field: ""}, values: {}})).toBe(null);
  expect(duration("field", {years: 10}, {max: {field: undefined}, values: {}})).toBe(null);
  expect(duration("field", {years: 10}, {max: {field: null}, values: {}})).toBe(null);

  expect(
    duration("field", {years: 10}, {max: {field: "a"}, values: {a: {years: 9, months: 11}}}),
  ).toBe("duration.max.field");
  expect(
    duration("field", {months: 10}, {max: {field: "a"}, values: {a: {years: 0, months: 9}}}),
  ).toBe("duration.max.field");
  expect(
    duration(
      "field",
      {years: 10, months: 10},
      {max: {field: "a"}, values: {a: {years: 10, months: 9}}},
    ),
  ).toBe("duration.max.field");
});
