import { Node, mergeAttributes } from "@tiptap/core";

const Iframe = Node.create({
  name: "iframe",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src
            ? attributes.src +
              (attributes.src.includes("?") ? "&" : "?") +
              "modestbranding=1&rel=0"
            : null,
        }),
      },
      width: {
        default: "560",
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      height: {
        default: "315",
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => ({
          height: attributes.height,
        }),
      },
      allowfullscreen: {
        default: true,
        parseHTML: (element) => element.hasAttribute("allowfullscreen"),
        renderHTML: (attributes) => ({
          allowfullscreen: attributes.allowfullscreen ? "" : null,
        }),
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({
          class: attributes.class,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

export default Iframe;
