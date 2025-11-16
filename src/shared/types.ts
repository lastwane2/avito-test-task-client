export interface IrejectOrRequest {
    reason: string,
    comment?: string
}

export interface IAd {
    id: number;
    title: string;
    price: number;
    category: string;
    status: "pending" | "approved" | "rejected" | "draft";
    createdAt: string;
    images: string[];
    description?: string;
    categoryId?: number;
    updatedAt?: string;
    seller?: any;
    characteristics?: any;
    moderationHistory: Array<{
        id: number;
        moderatorName: string;
        comment: string;
        action: string;
        reason: string;
        timestamp: string;
    }>;
}