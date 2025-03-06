<#import "template.ftl" as layout>
<@layout.emailLayout>
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #8188e0; text-align: center;">Password Reset Request</h2>
        
        <p>Dear <strong>[First Name]</strong>,</p>

        <p>We received a request to reset your password for your <strong>Inciteful Med</strong> account.</p>

        <p>If you made this request, please click the button below to create a new password:</p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="[Reset Password Link]" 
               style="background-color: #8188e0; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
               Reset Password
            </a>
        </div>

        <p>If you didn’t request a password reset, you can ignore this email—your password will remain the same.</p>

        <p style="font-size: 14px; color: #666;">For security reasons, this link will expire in <strong>5 minutes </strong>.</p>

        <p>If you need further assistance, please contact our support team at <a href="mailto:hello@inciteful.xyz" style="color: #8188e0;">hello@inciteful.xyz</a>.</p>

        <p>Be well, ${kcSanitize(msg("identityProviderLinkSubject",realmName))?no_esc}</p>
        <p><strong>The Inciteful Med Team</strong></p>
        ${kcSanitize(msg("emailTestBody",realmName))?no_esc}
    </div>
</@layout.emailLayout>
