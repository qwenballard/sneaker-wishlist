import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendMagicLinkEmail } from '../lib/sendMagicLinkEmail';
import { verifySupabaseToken } from '../lib/verifySupabaseToken';
import * as userProfileModel from '../models/userProfileModel';

const APP_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

// Handle sending magic link email
export const sendMagicLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    // Send the magic link using Supabase
    await sendMagicLinkEmail(email);

    res.status(200).json({ message: 'Magic link sent' });
  } catch (error) {
    console.error('Send Magic Link error:', error);

    // todo: create custom error class and refactor error handling later
    if ((error as any).code === 429) {
      res.status(500).json({
        error: 'Error Code 429: Please wait a minute before trying again.',
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Handle user login (this is when the user clicks the magic link)
export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { supabaseAccessToken } = req.body;

  if (!supabaseAccessToken) {
    res.status(400).json({ error: 'Missing Supabase access token' });
    return;
  }

  try {
    const userInfo = (await verifySupabaseToken(
      supabaseAccessToken
    )) as JwtPayload;

    const { sub: oauthId, email, app_metadata } = userInfo;
    const provider = app_metadata?.provider;

    if (!oauthId || !email || !provider) {
      res
        .status(400)
        .json({ error: 'Missing oauthId, email, or provider in token' });
      return;
    }

    // Check if user profile exists in your custom table
    let userProfile = await userProfileModel.findUserProfileByUserId(oauthId);

    if (!userProfile) {
      // Create a new user profile if it doesn't exist
      userProfile = await userProfileModel.createUserProfile({
        userId: oauthId,
      });
    }

    // Issue an app JWT for authentication
    const appJwt = jwt.sign(
      { userId: userProfile.userId, email: email },
      APP_JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    );

    // Store the JWT in a secure HttpOnly cookie
    res.cookie('app_token', appJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle user logout
export const handleLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie('app_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Logout successful' });
  return;
};

// Handle getting current user (protected route)
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies['app_token'];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, APP_JWT_SECRET!);
    const userProfile = await userProfileModel.findUserProfileByUserId(
      decoded.userId
    );

    if (!userProfile) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error verifying JWT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
