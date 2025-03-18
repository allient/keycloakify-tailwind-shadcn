import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { checkboxVariants } from "../../components/ui/checkbox";

import { Separator } from "../../components/ui/separator";
import { PasswordWrapper } from "../../components/ui/PasswordWrapper";
import SocialProviders from "../../components/ui/SocialProviders";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={"Sign in to Inciteful Med"}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            socialProvidersNode={<SocialProviders social={social} kcClsx={kcClsx} clsx={clsx} msg={msg} realm={realm} />}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <div id="kc-registration" className="pb-5">
                        <span className="text-sm text-gray-500 text-center">
                            {"Need an account?"}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="text-blue-600 no-underline hover:underline font-normal">
                                {"Sign Up"}
                            </a>
                        </span>
                    </div>
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-6"
                        >
                            {!usernameHidden && (
                                <div>
                                    {/* <Label htmlFor="username" className="text-xs font-light text-gray-700 font-battambang">
                                        {!realm.loginWithEmailAllowed
                                            ? "Email Address"
                                            : !realm.registrationEmailAsUsername
                                                ? "Email Address"
                                                : "Email Address"}
                                    </Label> */}
                                    <Input
                                        labelText="Email Address"
                                        tabIndex={2}
                                        id="username"
                                        className="font-battambang font-light"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            // id="input-error"
                                            className="input-error py-3 text-xs md:text-xs font-battambang font-light"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: messagesPerField.getFirstError("username", "password")
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div>
                                {/* <Label htmlFor="password" className="text-xs font-light text-gray-700 font-battambang">
                                    {msg("password")}
                                </Label> */}
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        labelText="Password"
                                        id="password"
                                        className="text-foreground font-battambang"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="input-error py-3 text-xs md:text-xs font-battambang font-light"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError("username", "password")
                                        }}
                                    />
                                )}
                            </div>

                            <div className="md:space-y-0 md:justify-between text-lg">
                                <div>
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center space-x-2">
                                            <input
                                                tabIndex={5}
                                                className={clsx(checkboxVariants({}), "")}
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                            />
                                            <span className="text-xs font-light font-battambang" >{msgStr("rememberMe")}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end w-full"> {/* Alineación a la derecha */}
                                    {realm.resetPasswordAllowed && (
                                        <span className="text-[10px] font-light font-battambang">
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msgStr("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>


                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <Input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                <Button tabIndex={7} disabled={isLoginButtonDisabled} type="submit" className="w-full rounded-[0.5rem] text-base py-6">
                                    {"Log in →"}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
