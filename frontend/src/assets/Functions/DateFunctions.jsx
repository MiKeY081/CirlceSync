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
  } else if (daysDifference === 1) {
    // Exactly 1 day difference, show "Yesterday" with time
    revealDate = `Yesterday at ${createdDate.toLocaleTimeString("en-US")}`;
  } else if (createdDate.getMonth() !== currentDate.getMonth()) {
    // Within the same month, format as month and day
    revealDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(createdDate);
  } else if (timeDifference / (1000 * 3600) >= 1) {
    // Less than 24 hours difference, show time
    revealDate = `${createdDate.toLocaleTimeString("en-US")}`;
  } else if (timeDifference / (1000 * 60) >= 1) {
    // Less than 1 hr difference, show time ago
    const minDifference = Math.floor(timeDifference / (1000 * 60));
    revealDate = `${minDifference}m ago`;
  } else {
    // Less than 1 min difference, show time ago
    const secDifference = Math.floor(timeDifference / 1000);
    revealDate = `${secDifference}sec ago`;
  }
  return revealDate;
}

export const FormattedDate = (datetime) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(datetime);
  return formattedDate;
};

// const convertDateFormat = (e) => {
//   // Check if a date is selected
//   console.log(dob);
//   // Convert the selected date to a JavaScript Date object
//   const jsDate = new Date(dob);

//   // Format the date to match the datetime format in your database (ISO-8601)
//   const formattedDate = jsDate
//     .slice(0, 19)
//     .replace("T", " ");
//   console.log(formattedDate);
//   // Update the state with the formatted date
//   setDob(formattedDate);
// };
