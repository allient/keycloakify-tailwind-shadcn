<#macro emailLayout>
<html>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
    <!-- Contenedor principal centrado -->
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; margin-bottom: 160px;">
      
      <!-- Card principal -->
      <div style="
        background: #ffffff;
        max-width: 500px;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        text-align: center;
      ">
        
        <!-- Logo -->
        <div style="padding: 20px; border-bottom: 2px solid #e5e5e5;">
          <img
            src="https://res.cloudinary.com/ecommercejasmine/image/upload/v1742265623/IncitefulMed_full_logo_fzi6fm.png"
            alt="IncitefulMed"
            style="max-width: 300px;"
          />
        </div>

        <!-- Contenido dinámico -->
        <div style="padding: 20px 30px 40px; text-align: left;">
          <#nested>
        </div>

        <!-- Footer con padding inferior -->
        <div style="padding: 15px 20px; background-color: #f8f8f8; border-top: 1px solid #e5e5e5;">
          <p style="font-size: 14px; color: #777; margin: 5px 0;">
            Copyright © <strong>Inciteful Med</strong>. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  </body>
</html>
</#macro>