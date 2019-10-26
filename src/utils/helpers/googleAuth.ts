// import { google } from 'googleapis';
//
// const clientID = process.env.GOOGLE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
// const callbackURL = process.env.GOOGLE_CALLBACK;
//
// const oauth2Client = new google.auth.OAuth2(
//   clientID, clientSecret, callbackURL
// );
//
// // generate a url that asks permissions for profile and email scopes
// const scopes = [
//   'profile', 'email',
// ];
//
// export const googleAuthUrl = () => oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   // If you only need one scope you can pass it as a string
//   scope: scopes,
// });
