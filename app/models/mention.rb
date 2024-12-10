# frozen_string_literal: true

class Mention < ApplicationRecord
  belongs_to :mentioning_report, class_name: 'Report'
  belongs_to :mentioned_report, class_name: 'Report'

  validates :mentioning_report_id, uniqueness: { scope: :mentioned_report_id, message: :duplicate }

  def validate_mentions
    errors = []

    errors << I18n.t('activerecord.errors.models.mention.self_reference', model: self.class.model_name.human) if mentioning_report_id == mentioned_report_id
    unless Report.exists?(mentioned_report_id)
      errors << I18n.t('activerecord.errors.models.mention.not_found', id: mentioned_report_id, model: self.class.model_name.human)
    end

    errors
  end
end
