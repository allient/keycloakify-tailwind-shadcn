import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";
import { checkboxVariants } from "../../components/ui/checkbox";
import SocialProviders from "../../components/ui/SocialProviders";
type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};


export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);


    const social = {
        displayInfo: true,
        providers: [
            {
                loginUrl: "google",
                alias: "google-sign-up",
                providerId: "google",
                displayName: "Sign up with Google",
                iconClasses: "fa fa-google"
            }
        ]
    }

    const realm = {
        ...kcContext.realm, // Mantiene las propiedades originales
        password: true,
        registrationAllowed: true,
        registrationEmailAsUsername: false,
        rememberMe: true,
        resetPasswordAllowed: true
    };


    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={"Create an account"}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields={false}
            socialProvidersNode={<SocialProviders social={social} kcClsx={kcClsx} clsx={clsx} msg={msg} realm={realm} />}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <div id="kc-registration" className="pb-4">
                        <span className="text-xs md:text-sm text-gray-600 text-center">
                            {"Already have an account?"}{" "}
                            <a tabIndex={8} href={url.loginUrl} className="text-blue-600 no-underline hover:underline font-normal">
                                {"Log In"}
                            </a>
                        </span>
                    </div>
                    <form id="kc-register-form" className="py-4 -mx-6" action={url.registrationAction} method="post">
                        <UserProfileFormFields
                            kcContext={kcContext}
                            i18n={i18n}
                            kcClsx={kcClsx}
                            onIsFormSubmittableValueChange={setIsFormSubmittable}
                            doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                        />
                        {true && (
                            <TermsAcceptance
                                i18n={i18n}
                                kcClsx={kcClsx}
                                messagesPerField={messagesPerField}
                                areTermsAccepted={areTermsAccepted}
                                onAreTermsAcceptedValueChange={setAreTermsAccepted}
                            />
                        )}
                        {recaptchaRequired && (
                            <div className="form-group  pt-7">
                                <div className="mx-5">
                                    <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                                </div>
                            </div>
                        )}
                        <div className="text-center">
                            <div id="kc-form-buttons" className="px-5 py-2">
                                <Button
                                    disabled={!isFormSubmittable || (!areTermsAccepted)}
                                    // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    type="submit"
                                    className="w-full "
                                    variant={"default"}
                                //value={msgStr("doRegister")}>
                                >
                                    {/* {msgStr("doRegister")} */}
                                    {"Sign up →"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <div className="form-group pb-8 pt-4">
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            className={checkboxVariants({})}
                            checked={areTermsAccepted}
                            onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                            aria-invalid={messagesPerField.existsError("termsAccepted")}
                        />
                        <div>
                            <span className="text-xs md:text-sm text-gray-600 text-center font-battambang">
                                {"By signing up. I agree to "}{" "}
                                <a
                                    tabIndex={8}
                                    href="https://incitefulmed.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 no-underline hover:underline font-normal"
                                >
                                    Terms of Services
                                </a>
                                {" and "}
                                <a
                                    tabIndex={8}
                                    href="https://incitefulmed.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 no-underline hover:underline font-normal"
                                >
                                    Privacy Policy
                                </a>
                                {"."}
                            </span>
                        </div>
                    </div>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("termsAccepted")
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
