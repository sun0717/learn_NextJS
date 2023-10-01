import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './compontents/ProductCard'
export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <br/>
      <Link href="/users/new">newUsers</Link>
      <ProductCard />
    </main>
  )
}
