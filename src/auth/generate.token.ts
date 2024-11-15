import * as jwt from "jsonwebtoken"
import "dotenv/config"

async function generateToken(payload: object): Promise<object> {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET aniqlanmadi");
        }
        if (typeof payload !== "object") {
            throw new Error(`Payload must be in object format`)
        }

        const accessToken = jwt.sign(payload, secret as string, { expiresIn: "1d" })
        const refreshToken = jwt.sign(payload, secret as string, { expiresIn: "7d" })

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default generateToken