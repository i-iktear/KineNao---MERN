import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Iktear',
        email: 'iktear@gmail.com',
        password: bcrypt.hashSync('abc123',15),
        isAdmin: true
    },
    {
        name: 'Iktear uddin',
        email: 'iktearuddin@gmail.com',
        password: bcrypt.hashSync('abc123',15),
    },
    {
        name: 'Iktear uddin emon',
        email: 'iktearuddinemon@gmail.com',
        password: bcrypt.hashSync('abc123',15),
    },
]

export default users