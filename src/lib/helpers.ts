import bcrypt from "bcrypt"

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)
  return hash;
};

export const matchPassword = async (password: string, savedPassword: string) => {
  return bcrypt.compare(password, savedPassword);
};

export const getQueryString = (body: any) => {
  const keys = Object.keys(body)
  const values = Object.values(body)

  let i: number = 0
  let query = ''
  for(const key of keys) {
    if(i>0) {
      query += '&'
    }

    query += `${key}=${values[i++]}`
  }

  return query
}