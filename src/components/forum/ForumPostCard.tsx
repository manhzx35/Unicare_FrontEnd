import { useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: number;
  author: Author;
  time: string;
  tags: string[];
  title: string;
  content: string;
  responses: number;
  saved: boolean;
  responders: string[];
}

interface ForumPostCardProps {
  post: Post;
}

/**
 * Reusable Forum Post Card.
 * Displays author, content, tags, and interactive actions.
 * State: Reacts to "Like/Hug" to instantly update the count.
 * State: Reacts to "Save" to toggle the bookmark.
 */
export default function ForumPostCard({ post }: ForumPostCardProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved);

  // Parse markdown-style bold text for simple rendering
  const parseContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-[#1A1A2E] font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <article className="bg-white rounded-2xl p-6 shadow-soft-sm hover:shadow-soft-md transition-shadow duration-base">
      {/* Post Header: Avatar + Meta */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-[#1A1A2E]">{post.author.name}</span>
            <span className="text-xs text-peace-safe">{post.time}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex px-2.5 py-1 rounded-full bg-peace-serene/15 text-[#4C6F87] text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <h3 className="font-heading text-xl text-[#1A1A2E] mb-3">{post.title}</h3>
      <p className="text-sm text-peace-trust leading-relaxed mb-4">
        {parseContent(post.content)}
      </p>

      {/* Post Actions & Responders */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#E5E7EB]">
        
        <div className="flex items-center gap-2">
          {/* Mock Like / Hug */}
          <button
            onClick={toggleLike}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-base border-none cursor-pointer
              ${
                isLiked
                  ? 'bg-sleep-restful/10 text-sleep-deep'
                  : 'bg-transparent text-peace-safe hover:bg-[#F3F4F6] hover:text-[#4A5568]'
              }
            `}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-sleep-deep text-sleep-deep' : ''}`}
            />
            {likes > 0 && <span>{likes}</span>}
          </button>

          {/* Add Response */}
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-peace-safe bg-transparent hover:bg-[#F3F4F6] hover:text-[#4A5568] transition-colors duration-base border-none cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Bình luận</span>
          </button>

          {/* Save/Bookmark */}
          <button
            onClick={toggleSave}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-base border-none cursor-pointer
              ${
                isSaved
                  ? 'bg-sleep-restful/10 text-sleep-deep'
                  : 'bg-transparent text-peace-safe hover:bg-[#F3F4F6] hover:text-[#4A5568]'
              }
            `}
            aria-label={isSaved ? 'Bỏ lưu' : 'Lưu'}
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? 'fill-sleep-deep text-sleep-deep' : ''}`}
            />
          </button>
        </div>

        {/* Responders Count (right side) */}
        {post.responses > 0 && (
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="flex -space-x-2">
              {post.responders.slice(0, 3).map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt={`Responder ${i}`}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <span className="text-xs text-peace-safe font-medium">
              {post.responses} phản hồi
            </span>
          </div>
        )}

      </div>
    </article>
  );
}
