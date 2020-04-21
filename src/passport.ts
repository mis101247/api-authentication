import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token'; 
import UserModel from './models/user.model';
import GoogleModel from './models/google.model';
import FacebookModel from './models/facebook.model';

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
        done(error, false, error.message);
    }
}));

// Facebook Token
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    passReqToCallback: true
}, async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        const uid = profile.id;
        const name = profile.displayName;
        const email = profile.emails;
        const existingFacebook = await FacebookModel.findOne({ uid });
        if (existingFacebook) {
            return done(null, existingFacebook);
        }
        const newFacebookUser = new FacebookModel({ uid, name, email });

        await newFacebookUser.save();
        done(null, newFacebookUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));

export const Passport = passport;

