# frozen_string_literal: true

module ApplicationHelper
  def i18n_pluralize(word)
    I18n.locale == :ja ? word : word.pluralize
  end

  def i18n_error_count(count)
    I18n.locale == :ja ? "#{count}件の#{t('views.common.error')}" : pluralize(count, t('views.common.error'))
  end

  def format_content(content)
    safe_join(content.split("\n"), tag.br)
  end

  def prose_classes(action = action_name)
    base_classes = 'prose prose-slate max-w-none'
    action == 'index' ? "#{base_classes} index-prose" : base_classes
  end
end
