class Toast {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.style.position = "fixed";
    this.container.style.top = "20px";
    this.container.style.right = "20px";
    this.container.style.zIndex = "9999";
    document.body.appendChild(this.container);

    this.injectCSS();
  }

  private injectCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
      .toast-alert {
        opacity: 0;
        transform: translateX(40px);
        transition: all 0.4s ease;
        padding: 12px 20px;
        border-radius: 5px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
        min-width: 250px;
        font-size: 16px;
        font-weight: 500;
      }

      .toast-enter {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }

      .toast-exit {
        opacity: 0 !important;
        transform: translateX(40px) !important;
      }

      .toast-success { background-color: #28a745; }
      .toast-danger { background-color: #dc3545; }
      .toast-info { background-color: #17a2b8; }
      .toast-warning { background-color: #ffc107; color: #000; }

      .btn-close {
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        font-weight: bold;
        font-size: 18px; /* larger font size */
        line-height: 1;
      }

      .btn-close:hover {
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  }

  setPosition(position: string) {
    const [vertical, horizontal] = position.split("-");
    this.container.style.top = vertical === "top" ? "20px" : "";
    this.container.style.bottom = vertical === "bottom" ? "20px" : "";
    this.container.style.left = horizontal === "left" ? "20px" : "";
    this.container.style.right = horizontal === "right" ? "20px" : "";
  }

  showAlert(
    type: "success" | "danger" | "info" | "warning",
    message: string,
    duration: number = 3000,
    position: string = "top-right"
  ) {
    this.setPosition(position);

    const alertDiv = document.createElement("div");
    alertDiv.className = `toast-alert toast-${type}`;

    alertDiv.innerHTML = `
      <span>${message}</span>
      <button class="btn-close">&times;</button>
    `;

    this.container.appendChild(alertDiv);

    // Animate IN
    setTimeout(() => {
      alertDiv.classList.add("toast-enter");
    }, 10);

    // Close button handler
    const closeBtn = alertDiv.querySelector(".btn-close") as HTMLButtonElement | null;
    if (closeBtn) {
      closeBtn.onclick = () => this.closeAlert(alertDiv);
    }

    // Auto-close logic with hover pause
    let timeout = setTimeout(() => this.closeAlert(alertDiv), duration);

    alertDiv.addEventListener("mouseenter", () => clearTimeout(timeout));
    alertDiv.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => this.closeAlert(alertDiv), duration);
    });
  }

  private closeAlert(alertDiv: HTMLDivElement) {
    alertDiv.classList.add("toast-exit");
    setTimeout(() => alertDiv.remove(), 400);
  }
}

export const Toastify = new Toast();
