import { useEffect, useReducer, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Input } from "../components/ui/input";
import { PasswordWrapper } from "../components/ui/PasswordWrapper";

/**
 * Renders each form field by looping through formFieldStates:
 *
 * formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
 *   ├─ GroupLabel (optional): Displays the group header if the field belongs to a group.
 *   ├─ BeforeField (optional): Custom component rendered before the form field.
 *   ├─ Form Field
 *   │   ├─ Label: Displays the field's name (e.g., "Username", "Email").
 *   │   ├─ Input Field (dynamic based on field type):
 *   │   │   ├─ InputTag: Standard input fields like text, email, etc.
 *   │   │   ├─ TextareaTag: For textarea fields.
 *   │   │   ├─ SelectTag: For dropdown/select fields.
 *   │   │   ├─ InputTagSelects: For radio buttons or checkboxes.
 *   │   │   └─ PasswordWrapper: For password fields with show/hide functionality.
 *   │   └─ Helper Text (optional): Additional information displayed before or after the input field.
 *   ├─ FieldErrors (optional): Displays validation errors for the current field.
 *   ├─ AddRemoveButtonsMultiValuedAttribute (optional): Add/Remove buttons for multiple values in the field.
 *   └─ AfterField (optional): Custom component rendered after the form field.
 * })
 */

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <div className="prose dark:prose-invert grid grid-cols-1 gap-y-3 p-1">
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <div className=" my-2">
                        <Fragment key={attribute.name}>
                            <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />
                            {BeforeField !== undefined && (
                                <BeforeField
                                    attribute={attribute}
                                    dispatchFormAction={dispatchFormAction}
                                    displayableErrors={displayableErrors}
                                    valueOrValues={valueOrValues}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                            )}
                            <div
                                // className={kcClsx("kcFormGroupClass")}
                                className=""
                                style={{
                                    display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
                                }}
                            >
                                {/* <div className="mx-6">
                                    <label htmlFor={attribute.name} className={"text-xs font-light text-gray-700 font-battambang"}>
                                        {advancedMsg(attribute.displayName ?? "")}
                                    </label>
                                    {attribute.required && <span className="text-danger"> *</span>}
                                </div> */}
                                <div className={kcClsx("kcInputWrapperClass")}>
                                    {attribute.annotations.inputHelperTextBefore !== undefined && (
                                        <div
                                            className={`${kcClsx("kcInputHelperTextBeforeClass")} text-[10px]`}
                                            id={`form-help-text-before-${attribute.name}`}
                                            aria-live="polite"
                                        >
                                            {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                        </div>
                                    )}
                                    <InputFieldByType
                                        attribute={attribute}
                                        valueOrValues={valueOrValues}
                                        displayableErrors={displayableErrors}
                                        dispatchFormAction={dispatchFormAction}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                    <FieldErrors attribute={attribute} displayableErrors={displayableErrors} kcClsx={kcClsx} fieldIndex={undefined} />
                                    {attribute.annotations.inputHelperTextAfter !== undefined && (
                                        <div
                                            className={kcClsx("kcInputHelperTextAfterClass")}
                                            id={`form-help-text-after-${attribute.name}`}
                                            aria-live="polite"
                                        >
                                            {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                        </div>
                                    )}

                                    {AfterField !== undefined && (
                                        <AfterField
                                            attribute={attribute}
                                            dispatchFormAction={dispatchFormAction}
                                            displayableErrors={displayableErrors}
                                            valueOrValues={valueOrValues}
                                            kcClsx={kcClsx}
                                            i18n={i18n}
                                        />
                                    )}
                                    {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                                </div>
                            </div>
                        </Fragment>
                    </div>
                );
            })}
        </div>
    );
}
/**
 * GroupLabel:
 * This component is responsible for rendering a label and description for form field groups.
 * It checks whether the current form field belongs to a group and, if so, renders the group's header and description.
 * The group name is compared with a reference (`groupNameRef`) to ensure that the label is only rendered once per group.
 * It uses `i18n` for internationalization, translating the group's header and description.
 *
 * Props:
 * - attribute: The current form field's attribute object, which contains details about the field's group, name, and more.
 * - groupNameRef: A reference object that tracks the current group name to prevent duplicate labels for the same group.
 * - i18n: An internationalization object used to translate messages.
 * - kcClsx: A utility function used to apply Keycloak-specific CSS classes.
 */
