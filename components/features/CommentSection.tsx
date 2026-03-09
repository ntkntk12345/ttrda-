"use strict";
"use client";
import React, { useState } from 'react';
import { Send, ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface Comment {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    time: string;
    likes: number;
    replies: number;
}

const MOCK_COMMENTS: Comment[] = [
    {
        id: '1',
        user: { name: 'Nguyễn Văn A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        content: 'Phim hay quá, đoạn cuối cảm động thực sự! 😭😭',
        time: '2 giờ trước',
        likes: 124,
        replies: 5
    },
    {
        id: '2',
        user: { name: 'Trần Thị B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
        content: 'Diễn viên đóng đạt, kỹ xảo cũng đỉnh nữa.',
        time: '5 giờ trước',
        likes: 89,
        replies: 2
    },
    {
        id: '3',
        user: { name: 'Le C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
        content: 'Hóng phần 2 quá đi mất 🔥',
        time: '1 ngày trước',
        likes: 45,
        replies: 0
    }
];

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState('');

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: { name: 'Bạn', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User' },
            content: newComment,
            time: 'Vừa xong',
            likes: 0,
            replies: 0
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Bình luận <span className="text-gray-400 text-sm font-normal">({comments.length})</span>
            </h3>

            {/* Input Area */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
                <div className="flex-1">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Chia sẻ cảm nghĩ của bạn về phim..."
                        className="w-full bg-[#0f172a] text-white rounded-xl border border-white/10 p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y transition-all placeholder:text-gray-500"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handlePostComment}
                            disabled={!newComment.trim()}
                            className="bg-primary hover:bg-primary/90 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-4 h-4" />
                            Gửi
                        </button>
                    </div>
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                            <img
                                src={comment.user.avatar}
                                alt={comment.user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white text-sm">{comment.user.name}</span>
                                <span className="text-gray-500 text-xs">• {comment.time}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-2">{comment.content}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <button className="flex items-center gap-1 hover:text-white transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{comment.likes}</span>
                                </button>
                                <button className="hover:text-white transition-colors">Phản hồi</button>
                                <button className="hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
                <button className="text-primary hover:text-white text-sm font-medium transition-colors">
                    Xem thêm bình luận cũ hơn
                </button>
            </div>
        </div>
    );
}
