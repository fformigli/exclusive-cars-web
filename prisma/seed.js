"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../src/lib/prisma"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.default.user.create({
            data: {
                username: 'admin',
                password: '$2a$10$Z0.J2AZa44av6sVM20qXu.JNscwf6IYBqwH/nMRL84b1jBtZlzHDu',
                fullName: 'Administrador',
                role: {
                    create: {
                        name: 'Administrador'
                    }
                }
            }
        });
    });
}
main()
    .catch(e => {
    console.log(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}));
