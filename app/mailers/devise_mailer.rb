class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'
  
  def reset_password_instructions(record, token, opts={})
    @token = token
    @resource = record
    
    raise "Resend API key is not set" if ENV['RESEND_API_KEY'].blank?
    
    reset_url = edit_password_url(@resource, reset_password_token: @token)
    render_script_path = Rails.root.join('scripts', 'render_email.js')
    
    # 標準出力とエラー出力を分けて取得
    html_content, error_output, status = Open3.capture3("node", render_script_path.to_s, reset_url.to_s)
    
    # エラー出力があればログに記録
    Rails.logger.error("Email render error: #{error_output}") unless error_output.empty?
    
    raise "Failed to generate HTML: #{error_output}" if html_content.blank?
    
    mail(
      from: ENV['RESEND_FROM_EMAIL'],
      to: record.email,
      subject: I18n.t('devise.mailer.reset_password_instructions.subject'),
      body: html_content,
      content_type: 'text/html'
    )
  end
end
