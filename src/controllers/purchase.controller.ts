import purchaseModel from "../models/purchase.model";
import { Request, Response } from "express";
import Text from '../text';
import otps from "../services/otps";
import mail, { templates } from "../services/mail";

export default {
    createGuestReceipt: async function (req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);
            /* Maill */
            await mail.sendMail({
                to: `${modelRes.data?.email}`,
                subject: "Hóa đơn",
                html: await templates.reportReceiptTemplate(modelRes.data)
            })
            //modelRes.data?.guestReceiptDetail[0].quantity
            /* End */
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    createUserReceipt: async function (req: Request, res: Response) {
        console.log("da vao controller")
        try {
            console.log("req.body", req.body)
            let newUserReceipt = req.body.newUserReceipt;
            let userReceiptDetailList = req.body.userReceiptDetailList;
            let userId = req.body.userId
            let modelRes = await purchaseModel.createUserReceipt(newUserReceipt, userReceiptDetailList, userId);
            /* Maill */
            // await mail.sendMail({
            //     to: `${modelRes.data?.email}`,
            //     subject: "Hóa đơn",
            //     html: await templates.reportReceiptTemplate(modelRes.data)
            // })
            //modelRes.data?.guestReceiptDetail[0].quantity
            /* End */
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findManyGuestReceipts: async function (req: Request, res: Response) {
        try {
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await purchaseModel.findManyGuestReceipts(maxItemPage, skipItem);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.findById(req.params.orderId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    findGuestReceipt: async function (req: Request, res: Response) {
        console.log("req", req.body)
        try {
            let modelRes = await purchaseModel.findGuestReceipt(String(req.body.guestEmail));
            if (req.body.otp) {
                /* có otp */
                let result = otps.checkOtp(String(req.body.guestEmail), String(req.body.otp))
                if (result) {
                    return res.status(modelRes.status ? 200 : 213).json(modelRes);
                }
            } else {
                console.log("chưa có otp")
                /* chưa có otp */
                if (modelRes.status && modelRes.data != null) {
                    console.log("chưa có 222", modelRes.data)
                    if (modelRes.data?.length > 0) {
                        let otpObj = otps.createOtp(String(req.body.guestEmail), 5);
                        console.log("otpObj", otpObj)
                        if (otpObj) {
                            /* gửi otp tới cho khách */
                            let mailSent = await mail.sendMail({
                                subject: "Gửi OTP",
                                to: `${String(req.body.guestEmail)}`,
                                html: templates.sendOtp(otpObj?.otp, new Date(otpObj?.createAt))
                            })
                            return res.status(mailSent ? 200 : 213).json({
                                message: `${mailSent ? "OTP đã gửi tới email" : "Lỗi dịch vụ"}`
                            });
                        }
                    } else {
                        return res.status(213).json({
                            message: "Quý khách chưa phát sinh giao dịch!"
                        });
                    }
                }
            }
            return res.status(213).json({
                message: "OTP Không hợp lệ!"
            });
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findUserReceipt: async function (req: Request, res: Response) {
        console.log("req.body", req.body);

        try {
            let userId = req.body.userId
            let modelRes = await purchaseModel.findUserReceipt(userId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
    update: async function (req: Request, res: Response) {
        try {
            let modelRes = await purchaseModel.update(String(req.params.orderId), {
                state: req.body.state
            }, req.body.type);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: (Text(String(req.headers.language)) as any).controllerErr
            })
        }
    },
}