import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import UserModel from './models/user.model';
import GoogleModel from './models/google.model';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStategy = passportLocal.Strategy;

// 可做登入 or 驗證token

// Google Token
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    passReqToCallback: true
}, async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        console.log('accessToken=>', accessToken)
        console.log('refreshToken=>', refreshToken)
        console.log('profile=>', profile)
        const uid = profile.id;
        const name = profile.displayName;
        const email = profile.emails;
        const existingGoogle = await GoogleModel.findOne({ uid });
        if (existingGoogle) {
            return done(null, existingGoogle);
        }
        const newGoogleUser = new GoogleModel({ uid, name, email });

        await newGoogleUser.save();
        done(null, newGoogleUser);
    } catch (error) {
        console.log('eeee=>', error)
        done(error, false, error.message);
    }
}));

export const Passport = passport;

