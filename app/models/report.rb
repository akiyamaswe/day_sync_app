class Report < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy

  paginates_per 25

  def editable?(target_user)
    user == target_user
  end

  def created_on
    created_at.to_date
  end
end
