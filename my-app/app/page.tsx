import Link from "next/link";
import ProductCard from "./components/ProductCard";


export default function Home() {
    return (
        <main>
            <h1>HELLO</h1>
            <Link href="/users">Optimized Users</Link>
            <ProductCard />
        </main>
    );
}
