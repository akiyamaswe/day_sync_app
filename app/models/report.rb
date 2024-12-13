# frozen_string_literal: true

class Report < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy

  has_many :mention_to_others,
           class_name: 'Mention',
           foreign_key: 'mentioning_report_id',
           inverse_of: :mentioning_report,
           dependent: :destroy
  has_many :mentioning_reports,
           through: :mention_to_others,
           source: :mentioned_report

  has_many :mention_form_others,
           class_name: 'Mention',
           foreign_key: 'mentioned_report_id',
           inverse_of: :mentioned_report,
           dependent: :destroy
  has_many :mentioned_reports,
           through: :mention_form_others,
           source: :mentioning_report

  paginates_per 25
  validates :title, presence: true
  validates :content, presence: true

  attr_accessor :mention_errors

  def self.ransackable_attributes(*)
    %w[title content created_at user_id]
  end

  def self.ransackable_associations(*)
    %w[user]
  end

  REPORT_ID_REGEX = %r{(?:http://|https://)(?:[^/]+)/reports/(\d+)}

  def editable?(target_user)
    user == target_user
  end

  def created_on
    created_at.to_date
  end

  def save_with_mentions
    @mention_errors = []

    ActiveRecord::Base.transaction do
      report_valid = validate
      save(validate: false) if report_valid
      mentions_valid = sync_mentions

      if !mentions_valid
        @mention_errors.each do |error|
          errors.add(:base, error)
        end
      end

      raise ActiveRecord::Rollback unless report_valid && mentions_valid

      save!
      true
    end
  end

  private

  def sync_mentions
    new_mentioned_ids = extract_new_mentioned_ids
    current_mentioned_ids = mentioning_reports.ids

    update_mentions_associations(new_mentioned_ids, current_mentioned_ids)
  end

  def extract_new_mentioned_ids
    content.scan(REPORT_ID_REGEX).flatten.uniq.map(&:to_i)
  end

  def update_mentions_associations(new_ids, current_ids)
    ids_to_add = new_ids - current_ids
    ids_to_remove = current_ids - new_ids

    remove_mentions(ids_to_remove)
    add_mentions(ids_to_add)
  end

  def remove_mentions(ids)
    mention_to_others.where(mentioned_report_id: ids).destroy_all
  end

  def add_mentions(ids)
    return true if ids.empty?

    all_errors = []

    ids.each do |mentioned_id|
      mention = Mention.new(
        mentioning_report_id: id,
        mentioned_report_id: mentioned_id
      )

      validation_errors = mention.validate_mentions
      if validation_errors.any?
        all_errors.concat(validation_errors)
        next
      end

      all_errors.concat(mention.errors.full_messages) unless mention.save
    end

    @mention_errors = all_errors if all_errors.any?
    all_errors.empty?
  end
end