function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={kcClsx("kcFormGroupClass")}
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <div className={kcClsx("kcContentWrapperClass")}>
                                <label id={`header-${attribute.group.name}`} className={kcClsx("kcFormGroupHeader")}>
                                    {groupHeaderText}
                                </label>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <div className={kcClsx("kcLabelWrapperClass")}>
                                    <label id={`description-${attribute.group.name}`} className={kcClsx("kcLabelClass")}>
                                        {groupDescriptionText}
                                    </label>
                                </div>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined; kcClsx: KcClsx }) {
    const { attribute, fieldIndex, kcClsx } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <span
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            // className={kcClsx("kcInputErrorMessageClass")}
            className="input-error py-3 text-xs md:text-xs font-battambang font-light"
            aria-live="polite"
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
        </span>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper kcClsx={props.kcClsx} i18n={props.i18n} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;

    const { advancedMsgStr } = i18n;

    return (
        <>
            <Input
                type={(() => {
                    const { inputType } = attribute.annotations;

                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }

                    return inputType ?? "text";
                })()}
                labelText={advancedMsgStr(attribute.displayName ?? "")}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");

                    return valueOrValues;
                })()}
                className={"text-foreground font-battambang"}
                aria-invalid={displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors attribute={attribute} kcClsx={kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <>
            {hasRemove && (
                <>
                    <button
                        id={`kc-remove${idPostfix}`}
                        type="button"
                        className="pf-c-button pf-m-inline pf-m-link"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
                    >
                        {msg("remove")}
                    </button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    className="pf-c-button pf-m-inline pf-m-link"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </button>
            )}
        </>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, valueOrValues } = props;

    const { advancedMsg } = props.i18n;

    const { classDiv, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;

        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classDiv: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classDiv: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        <>
            {options.map(option => (
                <div key={option} className={classDiv}>
                    <input
                        type={inputType}
                        id={`${attribute.name}-${option}`}
                        name={attribute.name}
                        value={option}
                        className={classInput}
                        aria-invalid={props.displayableErrors.length !== 0}
                        disabled={attribute.readOnly}
                        checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
                        onChange={event =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = event.target.checked;

                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];

                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }

                                        return newValues;
                                    }

                                    return event.target.checked ? option : "";
                                })()
                            })
                        }
                        onBlur={() =>
                            dispatchFormAction({
                                action: "focus lost",
                                name: attribute.name,
                                fieldIndex: undefined
                            })
                        }
                    />
                    <label
                        htmlFor={`${attribute.name}-${option}`}
                        className={`${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}`}
                    >
                        {advancedMsg(option)}
                    </label>
                </div>
            ))}
        </>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;

    return (
        <textarea
            id={attribute.name}
            name={attribute.name}
            className={"text-foreground font-battambang"}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, i18n, valueOrValues } = props;

    const { advancedMsgStr } = i18n;

    const isMultiple = attribute.annotations.inputType === "multiselect";

    return (
        <div className="relative w-full">
            {/* Label flotante */}
            <label
                htmlFor={attribute.name}
                className="text-gray-500 absolute left-2 top-0 z-10 inline-block -translate-y-1/2 peer-placeholder-shown:translate-y-1/2 bg-white px-2 py-0.5 text-xs font-semibold font-battambang transition-all"
            >
                {advancedMsgStr(attribute.displayName ?? "")}
            </label>

            {/* Select sin borde azul al hacer clic */}
            <select
                id={attribute.name}
                name={attribute.name}
                className="peer w-full text-sm font-battambang border-2 border-gray-300 rounded-lg bg-white px-3 py-4 h-14 appearance-none focus:outline-none hover:border-[#8188e0]"
                aria-invalid={displayableErrors.length !== 0}
                disabled={attribute.readOnly}
                value={valueOrValues}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (isMultiple) {
                                return Array.from(event.target.selectedOptions).map(option => option.value);
                            }
                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined
                    })
                }
            >
                {!isMultiple && <option value="" className="text-gray-400">Choose one option</option>}
                {(() => {
                    const options = (() => {
                        walk: {
                            const { inputOptionsFromValidation } = attribute.annotations;
                            if (inputOptionsFromValidation === undefined) break walk;
                            assert(typeof inputOptionsFromValidation === "string");
                            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];
                            if (validator === undefined || validator.options === undefined) break walk;
                            return validator.options;
                        }
                        return attribute.validators.options?.options ?? [];
                    })();

                    return options.map(option => (
                        <option key={option} value={option}>
                            {(() => {
                                if (attribute.annotations.inputOptionLabels !== undefined) {
                                    const { inputOptionLabels } = attribute.annotations;
                                    return advancedMsgStr(inputOptionLabels[option] ?? option);
                                }
                                if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
                                    return advancedMsgStr(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
                                }
                                return option;
                            })()}
                        </option>
                    ));
                })()}
            </select>

            {/* Flecha del select */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}
