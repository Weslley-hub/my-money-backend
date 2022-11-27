export const MonthKeys = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
];

export enum Month {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12
}

export type MonthKey = keyof typeof Month;

export enum MonthDescription {
  JANUARY = "Janeiro",
  FEBRUARY = "Fevereiro",
  MARCH = "Março",
  APRIL = "Abril",
  MAY = "Maio",
  JUNE = "Junho",
  JULY = "Julho",
  AUGUST = "Agosto",
  SEPTEMBER = "Setembro",
  OCTOBER = "Outubro",
  NOVEMBER = "Novemebro",
  DECEMBER = "Dezembro"
}
