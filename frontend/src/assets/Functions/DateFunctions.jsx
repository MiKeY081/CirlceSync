export function calculateDateTime(createdDate) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  let revealDate = "";

  if (daysDifference > 1) {
    // More than 1 day difference, format as full date
    revealDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(createdDate);
  } else if (createdDate.getMonth() !== currentDate.getMonth()) {
    // Within the same month, format as month and day
    revealDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(createdDate);
  } else if (daysDifference > 5) {
    // More than 5 days difference, show days ago with time
    revealDate = `${daysDifference} days ago at ${createdDate.toLocaleTimeString(
      "en-US"
    )}`;
  } else {
    // Less than 1 day difference, show time ago
    const hoursDifference = Math.floor(timeDifference / (1000 * 3600)); // Convert milliseconds to hours
    revealDate = `${hoursDifference} hours ago`;
  }
  return revealDate;
}

export const FormatedDate = (datetime) => {
  const formatedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(datetime);
  return formatedDate;
};
