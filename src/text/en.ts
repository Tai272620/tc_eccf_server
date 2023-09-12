const data = {
    /* Mail */
    hello: "Hi",
    signature: "Have a good day",
    intro: `Thank you for joining the community ${process.env.APP_NAME}! We are very happy about that!`,
    instructionOne: "To get started with ",
    instructionTwo: " please click here:",
    mailBtnText: "Confirm your account",
    outro: "Need help, or have questions? Just reply to this email, we\'d love to help.",
    /* Api */
    modelError: "Model err",
    userNameDuplicate: "User Name is already exist",
    emailDuplicate: "Email is already exist",
    registerSuccess: "Register Sucessfully, please check confirm email",
    /* Login Api */
    error001: "Account is temporarily locked",
    error002: "Incorrect password",
    error003: "User does not exist",
    success001: "Login successfully",
    /* Middleware */
    ipAcceptDenine: "IP Address Not Accept",
    error004: "User name must be at least 3 characters long.",
    error005: "Invalid email address.",
    error006: "Password must be at least 6 characters long.",
    error007: "First name and last name are required.",

    /* Controller Error */
    controllerErr: "Controller Error",
    /* Model Error */
    modelErr: "Model Error",
    titleDuplicate: "category title is already exist",
    /* Admin Page */
    addProductSuccess: "add product successfully",
    addCategorySuccess: "add category successfully",
    /* Order */
    orderSuccess: "Order successfully"

}
export type TextType = typeof data;
export default data