import moment from "moment";

export const formatDate = (date) => {
  const formatedDate = moment(date).format("YYYY-MM-DD");
  return formatedDate;
};

export const formatTime = (time) => {
  const formatedTime = moment(time, "HH:mm").format("hh:mm A");
  return formatedTime;
};
