import axios from 'axios'
import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from 'next/dist/server/api-utils'
import api from '../../../api'

export default NextAuth({
    providers: [        
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,            
        }),
    ],
    pages: {
        signIn: '/auth/signin',        
    },
    callbacks: {
        async signIn({ user, account, profile }) {            
            const response = await axios({
                method: 'POST',
                url: `${api.restAuth}/${account.provider}/`,
                data: {
                    access_token: account.access_token
                }
            });            
            if (response.status === 200) {                                                                   
                account.refresh_token = response.data.key                 
                return true
            } else {
                return false
            }     
        },        
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {                            
            session.token = token.token         
            const response = await axios({
                method: 'GET',
                url: api.profile,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token.token}`
                }
            });
            if (response.status === 200) {                                                                                
                session.id = response.data.id    
                session.username = response.data.username
                session.role = response.data.role
                session.website = response.data.website
                session.avatar = response.data.avatar                                 
            } else {
                return null
            }                 
            return session
        },
        async jwt({ token, account, profile }) {                
            if (account) {
                token.token = account.refresh_token            
            }
            return token
        },
    }
})
