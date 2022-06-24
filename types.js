import { User } from 'next-auth'

export default class AuthenticatedUser extends User {
    accessToken;
}