<#import "template.ftl" as layout>
<@layout.emailLayout>
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">

        <p>Welcome to Inciteful Med! We're excited to have you on board. Before you get started, we just need to confirm your email address.</p>

        <p>Please click the button below to verify your email:</p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" 
               style="background-color: #5613BF; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
               Verify My Email
            </a>
        </div>

        <p>This link will expire in <strong>${linkExpirationFormatter(linkExpiration)}</strong>, so be sure to verify soon!</p>

        <p>If you didn’t create this account, you can safely ignore this email—no further action is needed.</p>

        <p>If you need further assistance, please contact our support team at 
            <a href="mailto:hello@inciteful.xyz" style="color: #5613BF;">hello@inciteful.xyz</a>.
        </p>

        <p>Be well,</p>
        <p><strong>The Inciteful Med Team</strong></p>
    </div>
</@layout.emailLayout>