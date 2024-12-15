require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DaySyncApp
  class Application < Rails::Application
    config.i18n.default_locale = :ja
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.time_zone = 'Tokyo'

    config.action_view.field_error_proc = Proc.new do |html_tag, instance|
      if html_tag =~ /<(input|textarea|select)/
        doc = Nokogiri::HTML::DocumentFragment.parse(html_tag)
        element = doc.children.first
        existing_classes = element['class'].to_s.split
        new_classes = ['border-red-300', 'bg-red-50', 'focus:border-red-500', 'focus:ring-red-200']
        element['class'] = (existing_classes + new_classes).join(' ')
        doc.to_html.html_safe
      else
        html_tag.html_safe
      end
    end
  end
end
