// Input Fields
let dayInputField = document.querySelector("#day");
let monthInputField = document.querySelector("#month");
let yearInputField = document.querySelector("#year");

// Labels for errors
let labelDay = document.getElementsByTagName("label")[0];
let labelMonth = document.getElementsByTagName("label")[1];
let labelYear = document.getElementsByTagName("label")[2];

// Span for errors
let daySpan = document.querySelector("#day-span");
let monthSpan = document.querySelector("#month-span");
let yearSpan = document.querySelector("#year-span");

// Result Fields
let yearField = document.querySelector("#result-years");
let monthField = document.querySelector("#result-month");
let dayField = document.querySelector("#result-days");

function submit() {
  if (!checkErrors()) {
    let birth = `${Number(yearInputField.value)}-${Number(
      monthInputField.value
    )}-${Number(dayInputField.value)}`;

    let age = calculateAge(birth);

    yearField.innerHTML = age.years;
    monthField.innerHTML = age.months;
    dayField.innerHTML = age.days;
  } else {
    alert("Invalid values, check the fields and try again");
    return;
  }
}

function checkErrors() {
  let totalDays = daysInMonth(monthInputField.value, yearInputField.value);
  let actualYear = getActualYear();

  let dayInput = Number(dayInputField.value);
  let monthInput = Number(monthInputField.value);
  let yearInput = Number(yearInputField.value);

  let allFieldsError = false;

  let error = {
    hasError: true,
    errorField: "",
    errorMessage: "",
  };

  // check if all fields are numbers
  if (
    isNaN(Number(dayInputField.value)) ||
    isNaN(Number(monthInputField.value)) ||
    isNaN(Number(yearInputField.value))
  ) {
    error.hasError = true;

    // if error in all fields
  } else if (
    (dayInput < 1 || dayInput > totalDays) &&
    (monthInput < 1 || monthInput > 12) &&
    (yearInput < 1900 || yearInput > actualYear)
  ) {
    error.errorField = "day";
    error.errorMessage = "Must be a valid date";
    allFieldsError = true;
    // check day field
  } else if (dayInput < 1 || dayInput > totalDays) {
    error.errorField = "day";
    error.errorMessage = "Must be a valid day";

    // check month
  } else if (monthInput < 1 || monthInput > 12) {
    error.errorField = "month";
    error.errorMessage = "Must be a valid month";

    //check year
  } else if (yearInput < 1900 || yearInput > actualYear) {
    error.errorField = "year";
    error.errorMessage = "Must be a valid year";
  } else {
    error.hasError = false;
  }

  if (allFieldsError) {
    // all errors happen
    daySpan.style.color = "hsl(0, 100%, 67%)";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    monthSpan.style.color = "hsl(0, 100%, 67%)";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    yearSpan.style.color = "hsl(0, 100%, 67%)";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    daySpan.innerHTML = "Must be a valid day";
    monthSpan.innerHTML = "Must be a valid month";
    yearSpan.innerHTML = "Must be a valid year";
  } else if (error.hasError) {
    if (error.errorField == "day") {
      toggleErrorMessage("day");
      daySpan.innerHTML = error.errorMessage;
    } else if (error.errorField == "month") {
      toggleErrorMessage("month");
      monthSpan.innerHTML = error.errorMessage;
      monthSpan.setAttribute("class", "error");
    } else if (error.errorField == "year") {
      toggleErrorMessage("year");
      yearSpan.innerHTML = error.errorMessage;
      yearSpan.setAttribute("class", "error");
    }
  } else {
    hideErrorSpans();
  }
  return error.hasError;
}

function toggleErrorMessage(field) {
  function setAttributes(errorParam, fieldParam, label = "") {
    if (errorParam) {
      fieldParam.setAttribute("class", "error");
      if (label == "DAY") {
        labelDay.style.color = "hsl(0, 100%, 67%)";
      } else if (label == "MONTH") {
        labelMonth.style.color = "hsl(0, 100%, 67%)";
      } else if (label == "YEAR") {
        labelYear.style.color = "hsl(0, 100%, 67%)";
      }
    } else {
      fieldParam.removeAttribute("class");
      fieldParam.setAttribute("class", "hidden");
      if (label == "DAY") {
        labelDay.style.color = "hsl(0, 100%, 67%)";
        labelMonth.style.color = "hsl(0, 1%, 44%)";
        labelYear.style.color = "hsl(0, 1%, 44%)";
      } else if (label == "MONTH") {
        labelMonth.style.color = "hsl(0, 100%, 67%)";
        labelDay.style.color = "hsl(0, 1%, 44%)";
        labelYear.style.color = "hsl(0, 1%, 44%)";
      } else if (label == "YEAR") {
        labelYear.style.color = "hsl(0, 100%, 67%)";
        labelDay.style.color = "hsl(0, 1%, 44%";
        labelMonth.style.color = "hsl(0, 1%, 44%";
      }
    }
  }

  if (field == "day") {
    setAttributes(true, daySpan, "DAY");
    setAttributes(false, monthSpan, "DAY");
    setAttributes(false, yearSpan, "DAY");
  } else if (field == "month") {
    setAttributes(false, daySpan, "MONTH");
    setAttributes(true, monthSpan, "MONTH");
    setAttributes(false, yearSpan, "MONTH");
  } else if (field == "year") {
    setAttributes(false, daySpan, "YEAR");
    setAttributes(false, monthSpan, "YEAR");
    setAttributes(true, yearSpan, "YEAR");
  }
}

function daysInMonth(month, year) {
  let date = new Date(year, month, 0);
  return date.getDate();
}

function getActualYear() {
  let date = new Date();
  let actualYear = date.getFullYear();
  return actualYear;
}

function hideErrorSpans() {
  daySpan.style.display = "none";
  monthSpan.style.display = "none";
  yearSpan.style.display = "none";
  labelDay.style.color = "hsl(0, 1%, 44%";
  labelMonth.style.color = "hsl(0, 1%, 44%";
  labelYear.style.color = "hsl(0, 1%, 44%";
}

function calculateAge(birthDate) {
  let today = new Date();
  let start = new Date(birthDate);

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
    months--;
  }

  return {
    years: years,
    months: months,
    days: days,
  };
}
