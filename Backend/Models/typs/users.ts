import joi from "joi";


export type MessaeType = {
  message : string;
  email: string;
  sender: string;
  reciver: string;
  time: string;
}

export type User = {
  _id: number | null;
  password: string | null;
  name: string |null;
  level: string | null;
  email: string
  token: string |null;
  reciverSocketID: string | null;
  senderSocketID:string | null;
  messageSender: string|null;
  messageReceiver: string|null;
  adminSocketID:string|null;
};

export type chatUser = {
email: string;
senderSocketID: string | null;
adminSocketID: string | null
}

const passwordRegexPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/;
const emailRegexPattern =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export const customersValidations = joi.object({
   email: joi
    .string()
    .required()
    .min(12)
   .max(50)
    .regex(emailRegexPattern)
    .messages({
      "string.min": "email must have at least 12 characters",
      "string.pattern.base":
        "email must have at least 12 characters and special char",
    }), 
  password: joi
    .string()
    .required()
    .min(8)
    .max(200)
    .regex(passwordRegexPattern)
    .messages({
      "string.min": "password must have at least 8 characters",
      "string.pattern.base":
        "password must have at least one lowercase, uppercase and special char",
    }),
  name: joi.string().required().min(4).max(50),
});
export const loginCustomersValidations = joi.object({
  email: joi
   .string()
   .required()
   .min(12)
  .max(50)
   .regex(emailRegexPattern)
   .messages({
     "string.min": "email must have at least 12 characters",
     "string.pattern.base":
       "email must have at least 12 characters and special char",
   }), 
 password: joi
   .string()
   .required()
   .min(8)
   .max(200)
   .regex(passwordRegexPattern)
   .messages({
     "string.min": "password must have at least 8 characters",
     "string.pattern.base":
       "password must have at least one lowercase, uppercase and special char",
   }),
});
export const adminValidations = joi.object({
  name: joi.string().required().min(4).max(50),
  level: joi.string().required().min(1),
});

export const validateCustomers = async (customer: User) => {
  const result = customersValidations.validate(customer);
  if (result.error) throw result.error.message;
};

export const loginValidateCustomers = async (customer: User) => {
  const result = loginCustomersValidations.validate(customer);
  if (result.error) throw result.error.message;
};
export const validateAdmins = async (admin: User) => {
  const result = adminValidations.validate(admin);
  if (result.error) throw result.error.message;
};

