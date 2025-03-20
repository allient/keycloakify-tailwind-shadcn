<#macro emailLayout>
<html>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333; text-align: center;">
    <!-- Contenedor principal centrado -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding: 20px 0;">
          
          <!-- Card principal -->
          <table role="presentation" width="500px" cellspacing="0" cellpadding="0" border="0" style="
            background: #ffffff;
            max-width: 500px;
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            text-align: center;
          ">
            
            <!-- Logo -->
            <tr>
              <td style="padding: 20px; border-bottom: 2px solid #e5e5e5;">
                <img
                  src="https://res.cloudinary.com/ecommercejasmine/image/upload/v1742265623/IncitefulMed_full_logo_fzi6fm.png"
                  alt="IncitefulMed"
                  style="max-width: 300px;"
                />
              </td>
            </tr>

            <!-- Contenido dinámico -->
            <tr>
              <td style="padding: 20px 30px 40px; text-align: left;">
                <#nested>
              </td>
            </tr>

            <!-- Footer con padding inferior -->
            <tr>
              <td style="padding: 15px 20px; background-color: #f8f8f8; border-top: 1px solid #e5e5e5;">
                <p style="font-size: 14px; color: #777; margin: 5px 0;">
                  Copyright © <strong>Inciteful Med</strong>. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
          
        </td>
      </tr>
    </table>
  </body>
</html>
</#macro>