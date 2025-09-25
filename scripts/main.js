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

  // Tabs WAI-ARIA keyboard & mouse interaction
  const tabList = document.querySelector('.tab-list[role="tablist"]');
  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab) {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        panels.forEach((panel) => {
          if (t.getAttribute("aria-controls") === panel.id && selected) {
            panel.hidden = false;
          } else if (t.getAttribute("aria-controls") === panel.id) {
            panel.hidden = true;
          }
        });
      });
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener("keydown", (e) => {
        let newIdx = idx;
        if (e.key === "ArrowRight") {
          newIdx = (idx + 1) % tabs.length;
          tabs[newIdx].focus();
          e.preventDefault();
        } else if (e.key === "ArrowLeft") {
          newIdx = (idx - 1 + tabs.length) % tabs.length;
          tabs[newIdx].focus();
          e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
          activateTab(tab);
          e.preventDefault();
        } else if (e.key === "Tab") {
          // Move focus into the controlled panel
          const panelId = tab.getAttribute("aria-controls");
          const panel = document.getElementById(panelId);
          if (panel) {
            const focusable = panel.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            if (focusable.length > 0) {
              focusable[0].focus();
              e.preventDefault();
              // Store reference to the tab for reverse tabbing
              focusable[0].__relatedTab = tab;
            }
          }
        }
      });

      tab.addEventListener("click", () => {
        activateTab(tab);
      });
    });

    // 패널 내 첫번째 포커스 요소에서 Shift+Tab 시 탭으로 포커스 이동
    panels.forEach((panel) => {
      const focusable = panel.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) {
        focusable[0].addEventListener("keydown", function (e) {
          if (e.key === "Tab" && e.shiftKey) {
            // 원래 탭으로 포커스 이동
            if (this.__relatedTab) {
              this.__relatedTab.focus();
              e.preventDefault();
            } else {
              // fallback: find tab by aria-controls
              const tab = document.querySelector(`[role="tab"][aria-controls="${panel.id}"]`);
              if (tab) {
                tab.focus();
                e.preventDefault();
              }
            }
          }
        });
      }
    });
  }
});
