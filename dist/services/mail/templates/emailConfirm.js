"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgen_1 = __importDefault(require("mailgen"));
const text_1 = __importDefault(require("../../../text"));
function genEmailString(mailBody) {
    let mailGenerator = new mailgen_1.default({
        theme: 'default',
        product: {
            name: mailBody.productName,
            link: mailBody.productWebUrl
        }
    });
    let email = {
        body: {
            greeting: (0, text_1.default)(mailBody.language).hello,
            signature: (0, text_1.default)(mailBody.language).signature,
            name: mailBody.receiverName,
            intro: (0, text_1.default)(mailBody.language).intro,
            action: {
                instructions: `${(0, text_1.default)(mailBody.language).instructionOne} ${mailBody.productName}, ${(0, text_1.default)(mailBody.language).instructionTwo}`,
                button: {
                    color: '#22BC66',
                    text: (0, text_1.default)(mailBody.language).mailBtnText,
                    link: mailBody.confirmLink
                }
            },
            outro: (0, text_1.default)(mailBody.language).outro
        }
    };
    return mailGenerator.generate(email);
}
exports.default = genEmailString;
