import BlogTable from "@/components/admin/home/blog-table";
import DepartmentStat from "@/components/admin/home/department-stat";
import ProductTable from "@/components/admin/home/product-table";
import { departments } from "@/lib/constants";
import { _blogs, _products } from "@/lib/routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <section id="header-section">
        <h1>Dashboard</h1>
      </section>
      <section id="resource-section">
        <div>
          {departments.map(dep => (
            <DepartmentStat key={dep} dep={dep} />
          ))}
        </div>
      </section>
      <section className="table-section">
        <div>
          <div className="table-section-header">
            <h2>Recent Blogs</h2>
            <Link href={_blogs}>
              <p>See More</p>
              <ChevronRight strokeWidth={1} />
            </Link>
          </div>
          <div className="table-section-content">
            <BlogTable />
          </div>
        </div>
      </section>
      <section className="table-section">
        <div>
          <div className="table-section-header">
            <h2>Recent Products</h2>
            <Link href={_products}>
              <p>See More</p>
              <ChevronRight strokeWidth={1} />
            </Link>
          </div>
          <div className="table-section-content">
            <ProductTable />
          </div>
        </div>
      </section>
    </div>
  );
}
