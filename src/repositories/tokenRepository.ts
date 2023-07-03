import jwt from 'jsonwebtoken';

export default class TokenRepository {
  async generateAccessToken(user: object, expiresIn: string): Promise<string> {
    const generatedToken = await jwt.sign(user, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn,
    });

    return generatedToken;
  }

  async generateRefreshToken(user: object, expiresIn: string): Promise<string> {
    const generatedToken = await jwt.sign(user, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn,
    });

    return generatedToken;
  }

  verifyAccessToken(token: string): jwt.JwtPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as jwt.JwtPayload;

    return verifiedToken;
  }

  verifyRefreshToken(token: string): jwt.JwtPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as jwt.JwtPayload;

    return verifiedToken;
  }
}
