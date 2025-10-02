import prisma from "@/helper/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        articleImage: true,
        price: true,
        discount: true,
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, articleImage, price, discount } = body;
    if (
      !title ||
      !content ||
      !articleImage ||
      price == null ||
      discount == null
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const article = await prisma.article.create({
      data: {
        title,
        content,
        articleImage,
        price,
        discount,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }
    // No need to parse to integer since id is a string in the schema
    await prisma.article.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, articleImage, price, discount } = body;
    if (
      !id ||
      !title ||
      !content ||
      !articleImage ||
      price == null ||
      discount == null
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    // No need to parse to integer since id is a string in the schema
    const article = await prisma.article.update({
      where: { id: id },
      data: {
        title,
        content,
        articleImage,
        price,
        discount,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
