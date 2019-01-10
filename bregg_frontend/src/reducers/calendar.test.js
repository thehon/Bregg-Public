import calendar from "./calendar";

const addDateAction = {
  'datesUnavailable': {'useravailabilities': '2018-10-19'},
  'type': 'UPDATE_UNAVAILABILITY'
}

const addNoDates = {
  'datesUnavailable': {},
  'type': 'UPDATE_UNAVAILABILITY'
}

const fetchDates = {
  'unavailabledays': ['2018-10-19', '2018-11-19','2018-12-19'],
  'type': 'FETCH_UNAVAILABILITY'
}

const largeCalendarState = {'datesUnavailable': ['2018-10-19', '2018-11-19','2018-12-19'], 'friendsUnavailable': []}

const expectedCalendarAdd = {'datesUnavailable': ['2018-10-19'], 'friendsUnavailable': []}
const expectedCalendarAdd1 = {'datesUnavailable': [undefined], 'friendsUnavailable': []}


describe('Calendar reducer tests', () => {
  test("should add unavailable calendar dates to reducer", () => {
    expect(calendar(undefined, addDateAction))
      .toEqual(expectedCalendarAdd);
  });

  test("should fetch all unavailable dates", () => {
    expect(calendar(undefined, fetchDates))
      .toEqual(largeCalendarState)
  });

  test("should add no dates", () => {
    expect(calendar(undefined, addNoDates))
      .toEqual(expectedCalendarAdd1)
  });


})