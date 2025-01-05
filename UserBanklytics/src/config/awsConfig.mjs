import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
AWS.config.update({
    region: process.env.AWS_R,
});

export const cognito = new AWS.CognitoIdentityServiceProvider();
export const USER_POOL_ID = process.env.USER_POOL_ID;
export const CLIENT_ID = process.env.CLIENT_ID;

