import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { KcContext } from "../KcContext";
import { checkboxVariants } from "../../components/ui/checkbox";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";

type IdpReviewUserProfileProps = PageProps<Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField } = kcContext;

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("loginIdpReviewProfileTitle")}
        >
            <form id="kc-idp-review-profile-form" action={url.loginAction} method="post" onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);

                (e.target as HTMLFormElement).submit();
            }}>
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    onIsFormSubmittableValueChange={setIsFomSubmittable}
                    kcClsx={kcClsx}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {
                    true && (
                        <TermsAcceptance
                            i18n={i18n}
                            kcClsx={kcClsx}
                            messagesPerField={messagesPerField}
                            areTermsAccepted={areTermsAccepted}
                            onAreTermsAcceptedValueChange={setAreTermsAccepted}
                        />
                    )
                }
                <div className="p-5">
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className="bg-blue">
                        {/* <input
                            className={`${buttonVariants({ variant: "default" })} px-2 w-full`}
                            // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value={msgStr("doSubmit")}
                            disabled={!isFomSubmittable || (!areTermsAccepted)}
                        /> */}
                        <Button
                            disabled={!isFomSubmittable || !areTermsAccepted || isSubmitting}
                            type="submit"
                            className="w-full"
                            variant="default"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 text-white inline"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>

                    </div>
                </div>
            </form>
        </Template >
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
                                {"By signing up, I agree to "}{" "}
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
