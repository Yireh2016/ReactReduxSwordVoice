let dbDateToNormalDate = dbDate => {
  console.log("que es dbdate typeof objeto", typeof dbDate);

  if (typeof dbDate === "object") {
    console.log("dbdate es objeto", typeof dbDate);

    dbDate = JSON.stringify(dbDate);
  }
  console.log("dbdate", dbDate);
  console.log("dbDate.match(/d*[-|T]/g)", dbDate.match(/\d*[-|T]/g));
  console.log("dbdate typeof", typeof dbDate);

  if (dbDate.match(/\d*[-|T]/g)) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = "";

    date = dbDate.match(/\d*[-|T]/g);

    for (let i = 0; i < 3; i++) {
      date[i] = date[i].substring(0, date[i].length - 1);
    }

    date = `${months[parseInt(date[1]) - 1]} ${date[2]}th, ${date[0]}`;
    return date;
  }
  return "";
};

export default dbDateToNormalDate;
