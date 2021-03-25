export class Post {
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
}

export class Comment {
    by: string;
    on: Date;
    comment: string;
}