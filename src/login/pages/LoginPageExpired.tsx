import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { AlertTriangle } from "lucide-react"; // Asegúrate de tener lucide-react o cambia por otro icono

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <div className="flex items-center justify-center gap-2 text-red-600 text-lg font-semibold">
                    <AlertTriangle className="w-6 h-6" />
                    {msg("pageExpiredTitle")}
                </div>
            }
        >
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md text-center max-w-lg mx-auto">
                <p className="text-sm text-gray-700 mb-4">
                    {msg("pageExpiredMsg1")}
                </p>

                <a
                    id="loginRestartLink"
                    href={url.loginRestartFlowUrl}
                    className="mb-4 inline-block text-white text-center bg-[#5613BF] bg-opacity-100 px-4 py-2 rounded-md shadow-sm no-underline hover:no-underline transition-all duration-200 hover:scale-105 hover:bg-opacity-90 hover:text-white"
                >
                    Click here to restart the login process
                </a>

                <p className="text-sm text-gray-700 mb-4">
                    {msg("pageExpiredMsg2")}
                </p>

                <a
                    id="loginContinueLink"
                    href={url.loginAction}
                    className="mb-4 inline-block text-white text-center bg-[#5613BF] bg-opacity-100 px-4 py-2 rounded-md shadow-sm no-underline hover:no-underline transition-all duration-200 hover:scale-105 hover:bg-opacity-90 hover:text-white"
                >
                    Click Here to continue
                </a>
            </div>
        </Template>
    );
}