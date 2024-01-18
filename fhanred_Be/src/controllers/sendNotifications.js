const { User, Contract} = require('../data');
const response = require('../utils/response');
const sendEmail = require('../helpers/sendEmail')
const bcrypt = require('bcrypt');
const generatePassword = require('../helpers/generatePassword');
const fs = require('fs');
const imageBuffer = fs.readFileSync('D:/IT/fhanRed/fhanred_fe/src/assets/Logo/Logo.jpg');
const base64Image = imageBuffer.toString('base64');

module.exports = async (res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Contract,
                attributes: ['id_Contract', "estado_contrato", "name_plan", "ultimo_pago"], 
                foreignKey: 'n_documento' ,
                where: {
                    estado_contrato: "ACTIVO", // Solo muestra los usuarios con un estado de contrato ACTIVO
                },
            }],
            where: {
                password: null,
            },
        });

        if (users.length > 0) { 
            for (const user of users) {
                if (user.password === null) {
                    const newPassword = generatePassword(15);
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    await User.update(
                        { password: hashedPassword },
                        { where: { email: user.email } }
                    );
                    /* await sendEmail({
                        email: "user.email",
                        subject: 'Documentación solicitada',
                        message: 
                            `<img src="data:image/jpeg;base64,${base64Image}" alt='Logo de la compañía' style='width: 200px; height: auto'></img>
                            <p style='color: blue; font-size: 18px'>Estimado usuario: Deseamos informarle que nuestra compañia ha cambiado de nombre, por ello solicitamos que ingrese al siguiente link: xxxxx, con los siguientes datos:</p>
                            <p>usuario: <span style='color: green; font-size: 20px;'>${user.email}</span></p>
                            <p>contraseña: <span style='color: green; font-size: 20px;'>${newPassword}</span></p>
                            <p style='color: blue;'>Una vez que haya ingresado, suba la imagen de la documentación solicitada. Por su seguridad, solicitamos que modifique la contraseña.</p>`,
                    }); */
                }
            }
            response(res, 200, { message: 'Correo electrónico enviado exitosamente' });
        } else {
            response(res, 404, { error: 'No se encontraron usuarios con las condiciones especificadas' });
        }
    } catch (error) {console.error('Error al ejecutar sendNotifications:', error);
}};