export const handleChange = (e, setErrors, setInput, input) => {
    const value = e.target.value;
    const property = e.target.name;

    // Validación de email
    if (property === 'email') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: !value
            ? 'Este campo es obligatorio. Por favor ingrese un correo electrónico.'
            : !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
            ? 'El correo no es válido.'
            : '',
        }));
    }

    // Validación de password
    if (property === 'password') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: !value
            ? 'Este campo es obligatorio. Por favor ingrese una contraseña válida.'
            : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value
                )
            ? 'La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.'
            : '',
        }));
    }

    setInput({ ...input, [property]: value });
};