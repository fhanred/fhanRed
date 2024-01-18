const { User } = require("../data");
const generatePassword = require("../helpers/generatePassword");
const bcrypt = require('bcrypt');
const sendEmail = require('../helpers/sendEmail')
const fs = require('fs');
const imageBuffer = fs.readFileSync('D:/IT/fhanRed/fhanred_fe/src/assets/Logo/Logo.jpg');
const base64Image = imageBuffer.toString('base64');
const response = require("../utils/response");

module.exports = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email }});
    const newPassword = generatePassword(15);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
        { password: hashedPassword },
        { where: { email: user.email } }
    );
    await sendEmail({
            email: user.email,
            subject: 'Restablecimiento de contraseña',
            message: 
                `<img src="data:image/jpeg;base64,${base64Image}" alt='Logo de la compañía' style='width: 200px; height: auto'></img>
                <p style='color: blue; font-size: 18px'>Estimado usuario ha solicitado que le enviemos una nueva contraseña.</p>
                <p>contraseña: <span style='color: green; font-size: 20px;'>${newPassword}</span></p>
                <p style='color: blue;'>Por su seguridad, solicitamos que una vez que ingrese modifique la contraseña por alguna de su elección.</p>`,
        });
    response(res, 200, { message: 'Correo electrónico enviado exitosamente' });
}