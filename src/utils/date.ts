export const formatDateWithOrdinal = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "short" });

  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  return `${weekday}, ${month}. ${day}${suffix} ${year}`;
};

export const formatTimeInEST = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
};

export const formatTimeRange = (startTime: string, endTime: string) => {
  const startTimeString = formatTimeInEST(startTime);
  const endTimeString = formatTimeInEST(endTime);

  return `${startTimeString} - ${endTimeString}`;
};

export const displayTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
};
