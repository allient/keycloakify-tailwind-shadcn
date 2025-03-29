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
                            const hasRequiredActions = (requiredActions?.length ?? 0) > 0;

                            if (hasRequiredActions) {
                                const actionText = requiredActions
                                    ?.map(action => `<strong>${advancedMsgStr(`requiredAction.${action}`)}</strong>`)
                                    .join(", ");

                                return `
                                <div style="text-align: center;">
                                  Just one more step!<br />
                                  Please click the button below to complete the following action:<br />
                                  ${actionText}
                                </div>
                              `;
                            }

                            return `
                              <div style="text-align: center;">
                                🎉 All your information has been successfully updated!<br />
                                Press the button below to return to the app.
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
                            <p className="justify-center flex">
                                <div className={`${buttonVariants({ variant: "default" })}`}>
                                    <a href={actionUri} className="text-primary-foreground hover:text-primary-foreground">
                                        {msg("backToApplication")}
                                    </a>
                                </div>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p className="justify-center flex">
                                <div className={`${buttonVariants({ variant: "default" })}`}>
                                    <a href={actionUri} className="text-primary-foreground hover:text-primary-foreground">
                                        {msg("proceedWithAction")}
                                    </a>
                                </div>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p className="justify-center flex">
                                <div className={`${buttonVariants({ variant: "default" })}`}>
                                    <a href={actionUri} className="text-primary-foreground hover:text-primary-foreground">
                                        {msg("backToApplication")}
                                    </a>
                                </div>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
