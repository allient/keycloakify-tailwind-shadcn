<#import "template.ftl" as layout>
<@layout.emailLayout>
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #9b25ea; text-align: center;">Security Alert: Failed Login Attempt</h2>

        <p>We noticed a failed login attempt to your <strong>$Inciteful Med</strong> account.</p>

        <p>If this was you, don’t worry—just try again or reset your password if needed:</p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" 
               style="background-color: #9b25ea; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
               Reset My Password
            </a>
        </div>

        <p>If this wasn’t you, we recommend updating your password to keep your account secure. You can do so using the link above.</p>

        <p>If you need further assistance, please contact our support team at 
            <a href="mailto:hello@inciteful.xyz" style="color: #9b25ea;">hello@inciteful.xyz</a>.
        </p>

        <p>Be well,</p>
        <p><strong>The Inciteful Med Team</strong></p>
    </div>
</@layout.emailLayout>