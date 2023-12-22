import { default as format } from "date-fns/format";

const dateFormater = function(date) {
  return format(new Date(date), "MMMM d, yyyy");
};

export default {
  dateFormater
}