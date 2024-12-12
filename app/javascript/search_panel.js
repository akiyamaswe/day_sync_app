document.addEventListener("turbo:load", function () {
  const searchPanelContainers = document.querySelectorAll(
    ".search-panel-container"
  );

  searchPanelContainers.forEach((container) => {
    const toggleButton = container.querySelector(".search-panel-toggle");
    const searchPanel = container.querySelector(".search-panel");
    const toggleIcon = container.querySelector(".toggle-icon");

    if (toggleButton && searchPanel) {
      searchPanel.style.display = "none";

      toggleButton.addEventListener("click", function () {
        if (searchPanel.style.display === "none") {
          searchPanel.style.display = "block";
          toggleIcon.textContent = "▼";
          toggleButton.classList.add("active");
        } else {
          searchPanel.style.display = "none";
          toggleIcon.textContent = "▶";
          toggleButton.classList.remove("active");
        }
      });
    }
  });
});
