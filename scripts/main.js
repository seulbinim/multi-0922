document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll(".menu-button");
  const menuItems = document.querySelectorAll(".menu-item");

  menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Remove is-active and reset aria-pressed for all menu-items
      menuItems.forEach((item) => {
        item.classList.remove("is-active");
        const btn = item.querySelector(".menu-button");
        if (btn) btn.setAttribute("aria-pressed", "false");
        // Reset icons in sub-menu
        item.querySelectorAll(".sub-menu a span").forEach((icon) => {
          icon.classList.remove("fa-solid", "fa-check");
          icon.classList.add("fa-regular", "fa-circle-dot");
        });
        // Remove event listeners from previous sub-menu links
        item.querySelectorAll(".sub-menu a").forEach((a) => {
          a.onmouseenter = null;
          a.onmouseleave = null;
          a.onfocus = null;
          a.onblur = null;
        });
      });

      // Add is-active to the clicked menu-item and set aria-pressed
      const menuItem = button.closest(".menu-item");
      menuItem.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      // Attach hover/focus event listeners to sub-menu links
      menuItem.querySelectorAll(".sub-menu a").forEach((a) => {
        const icon = a.querySelector("span");
        a.onmouseenter = () => {
          icon.classList.remove("fa-regular", "fa-circle-dot");
          icon.classList.add("fa-solid", "fa-check");
        };
        a.onmouseleave = () => {
          icon.classList.remove("fa-solid", "fa-check");
          icon.classList.add("fa-regular", "fa-circle-dot");
        };
        a.onfocus = () => {
          icon.classList.remove("fa-regular", "fa-circle-dot");
          icon.classList.add("fa-solid", "fa-check");
        };
        a.onblur = () => {
          icon.classList.remove("fa-solid", "fa-check");
          icon.classList.add("fa-regular", "fa-circle-dot");
        };
      });
    });
  });
});
