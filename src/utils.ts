import { SortDirectionEnum } from "./components/GitHubRepoList";

export const compareDates = (dateA: Date, dateB: Date, direction: SortDirectionEnum): number => {
  if (direction === SortDirectionEnum.ASC) {
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  }
};

export const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateStr));
}

export const compareStrings = (string1: string, string2: string, direction: SortDirectionEnum): number => {
  return direction === SortDirectionEnum.ASC ? string1.localeCompare(string2): string2.localeCompare(string1);
};

export const compareNumbers = (num1: number, num2: number, direction: SortDirectionEnum): number => {
  return direction === SortDirectionEnum.ASC ? num1 - num2 : num2 - num1;
};
