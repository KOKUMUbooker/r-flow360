import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.id}`}>
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge>{post.category}</Badge>
                <Badge variant="outline">Featured</Badge>
              </div>
              <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <Badge>{post.category}</Badge>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
