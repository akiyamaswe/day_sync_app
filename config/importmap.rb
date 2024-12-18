# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "search_panel", to: "search_panel.js"
pin "marked", to: "https://ga.jspm.io/npm:marked@9.1.2/lib/marked.esm.js"
