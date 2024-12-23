class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'
  
  def reset_password_instructions(record, token, opts={})
    @token = token
    @resource = record
    
    # JSXテンプレートをHTMLに変換
    reset_url = edit_password_url(@resource, reset_password_token: @token)
    html_content = `npm run email -- --preview #{reset_url}`
    
    # APIキーの存在確認
    raise "Resend API key is not set" if ENV['RESEND_API_KEY'].blank?
    
    # Resendでメール送信
    mail(
      to: record.email,
      subject: I18n.t('devise.mailer.reset_password_instructions.subject'),
      html_body: html_content,
      from: 'info@daysync.jp'
    ) do |format|
      format.html { render html: html_content.html_safe }
    end
  end
end
