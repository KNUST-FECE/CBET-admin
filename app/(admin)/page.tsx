import DepartmentStat from "@/components/admin/home/department-stat";
import { departments } from "@/lib/constants";
import { _blogs, _products } from "@/lib/routes";

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
      <section className="other-section">
      </section>
    </div>
  );
}
