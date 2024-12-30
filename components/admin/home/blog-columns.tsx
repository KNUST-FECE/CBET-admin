import { IBlog } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Heart } from "lucide-react";

// columns -- name - dateCreated and author and category, tags, likes, chevronRight
export const columns: ColumnDef<IBlog>[] = [
    {
        id: "blog",
        header: "Blog",
        cell: ({row: {original}}) => {
            return (
                <>
                    <h3>{original.name}</h3>
                    <p>
                        <span className="author-text">{original.authorID}</span>
                        <span className="bull-dot">&bull;</span>
                        <span className="category-text">{original.category}</span>
                        <span className="bull-dot">&bull;</span>
                        <span className="created-date-text">{original.createdAt}</span>
                    </p>
                </>
            )
        },
        meta: {
            headClass: "blogs-blog-col blogs-blog-th",
            cellClass: "blogs-blog-col blogs-blog-td",
        }
    },
    {
        id: "tags",
        header: "Tag",
        cell: ({row: {original}}) => (
            <div>
                {original.tags.map(tag => (
                    <p key={tag}> {tag}</p>
                ))}
            </div>
        ),
        meta: {
            headClass: "blogs-tags-col blogs-tags-th",
            cellClass: "blogs-tags-col blogs-tags-td",
        }
    },
    {
        id: "likes",
        header: "Likes",
        cell: ({row: {original}}) => (
            <p>
                <Heart strokeWidth={1} />
                <span>{original.likes}</span>
            </p>
        ),
        meta: {
            headClass: "blogs-likes-col blogs-likes-th",
            cellClass: "blogs-likes-col blogs-likes-td",
        },
    },
    {
        id: "icon",
        cell: () => (<ChevronRight strokeWidth={1} />),
        meta: {
            headClass: "blogs-icon-col blogs-icon-th",
            cellClass: "blogs-icon-col blogs-icon-td",
        }
    },
]