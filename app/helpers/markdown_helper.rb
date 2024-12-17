# frozen_string_literal: true

module MarkdownHelper
  extend ActiveSupport::Concern

  def markdown_to_html(text)
    return '' if text.blank?

    text = process_task_lists(text)
    text = process_details(text)
    html = render_markdown(text)
    processed_html = add_top_target_to_links(html)

    sanitize(processed_html,
             tags: allowed_tags,
             attributes: allowed_attributes)
  end

  private

  def process_task_lists(text)
    text.gsub(/^\[([ x])\]\s*(.+)$/) do |_match|
      checked = ::Regexp.last_match(1) == 'x'
      content = ::Regexp.last_match(2).strip
      checkbox_class = checked ? 'task-list-item-checked' : 'task-list-item-unchecked'
      "<li class=\"task-list-item #{checkbox_class}\">&nbsp;&nbsp;#{content}</li>"
    end
  end

  def process_details(text)
    text.gsub(/:::details(.+?)\n(.*?):::/m) do |_match|
      title = ::Regexp.last_match(1).strip
      content = ::Regexp.last_match(2).strip
      "\n<details class=\"task-details\">\n<summary>#{title}</summary>\n\n#{content}\n</details>\n"
    end
  end

  def render_markdown(text)
    CommonMarker.render_html(
      text,
      %i[SMART VALIDATE_UTF8 GITHUB_PRE_LANG UNSAFE HARDBREAKS],
      %i[table strikethrough autolink tagfilter]
    )
  end

  def add_top_target_to_links(html)
    html.gsub(/<a(.*?)>/, '<a\1 target="_top">')
  end

  def allowed_tags
    %w[a p br img h1 h2 h3 h4 h5 h6 ul ol li strong em del pre code blockquote details summary div span]
  end

  def allowed_attributes
    %w[href src alt title target class]
  end
end
