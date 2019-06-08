const dbDateToDatetime = date => {
  date = new Date(date);
  console.log("dbDateToDatetime date", date);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric"
  });
};

export default dbDateToDatetime;
