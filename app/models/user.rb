# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :reports, dependent: :destroy
  has_many :comments, dependent: :destroy

  paginates_per 25

  def self.ransackable_attributes(*)
    %w[id name email address self_introduction]
  end
end
