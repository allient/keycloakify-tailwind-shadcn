import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    {/* <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="username" className={"text-xs font-light text-gray-700 font-battambang"}>
                            {!realm.loginWithEmailAllowed
                                ? "Email Address"
                                : !realm.registrationEmailAsUsername
                                  ? "Email Address"
                                  : "Email Address"}
                        </label>
                    </div> */}
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <Input
                            type="text"
                            id="username"
                            labelText="Email Address"
                            name="username"
                            className="font-battambang font-light"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className="input-error py-3 text-xs md:text-xs font-battambang font-light"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("username")
                                }}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <div id="kc-form-options">
                        <div>
                            <span>
                                <a href={url.loginUrl} className={cn(buttonVariants({ variant: "link" }), "underline p-0 ")}>
                                    {msg("backToLogin")}
                                </a>
                            </span>
                        </div>
                    </div>

                    <div id="kc-form-buttons" className="">
                        <input
                            // className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            className={cn(buttonVariants({ variant: "default" }), "w-full rounded-[0.5rem] text-base")}
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
