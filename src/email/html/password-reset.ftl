<#import "template.ftl" as layout>
<@layout.emailLayout>
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 10px;">
        <h2 style="color: #9b25ea; text-align: center; margin-bottom: 20px">Password Reset Request</h2>

        <p>We received a request to reset your password for your <strong>Inciteful Med</strong> account.</p>

        <p>If you made this request, please click the button below to create a new password:</p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" 
               style="background-color: #9b25ea; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
               Reset Password
            </a>
        </div>

        <p>If you didn’t request a password reset, you can ignore this email—your password will remain the same.</p>

        <p style="font-size: 14px; color: #666;">For security reasons, this link will expire in <strong>${linkExpirationFormatter(linkExpiration)}</strong>.</p>

        <p>If you need further assistance, please contact our support team.</p>

        <p>Be well,</p>
        <p><strong>The Inciteful Med Team</strong></p>
    </div>
</@layout.emailLayout>