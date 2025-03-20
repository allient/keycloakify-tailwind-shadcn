import { createUseI18n } from "keycloakify/login";


export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        emailSentMessage: "If an account is associated with this email address, you will receive an email with instructions to reset your password.",
    },
    es: {
        emailSentMessage: "If an account is associated with this email address, you will receive an email with instructions to reset your password.",
    },
  });

export type I18n = typeof ofTypeI18n;
