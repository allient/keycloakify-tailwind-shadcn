import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useState } from "react";

export default function LoginVerifyEmail(
    props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;
    const { url, user } = kcContext;

    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // toast visible por 4 segundos
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <div>
                    <p className="instruction bg-muted border border-secondary rounded-md p-4 shadow-sm">
                        {msg("emailVerifyInstruction2")}
                        <br />
                        <a
                            href={url.loginAction}
                            className={cn(buttonVariants({ variant: "link" }), "underline px-0 bg-muted")}
                            onClick={handleClick}
                        >
                            {msg("doClickHere")}
                        </a>
                        &nbsp;
                        {msg("emailVerifyInstruction3")}
                    </p>

                    {showToast && (
                        <div className="mt-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md p-3 shadow-sm transition-all">
                            📩 We’ve resent the email. Please check your inbox.
                        </div>
                    )}
                </div>
            }
        >
            <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </Template>
    );
}