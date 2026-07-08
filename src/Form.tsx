import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface BoxProps {
    value: [string | undefined, Dispatch<SetStateAction<string | undefined>>],
    className?: string | undefined,
    id?: string | undefined,
    style?: React.CSSProperties | undefined,
    placeholder?: string | undefined,
}

interface FormInputProps extends BoxProps {
    type: string,
    min?: number,
    max?: number,
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
}

interface TextBoxProps extends BoxProps {
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
}

interface TextNumberProps extends BoxProps {
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
}

interface TextAreaProps extends BoxProps {
    onChange?: ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement> | undefined,
}

interface SelectBoxProps extends BoxProps {
    onChange?: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> | undefined,
    selectors?: {[value: string] : string},
    empty?: string | undefined,
}

interface RadioButtonProps extends BoxProps {
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
    selectors?: {[value: string] : string},
}

interface CheckBoxProps {
    values: [Array<string> | undefined, Dispatch<SetStateAction<Array<string> | undefined>>],
    className?: string | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
    selectors?: {[value: string] : string},
    id?: string | undefined,
    style?: React.CSSProperties | undefined,
    placeholder?: string | undefined,
}

interface FromFileProps {
    multiple?: boolean,
    pattern?: string,
    className?: string | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined,
    value: Dispatch<SetStateAction<FileList | undefined>>,
    id?: string | undefined,
    style?: React.CSSProperties | undefined,
    placeholder?: string | undefined,
}

export const FormInput = (props: FormInputProps) => {

    return (
        <input
        type={props.type}
        defaultValue={props.value[0]}
        className={props.className}
        min={props.min}
        max={props.max}
        id={props.id}
        style={props.style}
        placeholder={props.placeholder}
        onChange={(e)=>{ 
            if (props.onChange) props.onChange(e);
            props.value[1](e.target.value);
        }}
        />
    );
};

export const TextBox = (props: TextBoxProps) => {

    return (
        <FormInput 
        {...props}
        type="text"
        />
    );
};

export const TextNumber = (props: TextNumberProps) => {

    return (
        <FormInput 
        {...props}
        type="number"
        />
    )
};

export const TextArea = (props: TextAreaProps) => {

    return (
        <textarea
        defaultValue={props.value[0]}
        className={props.className}
        id={props.id}
        style={props.style}
        placeholder={props.placeholder}
        onChange={(e)=>{ 
            if (props.onChange) props.onChange(e);
            props.value[1](e.target.value);
        }}/>
    );
};

export const SelectBox = (props: SelectBoxProps) => {

    return (
        <select
        value={props.value[0]}
        id={props.id}
        style={props.style}
        onChange={(e)=>{
            if (props.onChange) props.onChange(e);
            props.value[1](e.target.value);
        }}>
            {props.empty ?
                <option>{props.empty}</option>
            : ""}
            {props.selectors ?
                Object.keys(props.selectors).map(value=>{
                    return (
                        <option value={value}>{props.selectors![value]}</option>
                    );
                })
            : ""}
        </select>
    )
};

export const RadioButton = (props: RadioButtonProps) => {

    const rkey = Math.random().toString();

    return (
        <>
            {props.selectors ?
            Object.keys(props.selectors).map((value)=>{
                let checked = false;
                if (props.value[0] === value) checked = true;
                return (
                    <label>
                        <input
                        type="radio"
                        name={rkey}
                        value={value}
                        checked={checked ? true : false}
                        className={props.className}
                        onChange={(e)=>{
                            if (props.onChange) props.onChange(e);
                            props.value[1](e.target.value);
                        }}
                        />{props.selectors![value]}
                    </label>
                );
            })
           : ""}
        </>
    );
};

export const CheckBox = (props: CheckBoxProps) => {

    return (
        <>
            {props.selectors ?
                Object.keys(props.selectors).map(value => {
                    return (
                        <label>
                            <input
                            type="checkbox"
                            value={value}
                            className={props.className}
                            defaultChecked={(props.values[0] && props.values[0]!.indexOf(value) > -1) ? true : false}
                            onChange={(e)=>{
                                if (props.onChange) props.onChange(e);
                                let buff : Array<string> = [];
                                if (props.values[0]) {
                                    if (props.values[0]!.indexOf(e.target.value) === -1) {
                                        e.target.checked = true;
                                        buff = props.values[0]!;
                                        buff.push(value);
                                        props.values[1](buff);
                                    }
                                    else {
                                        e.target.checked = false;
                                        buff = [];
                                        for(let n = 0 ; n < props.values.length ; n++) {
                                            const v = props.values[0]![n];
                                            if (v !== value) {
                                                buff.push(v);
                                            }
                                        }
                                        props.values[1](buff);
                                    }
                                }
                            }}
                            />{props.selectors![value]}
                        </label>
                    );
                })
            : ""}       
        </>
    );
};

export const FormFile = (props: FromFileProps) => {

    return (
        <input
        type="file"
        multiple={props.multiple}
        pattern={props.pattern}
        className={props.className}
        onChange={(e)=>{
            if (props.onChange) props.onChange(e);
            const files = e.target.files;
            props.value(files ? files : undefined);
        }}
        />
    );
};