import { Request, Response, NextFunction } from "express";
import Text from '../text';

export default {
    validateRegistrationData: function validateRegistrationData(req: Request, res: Response, next: NextFunction) {
        const { userName, email, firstName, lastName, password } = req.body;
        let error;

        // Kiểm tra độ dài tên người dùng
        if (userName.length < 3) {
            error = (Text(String(req.headers.language)) as any).error004;
        }

        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = (Text(String(req.headers.language)) as any).error005;
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            error = (Text(String(req.headers.language)) as any).error006;
        }

        // Kiểm tra họ và tên không trống
        if (firstName.length === 0 || lastName.length === 0) {
            error = (Text(String(req.headers.language)) as any).error007;
        }

        if (error) {
            return res.status(213).json({
                status: false,
                message: error
            });
        }
        // Nếu không có lỗi, tiếp tục xử lý
        next();
    }
}


