import Link from "next/link";
import ProductCard from "./components/ProductCard";


export default function Home() {
    return (
        <main>
            <Link href="/users">Users</Link>
            <ProductCard />
        </main>
    );
};
