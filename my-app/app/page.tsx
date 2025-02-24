import Link from "next/link";
import ProductCard from "./components/ProductCard";
import NavBar from "./components/NavBar";


export default function Home() {
    return (
        <main>
            <NavBar />
            <Link href="/users">Users</Link>
            <ProductCard />
        </main>
    );
};
