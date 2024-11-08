import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  logger: false,
  debug: false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/auth`,
            {
              email: credentials?.username,
              hashedPassword: credentials?.password,
            }
          );

          const tokenResponse = res.data; // Beklenen response: { accessToken: "...", expires: ... }
          
          if (res.status === 200 && tokenResponse.accessToken) {
            // Sunucudan dönen accessToken'ı döndür
            return { accessToken: tokenResponse.accessToken };
          }

          return null; // Giriş başarısızsa null döndür
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Kullanıcı giriş yaptıysa (user nesnesi varsa)
      if (user) {
        token.accessToken = user.accessToken; // accessToken'ı ekle
      }
      return token; // Güncellenmiş token'ı döndür
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? '/admin/dashboard' : '/admin/dashboard'; // Yönlendirme
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Session'da accessToken'ı sakla
      return session; // Session'ı döndür
    }
  },
  pages: {
    signin: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    jwt: true
  },
  jwt: {
    encryption: false,
    async encode({ token }) {
      return token.accessToken; // Sadece accessToken'ı döndür
    },
    async decode({ token }) {
      return { accessToken: token }; // Sadece accessToken'ı çözümle
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
};

export default NextAuth(authOptions);