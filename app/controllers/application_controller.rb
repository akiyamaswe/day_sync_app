# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    keys = %i[name phone_number postal_code address self_introduction]
    devise_parameter_sanitizer.permit(:sign_up, keys:)
    devise_parameter_sanitizer.permit(:account_update, keys:)
  end

  def after_sign_in_path_for(_resource)
    reports_path
  end
end
