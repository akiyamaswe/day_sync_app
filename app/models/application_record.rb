# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  before_save :sanitize_text_fields

  private

  def sanitize_text_fields
    attributes.each do |column, value|
      self[column] = value.strip if value.is_a?(String)
    end
  end
end
