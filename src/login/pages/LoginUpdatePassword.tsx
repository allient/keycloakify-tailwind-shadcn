import { useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "../../components/ui/PasswordWrapper";
import { Input } from "../../components/ui/input";
import { buttonVariants, Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { checkboxVariants } from "../../components/ui/checkbox";
export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" action={url.loginAction} method="post" className="flex flex-col space-y-6">
                <div className={kcClsx("kcFormGroupClass")}>
                    {/* <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="password-new" className={"text-xs font-light text-gray-700 font-battambang"}>
                            {msg("passwordNew")}
                        </label>
                    </div> */}
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                            <Input
                                labelText="New Password"
                                type="password"
                                className="text-foreground font-battambang"
                                id="password-new"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className="input-error py-3 text-xs md:text-xs font-battambang font-light"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password")
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    {/* <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="password-confirm" className={"text-xs font-light text-gray-700 font-battambang"}>
                            {msg("passwordConfirm")}
                        </label>
                    </div> */}
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                            <Input
                                type="password"
                                id="password-confirm"
                                labelText="Confirm Password"
                                name="password-confirm"
                                className="text-foreground font-battambang"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                className="input-error py-3 text-xs md:text-xs font-battambang font-light"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password-confirm")
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} /> */}
                <div className=" responsive-container ">
                    <input className={cn(buttonVariants(), "w-full my-5")} type="submit" value={msgStr("doSubmit")} />
                    {isAppInitiatedAction && (
                        <Button
                            // className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                            className="w-full rounded-[0.5rem] text-base py-6"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            variant={"outline"}
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            className={cn(checkboxVariants({}))}
                        />
                        <span>{msg("logoutOtherSessions")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
