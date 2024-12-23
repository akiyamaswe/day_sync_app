require("@babel/register")({
  presets: ["@babel/preset-react", "@babel/preset-env"],
  extensions: [".jsx", ".js"],
});

const { renderToString } = require("react-dom/server");
const React = require("react");

const resetUrl = process.argv[2];

function renderEmail() {
  try {
    console.log("Starting email render...");
    const {
      PasswordResetEmail,
    } = require("../app/javascript/emails/password_reset.jsx");

    console.log("Component loaded:", PasswordResetEmail);
    const element = React.createElement(PasswordResetEmail, { resetUrl });
    console.log("Element created:", element);

    const html = renderToString(element);
    console.log("HTML generated:", html);

    process.stdout.write(html);
  } catch (error) {
    console.error("Detailed error:", error);
    process.exit(1);
  }
}

renderEmail();
