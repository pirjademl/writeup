export interface Blog {
    blogId: string;
    content: string;
    title: string;
    published_At: string;
    created_At: string;
    authorId: string;
    status: 'published' | 'draft';
}

export interface IUser {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
}
