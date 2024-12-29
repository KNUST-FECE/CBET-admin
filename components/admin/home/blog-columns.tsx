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
                    <h3 className="blogs-blog-h3">{original.name}</h3>
                    <p className="blogs-blog-p">
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
            headerClass: "blogs-blog-th",
            cellClass: "blogs-blog-td",
        }
    },
    {
        id: "tags",
        header: "Tag",
        cell: ({row: {original}}) => (
            <>
                {original.tags.map(tag => (
                    <div className="blogs-tag-text">
                        <span>{tag}</span>
                    </div>
                ))}
            </>
        ),
        meta: {
            headerClass: "blogs-tags-th",
            cellClass: "blogs-tags-td",
        }
    },
    {
        id: "likes",
        header: "Likes",
        cell: ({row: {original}}) => (
            <p className="blogs-likes-p">
                <Heart strokeWidth={1} />
                <span>{original.likes}</span>
            </p>
        ),
        meta: {
            headerClass: "blogs-likes-th",
            cellClass: "blogs-likes-td",
        },
    },
    {
        id: "icon",
        cell: () => (<ChevronRight strokeWidth={1} />),
        meta: {
            headerClass: "blogs-icon-th",
            cellClass: "blogs-icon-td",
        }
    },
]