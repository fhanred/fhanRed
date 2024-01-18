const generatePassword = (num) => {
    const characters = 'ABCDE012FGHIJKLMNO3456PQRSTU789VWXYZab¡!#$%cdefghi&/()=?jklmnop¿*+-qrstuv_.:,;[]{}wxyz';
    let result = '';
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return result;
};

module.exports = generatePassword;