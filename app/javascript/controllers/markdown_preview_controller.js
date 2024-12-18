import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";

export default class extends Controller {
  static targets = ["input", "preview"];

  initialize() {
    const taskListExtension = {
      name: "taskList",
      level: "block",
      start(src) {
        return src.match(/^\[([ x])\]/)?.index;
      },
      tokenizer(src) {
        const rule = /^\[([ x])\] +([^\n]*)/;
        const match = src.match(rule);

        if (match) {
          return {
            type: "taskList",
            raw: match[0],
            checked: match[1] === "x",
            text: match[2],
            tokens: [],
          };
        }
      },
      renderer(token) {
        const className = token.checked
          ? "task-list-item task-list-item-checked"
          : "task-list-item";
        return `<li class="${className}">&nbsp;&nbsp;${token.text}</li>`;
      },
    };

    const detailsExtension = {
      name: "details",
      level: "block",
      start(src) {
        return src.match(/^:::details/)?.index;
      },
      tokenizer(src) {
        const regex = /^:::details(?:[ ](.*?))?\n([\s\S]*?)\n:::/;
        const match = src.match(regex);

        if (match) {
          return {
            type: "details",
            raw: match[0],
            title: match[1] ? match[1].trim() : "",

            content: match[2].trim(),
          };
        }
        return undefined;
      },
      renderer(token) {
        const parsedContent = marked.parse(token.content, { breaks: true });

        const summary = token.title
          ? `<summary>${token.title}</summary>`
          : "<summary></summary>";

        return `
          <details class="task-details" data-details-state>
            ${summary}
            <div class="details-content">
              ${parsedContent}
            </div>
          </details>
        `.trim();
      },
    };

    marked.use({
      extensions: [taskListExtension, detailsExtension],
      breaks: true,
      gfm: true,
    });
  }

  connect() {
    this.boundPreview = this.preview.bind(this);
    this.inputTarget.addEventListener("input", this.boundPreview);
    this.preview();
    this.setupDetailsListeners();
  }

  disconnect() {
    this.inputTarget.removeEventListener("input", this.boundPreview);
  }

  preview() {
    const detailsStates = this.saveDetailsStates();

    const markdown = this.inputTarget.value;
    const html = marked(markdown);
    this.previewTarget.innerHTML = html;

    this.restoreDetailsStates(detailsStates);

    this.setupDetailsListeners();
  }

  saveDetailsStates() {
    return Array.from(this.previewTarget.querySelectorAll("details")).map(
      (details, index) => ({
        index,
        open: details.open,
      })
    );
  }

  restoreDetailsStates(states) {
    const details = this.previewTarget.querySelectorAll("details");
    states.forEach((state) => {
      if (details[state.index]) {
        details[state.index].open = state.open;
      }
    });
  }

  setupDetailsListeners() {
    this.previewTarget.querySelectorAll("details").forEach((details) => {
      details.addEventListener("toggle", (event) => {
        event.stopPropagation();
      });
    });
  }
}
