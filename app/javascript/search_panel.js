document.addEventListener("turbo:load", function () {
  initializeSearchPanels();
});

document.addEventListener("turbo:render", function () {
  initializeSearchPanels();
});

function initializeSearchPanels() {
  const searchPanelContainers = document.querySelectorAll(
    ".search-panel-container"
  );

  searchPanelContainers.forEach((container) => {
    const toggleButton = container.querySelector(".search-panel-toggle");
    const searchPanel = container.querySelector(".search-panel");
    const toggleIcon = container.querySelector(".toggle-icon");
    const clearButton = container.querySelector(".search-clear");
    const searchForm = container.querySelector("form");

    if (toggleButton && !toggleButton.hasAttribute("data-initialized")) {
      toggleButton.setAttribute("data-initialized", "true");

      searchPanel.style.display = "none";
      toggleIcon.textContent = "▶";
      toggleButton.classList.remove("active");

      toggleButton.addEventListener("click", function () {
        toggleSearchPanel(searchPanel, toggleIcon, toggleButton);
      });
    }

    if (clearButton && !clearButton.hasAttribute("data-initialized")) {
      clearButton.setAttribute("data-initialized", "true");

      clearButton.addEventListener("click", async function (e) {
        e.preventDefault();

        const inputs = searchForm.querySelectorAll(
          "input[type='text'], input[type='date'], select"
        );

        inputs.forEach((input) => {
          if (input.tagName.toLowerCase() === "select") {
            input.selectedIndex = 0;
          } else {
            input.value = "";
          }
        });

        showSearchPanel(searchPanel, toggleIcon, toggleButton);

        try {
          const turboFrameId =
            searchForm.dataset.turboFrame || clearButton.dataset.turboFrame;

          if (!turboFrameId) {
            console.error("No turbo frame ID found");
            return;
          }

          const baseUrl = window.location.pathname;
          const turboFrame = document.querySelector(`#${turboFrameId}`);

          if (turboFrame) {
            await Turbo.visit(baseUrl, {
              frame: turboFrameId,
              action: "replace",
            });
          }
        } catch (error) {
          console.error("Error during clear operation:", error);
        }
      });
    }
  });
}

function showSearchPanel(panel, icon, button) {
  if (panel && icon && button) {
    panel.style.display = "block";
    icon.textContent = "▼";
    button.classList.add("active");
  }
}

function toggleSearchPanel(panel, icon, button) {
  if (panel.style.display === "none") {
    showSearchPanel(panel, icon, button);
  } else {
    panel.style.display = "none";
    icon.textContent = "▶";
    button.classList.remove("active");
  }
}
