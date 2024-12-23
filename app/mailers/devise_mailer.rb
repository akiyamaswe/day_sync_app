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
    
    # React Emailのコンポーネントをレンダリング
    jsx_content = <<~JSX
      const React = require('react');
      const { PasswordResetEmail } = require('./app/javascript/emails/password_reset.jsx');
      const { render } = require('@react-email/render');

      const html = render(React.createElement(PasswordResetEmail, { resetUrl: '#{reset_url}' }));
      console.log(html);
    JSX
    
    # 一時ファイルにJSXを保存
    require 'tempfile'
    html_content = nil
    
    Tempfile.create(['email', '.js']) do |f|
      f.write(jsx_content)
      f.flush
      
      # Node.jsでJSXをHTMLに変換
      html_content = `node -e "#{File.read(f.path)}"`
    end
    
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
