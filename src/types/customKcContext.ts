import type { ValueOf } from "keycloakify/tools/ValueOf";
import type { ClassKey } from "keycloakify/login";

export type ExtendKcContext<KcContextExtension extends {
    properties?: Record<string, string | undefined>;
}, KcContextExtensionPerPage extends Record<string, Record<string, unknown>>> = ValueOf<{
    [PageId in keyof KcContextExtensionPerPage | KcContext["pageId"]]: Extract<KcContext, {
        pageId: PageId;
    }> extends never ? KcContext.Common & KcContextExtension & {
        pageId: PageId;
    } & KcContextExtensionPerPage[PageId] : Extract<KcContext, {
        pageId: PageId;
    }> & KcContextExtension & KcContextExtensionPerPage[PageId];
}>;
/** Take theses type definition with a grain of salt.
 * Some values might be undefined on some pages.
 * (ex: url.loginAction is undefined on error.ftl)
 */
export type KcContext = KcContext.Login | KcContext.Register | KcContext.Info | KcContext.Error | KcContext.LoginResetPassword | KcContext.LoginVerifyEmail | KcContext.Terms | KcContext.LoginDeviceVerifyUserCode | KcContext.LoginOauthGrant | KcContext.LoginOtp | KcContext.LoginUsername | KcContext.WebauthnAuthenticate | KcContext.WebauthnRegister | KcContext.LoginPassword | KcContext.LoginUpdatePassword | KcContext.LoginUpdateProfile | KcContext.LoginIdpLinkConfirm | KcContext.LoginIdpLinkEmail | KcContext.LoginPageExpired | KcContext.LoginConfigTotp | KcContext.LogoutConfirm | KcContext.IdpReviewUserProfile | KcContext.UpdateEmail | KcContext.SelectAuthenticator | KcContext.SamlPostForm | KcContext.DeleteCredential | KcContext.Code | KcContext.DeleteAccountConfirm | KcContext.FrontchannelLogout | KcContext.LoginRecoveryAuthnCodeConfig | KcContext.LoginRecoveryAuthnCodeInput | KcContext.LoginResetOtp | KcContext.LoginX509Info | KcContext.WebauthnError;
export declare namespace KcContext {
    type Common = {
        themeVersion: string;
        keycloakifyVersion: string;
        themeType: "login";
        themeName: string;
        url: {
            loginAction: string;
            resourcesPath: string;
            resourcesCommonPath: string;
            loginRestartFlowUrl: string;
            loginUrl: string;
            ssoLoginInOtherTabsUrl: string;
        };
        realm: {
            name: string;
            displayName: string;
            displayNameHtml: string;
            internationalizationEnabled: boolean;
            registrationEmailAsUsername: boolean;
        };
        /** Undefined if !realm.internationalizationEnabled */
        locale?: {
            supported: {
                url: string;
                label: string;
                languageTag: string;
            }[];
            currentLanguageTag: string;
        };
        auth?: {
            showUsername?: boolean;
            showResetCredentials?: boolean;
            showTryAnotherWayLink?: boolean;
            attemptedUsername?: string;
        };
        scripts: string[];
        message?: {
            type: "success" | "warning" | "error" | "info";
            summary: string;
        };
        client: {
            clientId: string;
            name?: string;
            description?: string;
            attributes: Record<string, string>;
        };
        isAppInitiatedAction?: boolean;
        messagesPerField: {
            /**
             * Return text if message for given field exists. Useful eg. to add css styles for fields with message.
             *
             * @param fieldName to check for
             * @param text to return
             * @return text if message exists for given field, else undefined
             */
            printIfExists: <T extends string>(fieldName: string, text: T) => T | undefined;
            /**
             * Check if exists error message for given fields
             *
             * @param fields
             * @return boolean
             */
            existsError: (fieldName: string, ...otherFiledNames: string[]) => boolean;
            /**
             * Get message for given field.
             *
             * @param fieldName
             * @return message text or empty string
             */
            get: (fieldName: string) => string;
            /**
             * Check if message for given field exists
             *
             * @param field
             * @return boolean
             */
            exists: (fieldName: string) => boolean;
            getFirstError: (...fieldNames: string[]) => string;
        };
        authenticationSession?: {
            authSessionId: string;
            tabId: string;
            ssoLoginInOtherTabsUrl: string;
        };
        properties: {};
        "x-keycloakify": {
            messages: Record<string, string>;
        };
    };
    type SamlPostForm = Common & {
        pageId: "saml-post-form.ftl";
        samlPost: {
            url: string;
            SAMLRequest?: string;
            SAMLResponse?: string;
            relayState?: string;
        };
    };
    type Login = Common & {
        pageId: "login.ftl";
        url: {
            loginResetCredentialsUrl: string;
            registrationUrl: string;
        };
        realm: {
            loginWithEmailAllowed: boolean;
            rememberMe: boolean;
            password: boolean;
            resetPasswordAllowed: boolean;
            registrationAllowed: boolean;
        };
        auth: {
            selectedCredential?: string;
        };
        registrationDisabled: boolean;
        login: {
            username?: string;
            rememberMe?: string;
            password?: string;
        };
        usernameHidden?: boolean;
        social: {
            displayInfo: boolean;
            providers?: {
                loginUrl: string;
                alias: string;
                providerId: string;
                displayName: string;
                iconClasses?: string;
            }[];
        };
    };
    type Register = Common & {
        pageId: "register.ftl";
        profile: UserProfile;
        passwordPolicies?: PasswordPolicies;
        url: {
            registrationAction: string;
        };
        passwordRequired: boolean;
        recaptchaRequired: boolean;
        recaptchaSiteKey?: string;
        termsAcceptanceRequired?: boolean;
        social: {
            displayInfo: boolean;
            providers?: {
                loginUrl: string;
                alias: string;
                providerId: string;
                displayName: string;
                iconClasses?: string;
            }[];
        };
        realm: {
            loginWithEmailAllowed: boolean;
            rememberMe: boolean;
            password: boolean;
            resetPasswordAllowed: boolean;
            registrationAllowed: boolean;
        };
    };
    type Info = Common & {
        pageId: "info.ftl";
        messageHeader?: string;
        requiredActions?: string[];
        skipLink: boolean;
        pageRedirectUri?: string;
        actionUri?: string;
        client: {
            baseUrl?: string;
        };
        message: NonNullable<Common["message"]>;
    };
    type Error = Common & {
        pageId: "error.ftl";
        client?: {
            baseUrl?: string;
        };
        message: NonNullable<Common["message"]>;
        skipLink?: boolean;
    };
    type LoginResetPassword = Common & {
        pageId: "login-reset-password.ftl";
        realm: {
            loginWithEmailAllowed: boolean;
            duplicateEmailsAllowed: boolean;
        };
        url: {
            loginResetCredentialsUrl: string;
        };
        auth: {
            attemptedUsername?: string;
        };
    };
    type LoginVerifyEmail = Common & {
        pageId: "login-verify-email.ftl";
        user?: {
            email: string;
        };
    };
    type Terms = Common & {
        pageId: "terms.ftl";
        user?: {
            id: string;
            username: string;
            attributes: Record<string, string[]>;
            email: string;
            emailVerified: boolean;
            firstName?: string;
            lastName?: string;
            markedForEviction?: boolean;
        };
        __localizationRealmOverridesTermsText?: string;
    };
    type LoginDeviceVerifyUserCode = Common & {
        pageId: "login-oauth2-device-verify-user-code.ftl";
        url: {
            oauth2DeviceVerificationAction: string;
        };
    };
    type LoginOauthGrant = Common & {
        pageId: "login-oauth-grant.ftl";
        oauth: {
            code: string;
            client: string;
            clientScopesRequested: {
                consentScreenText: string;
                dynamicScopeParameter?: string;
            }[];
        };
        url: {
            oauthAction: string;
        };
    };
    type LoginOtp = Common & {
        pageId: "login-otp.ftl";
        otpLogin: {
            userOtpCredentials: {
                id: string;
                userLabel: string;
            }[];
            selectedCredentialId?: string;
        };
    };
    type LoginUsername = Common & {
        pageId: "login-username.ftl";
        url: {
            loginResetCredentialsUrl: string;
            registrationUrl: string;
        };
        realm: {
            loginWithEmailAllowed: boolean;
            rememberMe: boolean;
            password: boolean;
            resetPasswordAllowed: boolean;
            registrationAllowed: boolean;
        };
        registrationDisabled: boolean;
        login: {
            username?: string;
            rememberMe?: string;
        };
        usernameHidden?: boolean;
        social: Login["social"];
    };
    type LoginPassword = Common & {
        pageId: "login-password.ftl";
        url: {
            loginResetCredentialsUrl: string;
            registrationUrl: string;
        };
        realm: {
            resetPasswordAllowed: boolean;
        };
        auth?: {
            showUsername?: boolean;
            showResetCredentials?: boolean;
            showTryAnotherWayLink?: boolean;
            attemptedUsername?: string;
        };
        social: {
            displayInfo: boolean;
        };
    };
    type WebauthnAuthenticate = Common & {
        pageId: "webauthn-authenticate.ftl";
        authenticators: {
            authenticators: WebauthnAuthenticate.WebauthnAuthenticator[];
        };
        challenge: string;
        userVerification: UserVerificationRequirement | "not specified";
        rpId: string;
        createTimeout: string;
        isUserIdentified: "true" | "false";
        shouldDisplayAuthenticators: boolean;
        social: {
            displayInfo: boolean;
        };
        login: {};
        realm: {
            password: boolean;
            registrationAllowed: boolean;
        };
        registrationDisabled?: boolean;
        url: {
            registrationUrl?: string;
        };
    };
    namespace WebauthnAuthenticate {
        type WebauthnAuthenticator = {
            credentialId: string;
            transports: {
                iconClass: string;
                displayNameProperties?: string[];
            };
            label: string;
            createdAt: string;
        };
    }
    type WebauthnRegister = Common & {
        pageId: "webauthn-register.ftl";
        challenge: string;
        userid: string;
        username: string;
        signatureAlgorithms: string[];
        rpEntityName: string;
        rpId: string;
        attestationConveyancePreference: string;
        authenticatorAttachment: string;
        requireResidentKey: string;
        userVerificationRequirement: string;
        createTimeout: number;
        excludeCredentialIds: string;
        isSetRetry?: boolean;
        isAppInitiatedAction?: boolean;
    };
    type LoginUpdatePassword = Common & {
        pageId: "login-update-password.ftl";
    };
    type LoginIdpLinkConfirm = Common & {
        pageId: "login-idp-link-confirm.ftl";
        idpAlias: string;
    };
    type LoginIdpLinkEmail = Common & {
        pageId: "login-idp-link-email.ftl";
        brokerContext: {
            username: string;
        };
        idpAlias: string;
    };
    type LoginPageExpired = Common & {
        pageId: "login-page-expired.ftl";
    };
    type LoginConfigTotp = Common & {
        pageId: "login-config-totp.ftl";
        mode?: "qr" | "manual" | undefined | null;
        totp: {
            totpSecretEncoded: string;
            qrUrl: string;
            policy: {
                algorithm: "HmacSHA1" | "HmacSHA256" | "HmacSHA512";
                digits: number;
                lookAheadWindow: number;
                getAlgorithmKey: () => string;
            } & ({
                type: "totp";
                period: number;
            } | {
                type: "hotp";
                initialCounter: number;
            });
            supportedApplications: string[];
            totpSecretQrCode: string;
            manualUrl: string;
            totpSecret: string;
            otpCredentials: {
                id: string;
                userLabel: string;
            }[];
        };
    };
    type LogoutConfirm = Common & {
        pageId: "logout-confirm.ftl";
        url: {
            logoutConfirmAction: string;
        };
        client: {
            baseUrl?: string;
        };
        logoutConfirm: {
            code: string;
            skipLink?: boolean;
        };
    };
    type LoginUpdateProfile = Common & {
        pageId: "login-update-profile.ftl";
        profile: UserProfile;
        passwordPolicies?: PasswordPolicies;
    };
    type IdpReviewUserProfile = Common & {
        pageId: "idp-review-user-profile.ftl";
        profile: UserProfile;
        passwordPolicies?: PasswordPolicies;
    };
    type UpdateEmail = Common & {
        pageId: "update-email.ftl";
        profile: UserProfile;
        passwordPolicies?: PasswordPolicies;
    };
    type SelectAuthenticator = Common & {
        pageId: "select-authenticator.ftl";
        auth: {
            authenticationSelections: SelectAuthenticator.AuthenticationSelection[];
        };
    };
    namespace SelectAuthenticator {
        type AuthenticationSelection = {
            authExecId: string;
            displayName: string;
            helpText: string;
            iconCssClass?: ClassKey;
        };
    }
    type DeleteCredential = Common & {
        pageId: "delete-credential.ftl";
        credentialLabel: string;
    };
    type Code = Common & {
        pageId: "code.ftl";
        code: {
            success: boolean;
            code?: string;
            error?: string;
        };
    };
    type DeleteAccountConfirm = Common & {
        pageId: "delete-account-confirm.ftl";
        triggered_from_aia: boolean;
    };
    type FrontchannelLogout = Common & {
        pageId: "frontchannel-logout.ftl";
        logout: {
            clients: {
                name: string;
                frontChannelLogoutUrl: string;
            }[];
            logoutRedirectUri?: string;
        };
    };
    type LoginRecoveryAuthnCodeConfig = Common & {
        pageId: "login-recovery-authn-code-config.ftl";
        recoveryAuthnCodesConfigBean: {
            generatedRecoveryAuthnCodesList: string[];
            generatedRecoveryAuthnCodesAsString: string;
            generatedAt: number;
        };
    };
    type LoginRecoveryAuthnCodeInput = Common & {
        pageId: "login-recovery-authn-code-input.ftl";
        recoveryAuthnCodesInputBean: {
            codeNumber: number;
        };
    };
    type LoginResetOtp = Common & {
        pageId: "login-reset-otp.ftl";
        configuredOtpCredentials: {
            userOtpCredentials: {
                id: string;
                userLabel: string;
            }[];
            selectedCredentialId: string;
        };
    };
    type LoginX509Info = Common & {
        pageId: "login-x509-info.ftl";
        x509: {
            formData: {
                subjectDN?: string;
                isUserEnabled?: boolean;
                username?: string;
            };
        };
    };
    type WebauthnError = Common & {
        pageId: "webauthn-error.ftl";
        isAppInitiatedAction?: boolean;
    };
}
export type UserProfile = {
    attributesByName: Record<string, Attribute>;
    html5DataAnnotations?: Record<string, string>;
};
export type Attribute = {
    name: string;
    displayName?: string;
    required: boolean;
    value?: string;
    values?: string[];
    group?: {
        annotations: Record<string, string>;
        html5DataAnnotations: Record<string, string>;
        displayHeader?: string;
        name: string;
        displayDescription?: string;
    };
    html5DataAnnotations?: {
        kcNumberFormat?: string;
        kcNumberUnFormat?: string;
    };
    readOnly: boolean;
    validators: Validators;
    annotations: {
        inputType?: string;
        inputTypeSize?: `${number}` | number;
        inputOptionsFromValidation?: string;
        inputOptionLabels?: Record<string, string | undefined>;
        inputOptionLabelsI18nPrefix?: string;
        inputTypeCols?: `${number}` | number;
        inputTypeRows?: `${number}` | number;
        inputTypeMaxlength?: `${number}` | number;
        inputHelperTextBefore?: string;
        inputHelperTextAfter?: string;
        inputTypePlaceholder?: string;
        inputTypePattern?: string;
        inputTypeMinlength?: `${number}` | number;
        inputTypeMax?: string;
        inputTypeMin?: string;
        inputTypeStep?: string;
    };
    multivalued?: boolean;
    autocomplete?: "on" | "off" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";
};
export type Validators = {
    length?: Validators.DoIgnoreEmpty & Validators.Range;
    integer?: Validators.DoIgnoreEmpty & Validators.Range;
    email?: Validators.DoIgnoreEmpty;
    pattern?: Validators.DoIgnoreEmpty & Validators.ErrorMessage & {
        pattern: string;
    };
    options?: Validators.Options;
    multivalued?: Validators.DoIgnoreEmpty & Validators.Range;
};
export declare namespace Validators {
    type DoIgnoreEmpty = {
        "ignore.empty.value"?: boolean;
    };
    type ErrorMessage = {
        "error-message"?: string;
    };
    type Range = {
        min?: `${number}` | number;
        max?: `${number}` | number;
    };
    type Options = {
        options: string[];
    };
}
/**
 * Theses values are added by: https://github.com/jcputney/keycloak-theme-additional-info-extension
 * A Keycloak Java extension used as dependency in Keycloakify.
 */
export type PasswordPolicies = {
    /** The minimum length of the password */
    length?: number;
    /** The minimum number of digits required in the password */
    digits?: number;
    /** The minimum number of lowercase characters required in the password */
    lowerCase?: number;
    /** The minimum number of uppercase characters required in the password */
    upperCase?: number;
    /** The minimum number of special characters required in the password */
    specialChars?: number;
    /** Whether the password can be the username */
    notUsername?: boolean;
    /** Whether the password can be the email address */
    notEmail?: boolean;
};
