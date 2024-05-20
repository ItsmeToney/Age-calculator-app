const inputDay = document.querySelector(".day__input");
const inputMonth = document.querySelector(".month__input");
const inputYear = document.querySelector(".year__input");
const yearAge = document.querySelector(".years");
const monthAge = document.querySelector(".months");
const daysAge = document.querySelector(".days");
const arrowImg = document.querySelector(".arrow__img");
const resetImg = document.querySelector(".reset__img");
const errorLabels = document.querySelectorAll(".error");
const inputFields = document.querySelectorAll(".input");
const labels = document.querySelectorAll(".label");
const ageOut = document.querySelectorAll(".age");
const errorDay = document.querySelector("#error__day");
const errorMonth = document.querySelector("#error__month");
const errorYear = document.querySelector("#error__year");
const now = new Date();
const errColorChange = function (type) {
  document.querySelector(`.${type}__input`).style.border =
    "1px solid hsl(0, 100%, 67%)";
  document.querySelector(`.${type}__label`).style.color = "hsl(0, 100%, 67%)";
};
const errDay = function () {
  if (inputDay.value === "") errorDay.textContent = "This field is required";
  else if (+inputDay.value > 31 || +inputDay.value < 1)
    errorDay.textContent = "Must be a valid day";
  errColorChange("day");
};

const errMonth = function () {
  if (!inputMonth.value) errorMonth.textContent = "This field is required";
  else if (+inputMonth.value > 12 || +inputMonth.value < 1)
    errorMonth.textContent = "Must be a valid month";
  errColorChange("month");
};
const errYear = function () {
  if (+inputYear.value > now.getFullYear())
    errorYear.textContent = "Must be in the past";
  else if (inputYear.value === "")
    errorYear.textContent = "This field is required";
  errColorChange("year");
};

const resetAge = function () {
  ageOut.forEach((e) => (e.textContent = " "));
};

const calculateAge = function () {
  const totalDaysPassed =
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()) -
      new Date(+inputYear.value, +inputMonth.value - 1, +inputDay.value)) /
    (1000 * 60 * 60 * 24);
  yearAge.textContent = Math.floor(totalDaysPassed / 365);
  const remainingDays = totalDaysPassed % 365;
  monthAge.textContent = Math.floor(remainingDays / 30);
  daysAge.textContent = Math.floor(remainingDays % 30);

  ageOut.forEach((e) => {
    e.style.opacity = 1;
  });
};

const invalidDate = function () {
  inputFields.forEach((e) => (e.style.border = "1px solid hsl(0, 100%, 67%)"));
  labels.forEach((e) => (e.style.color = "hsl(0, 100%, 67%)"));
  errorDay.textContent = "Must be a valid date";
};

const validDate = function (day, month, year) {
  const months_30_days = [4, 6, 9, 11];
  if (months_30_days.includes(month) && day > 30) return false;
  if (month === 2 && day > 28) return false;
  if (year === now.getFullYear()) {
    if (month > now.getMonth() + 1 || day > now.getDate()) return false;
  }
  return true;
};

const invalidInputs = function () {
  if (!inputDay.value || +inputDay.value < 1 || +inputDay.value > 31) {
    errDay();
  }
  if (!inputMonth.value || +inputMonth.value < 1 || +inputMonth.value > 12) {
    errMonth();
  }
  if (!inputYear.value || +inputYear.value > now.getFullYear()) {
    errYear();
  }
  resetAge();
};
const invalidConditions = function () {
  if (
    !inputDay.value ||
    +inputDay.value < 1 ||
    +inputDay.value > 31 ||
    !inputMonth.value ||
    +inputMonth.value < 1 ||
    +inputMonth.value > 12 ||
    !inputYear.value ||
    +inputYear.value > now.getFullYear()
  )
    return true;
};

const focusFunctions = function (type) {
  document.querySelector(`.${type}__input`).style.border =
    "1px solid hsl(259, 100%, 65%)";
  document.querySelector(`.${type}__label`).style.color = "hsl(0, 1%, 44%)";
  document.querySelector(`#error__${type}`).textContent = "";
};
const removeFocus = function (type1, type2) {
  document.querySelector(`.${type1}__input`).style.border =
    "1px solid hsl(0, 0%, 86%)";
  document.querySelector(`.${type2}__input`).style.border =
    "1px solid hsl(0, 0%, 86%)";
};
inputDay.addEventListener("focus", function () {
  focusFunctions("day");
});
inputMonth.addEventListener("focus", function () {
  focusFunctions("month");
});
inputYear.addEventListener("focus", function () {
  focusFunctions("year");
});

const resetInputs = function () {
  labels.forEach((e) => (e.style.color = "hsl(0, 1%, 44%)"));
  inputFields.forEach((e) => (e.style.border = "1px solid hsl(0, 0%, 86%)"));
  errorLabels.forEach((e) => (e.textContent = ""));
};

const ageCalculation = function () {
  if (invalidConditions()) {
    invalidInputs();
  } else {
    resetInputs();
    if (validDate(+inputDay.value, +inputMonth.value, +inputYear))
      calculateAge();
    else {
      invalidDate();
      resetAge();
    }
  }
};

arrowImg.addEventListener("click", function () {
  arrowImg.style.backgroundColor = "hsl(259, 100%, 65%)";

  ageCalculation();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    arrowImg.style.backgroundColor = "hsl(259, 100%, 65%)";
    ageCalculation();
  }
});

resetImg.addEventListener("click", function () {
  arrowImg.style.backgroundColor = "hsl(0, 0%, 8%)";
  inputFields.forEach((e) => (e.value = ""));
  ageOut.forEach((e) => {
    e.style.opacity = 0;
    e.style.marginRight = 0;
  });
  resetInputs();
  resetAge();
});
