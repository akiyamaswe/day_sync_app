# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @q = User.ransack(params[:q])
    @users = @q.result(distinct: true).order(id: :desc).page(params[:page])
  end

  def show
    @user = User.find(params[:id])
  end
end
