let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".darkModeToggle");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");

  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log("enabled dark");
  } else {
    disableDarkMode();
    console.log("disabled dark");
  }
});
