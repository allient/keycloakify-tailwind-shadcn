import React from "react";
import { clsx } from "keycloakify/tools/clsx";

export interface SocialProvidersProps {
    social: {
        providers?: Array<{
            alias: string;
            loginUrl: string;
            displayName: string;
            iconClasses?: string;
            providerId?: string;
        }>;
    };
    pageId?: string;
    kcClsx: (...args: any[]) => string;
    clsx: (...args: any[]) => string;
    msg: any;
    realm: {
        password: boolean;
    };
}

export const SocialProviders: React.FC<SocialProvidersProps> = ({
    social,
    pageId,
    kcClsx,
    clsx,
    msg,
    realm
}) => {
    const providers = social.providers || [];

    return (
        realm.password &&
        providers.length > 0 && (
            <>
                {realm.password &&
                    social.providers !== undefined &&
                    social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="mt-5 space-y-5">
                            <div
                                className={clsx(
                                    "text-lg grid gap-2 grid-cols-1", // Apply a grid and gap between items
                                    social.providers.length > 1
                                        ? "md:grid-cols-2"
                                        : "grid-cols-1" // Conditional grid columns
                                )}
                            >
                                {social.providers.map((...[p, , providers]) => (
                                    <div
                                        key={p.alias}
                                        className="group w-full my-2.5 border bg-white hover:bg-gray-200 transition-colors duration-200"
                                        style={{ borderRadius: "0.5rem" }}
                                    >
                                        <a
                                            id={`social-${p.alias}`}
                                            className="relative flex items-center justify-center w-full py-3 px-4 no-underline hover:no-underline "
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {/* Si es Google, usa la imagen en vez del icono */}
                                            {p.alias.toLowerCase().includes("google") ? (
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                                                    alt="Google"
                                                    className="h-5 w-5 absolute left-4"
                                                />
                                            ) : (
                                                p.iconClasses && (
                                                    <i
                                                        className={clsx(p.iconClasses, "absolute left-4 group-hover:text-black transition-colors duration-200")}
                                                        aria-hidden="true"
                                                    ></i>
                                                )
                                            )}
                                            <span className="text-sm font-medium text-gray-900 mx-auto">
                                                {p.alias === "google"
                                                    ? pageId === "register.ftl"
                                                        ? "Sign up with Google"
                                                        : "Sign in with Google"
                                                    : p.displayName}
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-3 text-gray-500 text-sm">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                        </div>

                    )}
            </>
        )
    );
};

export default SocialProviders;
// <div
//     id="kc-social-providers"
//     className={kcClsx("kcFormSocialAccountSectionClass")}
// >
//     <hr />
//     <h2>{msg("identity-provider-login-label")}</h2>
//     <ul
//         className={kcClsx(
//             "kcFormSocialAccountListClass",
//             providers.length > 3 && "kcFormSocialAccountListGridClass"
//         )}
//     >
//         {providers.map(p => (
//             <li key={p.alias}>
//                 <a
//                     id={`social-${p.alias}`}
//                     className={kcClsx(
//                         "kcFormSocialAccountListButtonClass",
//                         providers.length > 3 && "kcFormSocialAccountGridItem"
//                     )}
//                     type="button"
//                     href={p.loginUrl}
//                 >
//                     {p.iconClasses && (
//                         <i
//                             className={clsx(
//                                 kcClsx("kcCommonLogoIdP"),
//                                 p.iconClasses
//                             )}
//                             aria-hidden="true"
//                         ></i>
//                     )}
//                     <span
//                         className={clsx(
//                             kcClsx("kcFormSocialAccountNameClass"),
//                             p.iconClasses && "kc-social-icon-text"
//                         )}
//                         dangerouslySetInnerHTML={{ __html: p.displayName }}
//                     />
//                 </a>
//             </li>
//         ))}
//     </ul>
// </div>
