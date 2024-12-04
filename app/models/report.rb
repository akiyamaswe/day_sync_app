class Report < ApplicationRecord
  belongs_to :user
  paginates_per 25

  def editable?(target_user)
    user == target_user
  end

  def created_on
    created_at.to_date
  end
end
