import React from 'react';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./phoneInput.css"
const PhoneInput = ({country = "pk", value = "", onChange = ()=>{}, placeholder = "", name = "phone", ref = null}) => {
    return (
        <ReactPhoneInput
            country={country}
            value={value}
            placeholder={placeholder}
            onChange={(phone)=>onChange({target: {value: phone, name}})}
            inputStyle={{width: "100%", height: "48px"}}
        />
    )
}

export default PhoneInput;
