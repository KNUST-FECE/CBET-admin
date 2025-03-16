import DataContainer from "@/components/admin/blogs/data-container";
import NewBlogForm from "@/components/admin/blogs/new-blog-form";

export default function Page() {
    return (
        <section className="blogs-container">
            <section id="header-section">
                <h1>Blogs</h1>
                <NewBlogForm />
            </section>
            <DataContainer />
        </section>
    )
}