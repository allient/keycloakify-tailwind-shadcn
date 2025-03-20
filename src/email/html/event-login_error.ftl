<#import "template.ftl" as layout>
<@layout.emailLayout>
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">

        <p>We noticed a failed login attempt to your <strong>$Inciteful Med</strong> account.</p>

        <p>If this was you, don’t worry—just try again.</p>
        <br>


        <p>If this wasn’t you, we recommend updating your password to keep your account secure. You can do so using the link above.</p>
        <br>
        <p>If you need further assistance, please contact our support team at 
            <a href="mailto:hello@inciteful.xyz" style="color: #5613BF;">hello@inciteful.xyz</a>.
        </p>
        <br>
        
        <p>Be well,</p>
        <p><strong>The Inciteful Med Team</strong></p>
    </div>
</@layout.emailLayout>