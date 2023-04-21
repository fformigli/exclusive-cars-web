import bcrypt from "bcrypt"
export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash;
};

export const matchPassword = async (password: string, savedPassword: string) => {
    return bcrypt.compare(password, savedPassword);
};