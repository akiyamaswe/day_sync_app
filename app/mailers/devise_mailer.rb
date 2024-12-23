class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'
  
  def reset_password_instructions(record, token, opts={})
    @token = token
    @resource = record
    
    # APIキーの存在確認
    raise "Resend API key is not set" if ENV['RESEND_API_KEY'].blank?
    
    # JSXテンプレートをHTMLに変換
    reset_url = edit_password_url(@resource, reset_password_token: @token)
    
    # Node.jsスクリプトを実行してHTMLを生成
    render_script_path = Rails.root.join('scripts', 'render_email.js')
    password_reset_path = Rails.root.join('app', 'javascript', 'emails', 'password_reset.jsx')
    
    # スクリプトの実行結果とエラーの両方を取得
    html_content, error_str, status = Open3.capture3("node", render_script_path.to_s, reset_url.to_s)
    
    # エラーがある場合はログに出力
    Rails.logger.error("Email render error: #{error_str}") unless error_str.empty?
    
    raise "Failed to generate HTML: #{error_str}" if html_content.blank?
    
    # Resendでメール送信
    mail(
      from: ENV['RESEND_FROM_EMAIL'],
      to: record.email,
      subject: I18n.t('devise.mailer.reset_password_instructions.subject'),
      body: html_content,
      content_type: 'text/html'
    )
  end
end
