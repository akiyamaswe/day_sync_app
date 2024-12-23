require("@babel/register")({
  presets: ["@babel/preset-react", "@babel/preset-env"],
  extensions: [".jsx", ".js"],
});

const { renderToString } = require("react-dom/server");
const React = require("react");

const resetUrl = process.argv[2];

function renderEmail() {
  try {
    console.error("Starting email render...");
    const {
      PasswordResetEmail,
    } = require("../app/javascript/emails/password_reset.jsx");

    console.error("Component loaded successfully");
    const element = React.createElement(PasswordResetEmail, { resetUrl });
    console.error("Element created successfully");

    const html = renderToString(element);
    console.error("HTML generated successfully");

    process.stdout.write(html);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

renderEmail();
