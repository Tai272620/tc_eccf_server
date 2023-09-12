import { TextType } from "./en";

const data: TextType = {
    /* Mail */
    signature: "Chúc bạn một ngày tốt lành",
    hello: "Xin Chào",
    intro: `Cảm ơn bạn đã tham gia cộng đồng ${process.env.APP_NAME}! Chúng tôi rất vui vì điều đó!`,
    instructionOne: "Để xác thực email cho tài khoản ",
    instructionTwo: " vui lòng bấm vào liên kết bên dưới:",
    mailBtnText: "Xác thực email",
    outro: "Cần giúp hoặc có câu hỏi? Chỉ cần trả lời email này, chúng tôi rất sẵn lòng trợ giúp",
    modelError: "Lỗi Model",
    userNameDuplicate: "Tên đăng nhập đã tồn tại",
    emailDuplicate: "Email đã tồn tại",
    registerSuccess: "Đăng kí tài khoản thành công, vui lòng kiểm tra email xác thực",
    /* Login Api */
    error001: "Tài khoản đang bị tạm khoá",
    error002: "Mật khẩu không chính xác",
    error003: "Người dùng không tồn tại",
    success001: "Đăng nhập thành công",
    /* Middleware */
    ipAcceptDenine: "Địa chỉ IP không được chấp nhận",
    error004: "Tên đăng nhập phải có ít nhất 3 ký tự.",
    error005: "Sai định dạng email.",
    error006: "Mật khẩu phải có ít nhất 6 ký tự.",
    error007: "Vui lòng nhập Họ và Tên.",
    /* Controller Error */
    controllerErr: "Lỗi Controller",
    /* Model Error */
    modelErr: "Lỗi Model",
    titleDuplicate: "Tên danh mục sản phẩm đã tồn tại",
    /* Admin Page */
    addProductSuccess: "Thêm sản phẩm thành công",
    addCategorySuccess: "Thêm danh mục sản phẩm thành công",
    /* Order */
    orderSuccess: "Đặt hàng thành công"
}

export default data