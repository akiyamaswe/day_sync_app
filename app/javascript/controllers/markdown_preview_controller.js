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
        const match = src.match(
          /^:::details([^\n]+)\n((?:(?!:::)[\s\S])*)\n:::/
        );
        if (match) {
          return {
            type: "details",
            raw: match[0],
            title: match[1].trim(),
            content: match[2].trim(),
          };
        }
      },
      renderer(token) {
        const content = marked.parse(token.content);
        return `
          <details class="task-details">
            <summary>${token.title}</summary>
            <div>${content}</div>
          </details>
        `;
      },
    };

    marked.use({
      extensions: [taskListExtension, detailsExtension],
      breaks: true,
      gfm: true,
    });
  }

  connect() {
    this.inputTarget.addEventListener("input", this.preview.bind(this));
    this.preview();
  }

  disconnect() {
    this.inputTarget.removeEventListener("input", this.preview.bind(this));
  }

  preview() {
    const markdown = this.inputTarget.value;
    const html = marked(markdown);
    this.previewTarget.innerHTML = html;
  }
}
