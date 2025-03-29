import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <div className="text-center">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: messageHeader ?? message.summary
                        }}
                    />
                </div>
            }
        >
            <div id="kc-info-message" className="">
                <p
                    className="instruction pb-5"
                    dangerouslySetInnerHTML={{
                        __html: (() => {
                            const actionText = requiredActions?.length
                                ? requiredActions.map(action => `<strong>${advancedMsgStr(`requiredAction.${action}`)}</strong>`).join(", ")
                                : "";

                            return `
                            <div style="text-align: center;">
                              Press the button below to proceed and complete the following action:<br />
                              ${actionText}
                            </div>
                          `;
                        })()
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <p>
                                <a href={pageRedirectUri} className={`${buttonVariants({ variant: "default" })} pl-0`}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p className="justify-center flex">
                                <div className={`${buttonVariants({ variant: "default" })}`}>
                                    <a href={actionUri} className="text-primary-foreground hover:text-primary-foreground">{msg("proceedWithAction")}</a>                                    
                                </div>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p>
                                <a href={client.baseUrl} className={`${buttonVariants({ variant: "default" })} pl-0`}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
