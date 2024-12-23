import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

export const PasswordResetEmail = ({ 
  resetUrl = 'http://localhost:3000/reset-password',
  companyName = 'Daysync',
}) => {
  return (
    <Html>
      <Head />
      <Preview>【{companyName}】パスワードリセットのご案内</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>{companyName}</Text>
          </Section>
          
          <Section style={heroSection}>
            <div style={heroBackground}>
              <Text style={heading}>パスワードの再設定</Text>
              <Text style={subheading}>
                アカウントのセキュリティを確保するため、新しいパスワードを設定してください。
              </Text>
            </div>
          </Section>

          <Hr style={divider} />
          
          <Section style={contentSection}>
            <Text style={text}>
              以下のボタンをクリックして、パスワードの再設定を完了してください。セキュリティのため、このリンクの有効期限は24時間となっています。
            </Text>
            
            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                パスワードを再設定する
              </Button>
            </Section>

            <Text style={noteText}>
              ボタンがクリックできない場合は、以下のURLをブラウザに貼り付けてください：
            </Text>
            <Text style={linkText}>
              {resetUrl}
            </Text>
            
            <div style={warningBox}>
              <Text style={warningText}>
                ※このメールに心当たりがない場合は、破棄していただいて問題ありません。パスワードリセットをリクエストしていない場合、アカウントのセキュリティを確認することをお勧めします。
              </Text>
            </div>
          </Section>

          <Section style={footerSection}>
            <Text style={copyright}>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#F3F4F6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  margin: '0 auto',
  width: '600px',
  overflow: 'hidden',
};

const logoSection = {
  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  padding: '30px 20px',
  textAlign: 'center',
};

const logoText = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
  textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
};

const heroSection = {
  padding: '0',
};

const heroBackground = {
  background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
  padding: '40px 20px',
  textAlign: 'center',
};

const heading = {
  color: '#1F2937',
  fontSize: '26px',
  fontWeight: 'bold',
  margin: '0 0 15px',
  letterSpacing: '-0.025em',
};

const subheading = {
  color: '#6B7280',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const divider = {
  borderColor: '#E5E7EB',
  margin: '0',
};

const contentSection = {
  padding: '40px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 25px',
};

const buttonContainer = {
  textAlign: 'center',
  margin: '35px 0',
};

const button = {
  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  letterSpacing: '0.025em',
  lineHeight: '56px',
  textAlign: 'center',
  textDecoration: 'none',
  width: '320px',
  boxShadow: '0 4px 6px rgba(79, 70, 229, 0.15)',
};

const noteText = {
  color: '#6B7280',
  fontSize: '14px',
  lineHeight: '21px',
  margin: '0 0 10px',
};

const linkText = {
  color: '#4F46E5',
  display: 'block',
  fontSize: '14px',
  lineHeight: '21px',
  margin: '0 0 30px',
  textDecoration: 'underline',
  wordBreak: 'break-all',
};

const warningBox = {
  backgroundColor: '#F9FAFB',
  borderLeft: '4px solid #4F46E5',
  borderRadius: '6px',
  padding: '20px',
  marginTop: '30px',
};

const warningText = {
  color: '#6B7280',
  fontSize: '14px',
  lineHeight: '21px',
  margin: '0',
};

const footerSection = {
  backgroundColor: '#F9FAFB',
  borderTop: '1px solid #E5E7EB',
  padding: '20px',
  textAlign: 'center',
};

const copyright = {
  color: '#9CA3AF',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

export default PasswordResetEmail;
