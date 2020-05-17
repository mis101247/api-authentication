import JWT from 'jsonwebtoken';
export const signToken = (user: any, method: 'email' | 'google' | 'facebook') => {
    const timeNow = Math.floor(new Date().getTime() / 1000);
    return JWT.sign({
        iss: 'KeyoServer',
        method: method,
        sub: user.id,
        iat: timeNow,
        exp: timeNow + (60 * 60 * 24 * 1),
    }, 'the_key');
}
