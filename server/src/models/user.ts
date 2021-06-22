import bcrypt from 'bcrypt';

import { generateAccessToken } from '../lib';

const login = async ({ prisma, password, username, res }) => {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
        throw new Error('Invalid username.');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid password.');
    }

    const accessToken = generateAccessToken(user.id);
    res.cookie(
        'refreshToken',
        accessToken,
        { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false },
      );

    return user;
};

const create = async ({ prisma, password, passwordConfirm, username }) => {
    const user = prisma.user.findUnique({ where: { username } });

    if (user) {
        throw new Error('Username already in use.');
    }

    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
};

export default {
    login,
    create,
};