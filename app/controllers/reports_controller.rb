# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :set_report, only: %i[show edit update destroy]
  before_action :build_report, only: %i[new create]

  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def index
    @reports = Report.includes(:user).order(id: :desc).page(params[:page])
  end

  def show; end

  def new; end

  def edit; end

  def create
    if @report.save_with_mentions
      redirect_to @report, notice: t('controllers.common.notice_create', name: Report.model_name.human)
    else
      handle_save_error(:new)
    end
  end

  def update
    @report.assign_attributes(report_params)

    if @report.save_with_mentions
      redirect_to @report, notice: t('controllers.common.notice_update', name: Report.model_name.human)
    else
      handle_save_error(:edit)
    end
  end

  def destroy
    @report.destroy
    redirect_to reports_url, notice: t('controllers.common.notice_destroy', name: Report.model_name.human)
  end

  private

  def handle_save_error(template)
    flash.now[:alert]
    render template
  end

  def handle_record_not_found
    flash[:alert] = t('views.mention.not_found')
    redirect_back(fallback_location: reports_path)
  end

  def build_report
    @report = current_user.reports.new(params[:report].present? ? report_params : {})
  end

  def set_report
    @report = if action_name == 'show'
                Report.find_by!(id: params[:id])
              else
                current_user.reports.find(params[:id])
              end
  end

  def report_params
    params.require(:report).permit(:title, :content)
  end
end
