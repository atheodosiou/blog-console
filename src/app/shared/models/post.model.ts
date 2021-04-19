export class Post {
    _id?: string;
    title: string;
    preview: string;
    postDate?: string;
    author?: string;
    imageUrl: string;
    content: any;
    status: 'published' | 'draft';
    comments?: Comment[];
    likes?: number;
    shares?: number
    category?: any;
    tags?: string[];
    __v?: number;
}

export class Comment {
    _id?: string;
    by: string;
    on: Date;
    comment: string;
    __v?: number;
}