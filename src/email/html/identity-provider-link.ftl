<#import "template.ftl" as layout>
<@layout.emailLayout>

    <p>We received a request to link your <strong>Inciteful Med</strong> account with your Google account.</p>
    <br>
    <p>If this was you, click the button below to confirm:</p>

    <div style="text-align: center; margin: 20px 0;">
        <a href="${link}" 
           style="background-color: #5613BF; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
           Link My Account
        </a>
    </div>

    <p>This link will expire in <strong>${linkExpirationFormatter(linkExpiration)}</strong>, so be sure to confirm soon!</p>
    <br>
    <p>If you didn’t make this request, you can safely ignore this email. No changes will be made to your account.</p>
    <br>
    <p>Once linked, you’ll be able to sign in easily using Google—no extra passwords needed!</p>

    <p>If you need further assistance, please contact our support team at 
        <a href="mailto:hello@inciteful.xyz" style="color: #5613BF;">hello@inciteful.xyz</a>.
    </p>
    <br>
    <p>Be well,</p>
    <p><strong>The Inciteful Med Team</strong></p>
</@layout.emailLayout>