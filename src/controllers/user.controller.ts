import userModel, { NewUser, Address } from "../models/user.model";
import { Request, Response } from 'express';
import Text from '../text';
import mail, { templates } from "../services/mail";
import jwt from "../services/jwt";
import bcrypt from 'bcrypt';

export default {
    register: async function (req: Request, res: Response) {
        /* Hash Password */
        req.body.password = await bcrypt.hash(req.body.password, 10);
        try {
            /*  */
            let newUser: NewUser = {
                ...req.body,
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now()),
            }
            let modelRes = await userModel.register(newUser);

            modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message];

            /* Mail */
            if (modelRes.status) {
                mail.sendMail({
                    to: `${modelRes.data?.email}`,
                    subject: "Xác thực email",
                    html: templates.emailConfirm({
                        confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt.createToken(modelRes.data, "300000")}`,
                        language: String(req.headers.language),
                        productName: 'Coffee Store',
                        productWebUrl: 'http://localhost:5173/',
                        receiverName: modelRes.data?.firstName + "" + modelRes.data?.lastName
                    })
                })
            }

            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    login: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.inforByUserName(req.body.userName);
            console.log("modelRes", modelRes)
            if (modelRes.status) {
                if (!modelRes.data?.isActive) {
                    return res.status(213).json({
                        message: (Text(String(req.headers.language)) as any).error001
                    });
                }
                let checkPassword = await bcrypt.compare(req.body.password, modelRes.data.password);
                if (!checkPassword) {
                    return res.status(213).json({
                        message: (Text(String(req.headers.language)) as any).error002
                    });
                }
                return res.status(200).json({
                    message: (Text(String(req.headers.language)) as any).success001,
                    token: jwt.createToken(modelRes.data, "1d")
                })
            }
            return res.status(213).json({
                message: (Text(String(req.headers.language)) as any).error003
            })
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
}

