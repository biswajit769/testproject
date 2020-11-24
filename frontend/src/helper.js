export function formatPrice(price) {
  return price
    ? "₹" + price.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")
    : "₹0.00";
}

export function truncateText(textstring, maxlength) {
  return textstring.length > maxlength
    ? textstring.substring(0, maxlength) + "..."
    : textstring;
}

function filterData(prod,filterattr) {
  const newArray = prod.filter(function (el) {
    return el["pcategoryids"].includes(filterattr)
  });
  return newArray;
}

export function arrangeproducts(products) {
  const upcomingProducts = filterData(products,"upcoming");
  const newProducts = filterData(products,"new");
  const topUserPicksProducts = filterData(products,"top user picks");
  return{
    upcomingProducts,
    newProducts,
    topUserPicksProducts
  }

}

export function productAvailabilityStatus(prodcount) {
  let availabilityMsg = "";
  /*switch (prodcount) {
    case prodcount<10:
      return "Selling Out Soon";
      break;
    case 0:
      return "Ticket Sale Has Ended";
      break;
  }*/
  if (prodcount < 10) {
    availabilityMsg = "Selling Out Soon";
  } else if (prodcount == 0) {
    availabilityMsg = "Ticket Sale Has Ended";
  }
  return availabilityMsg;
}

export function formatDate(datestr) {
  let date = new Date(datestr);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  };
  return date.toLocaleString("en-US", options);
}

export function getNameInitial(name) {
  let initials = '';
  if(name.indexOf(' ') >= 0){
    initials = name.split(' ').slice(0, -1).join(' ');
  }else{
    initials = name;
  }
  return initials;
}

export const parentCategories = [
  {
    id: 1,
    title: "upcoming",
  },
  {
    id: 2,
    title: "new",
  },
  {
    id: 3,
    title: "top user picks",
  },
];

export const eventCategories = [
  {
    id: 1,
    title: "Education & Family",
  },
  {
    id: 2,
    title: "Entertainment & Visual Arts",
  },
  {
    id: 3,
    title: "Food & Drink",
  },
  {
    id: 4,
    title: "Fitness & Health",
  },
  {
    id: 5,
    title: "Home & Lifestyle",
  },
  {
    id: 6,
    title: "Community & Spirituality",
  },
  {
    id: 8,
    title: "Other",
  },
];

let monthArry = {
  "0":"Jan",
  "1":"Feb",
  "2":"March",
  "3":"April",
  "4":"May",
  "5":"June",
  "6":"July",
  "7":"August",
  "8":"Sept",
  "9":"October",
  "10":"Nov",
  "11":"Dec"
}

export function getMonthInit(monthint){
return monthArry[monthint];
}

export default {
  formatPrice,
  parentCategories,
  eventCategories,
  truncateText,
  productAvailabilityStatus,
  formatDate,
  arrangeproducts,
  getNameInitial,
  getMonthInit
};
