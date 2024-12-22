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
} from '@react-email/components';

export const PasswordResetEmail = ({ resetUrl = 'http://localhost:3000/reset-password' }) => {
  return (
    <Html>
      <Head />
      <Preview>パスワードリセットのご案内</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={text}>
              パスワードリセットのリクエストを受け付けました。
            </Text>
            <Text style={text}>
              以下のボタンをクリックして、パスワードを再設定してください。
            </Text>
            <Button
              href={resetUrl}
              style={button}
            >
              パスワードを再設定する
            </Button>
            <Text style={text}>
              このリンクの有効期限は24時間です。
            </Text>
            <Text style={footer}>
              ※このメールに心当たりがない場合は、無視していただいて構いません。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
};

const section = {
  padding: '24px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
  margin: '28px 0',
};

const footer = {
  color: '#898989',
  fontSize: '14px',
};

export default PasswordResetEmail;
