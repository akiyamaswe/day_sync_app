document.addEventListener("turbo:load", function () {
  initializeSearchPanels();
});

function initializeSearchPanels() {
  const searchPanelContainers = document.querySelectorAll(
    ".search-panel-container"
  );

  searchPanelContainers.forEach((container) => {
    setupTogglePanel(container);
    setupClearButton(container);
  });
}

function setupTogglePanel(container) {
  const toggleButton = container.querySelector(".search-panel-toggle");
  const searchPanel = container.querySelector(".search-panel");
  const toggleIcon = container.querySelector(".toggle-icon");

  if (toggleButton && !toggleButton.hasAttribute("data-initialized")) {
    toggleButton.setAttribute("data-initialized", "true");
    searchPanel.style.display = "none";
    toggleIcon.textContent = "▶";
    toggleButton.classList.remove("active");

    toggleButton.addEventListener("click", function () {
      toggleSearchPanel(searchPanel, toggleIcon, toggleButton);
    });
  }
}

function setupClearButton(container) {
  const clearButton = container.querySelector(".search-clear");
  const searchForm = container.querySelector("form");

  if (clearButton && !clearButton.hasAttribute("data-initialized")) {
    clearButton.setAttribute("data-initialized", "true");

    clearButton.addEventListener("click", async function (e) {
      e.preventDefault();
      await clearSearchForm(searchForm, clearButton);
    });
  }
}

async function clearSearchForm(searchForm, clearButton) {
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
}

function toggleSearchPanel(panel, icon, button) {
  if (panel.style.display === "none") {
    panel.style.display = "block";
    icon.textContent = "▼";
    button.classList.add("active");
  } else {
    panel.style.display = "none";
    icon.textContent = "▶";
    button.classList.remove("active");
  }
}
