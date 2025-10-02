import prisma from "@/helper/auth";
import { NextResponse } from "next/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        articleImage: true,
        popularity: true,
        price: true,
        discount: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
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
    const { title, content, imageBase64, price, discount, popularity = false } = body;
    
    if (!title || !content || price == null || discount == null) {
      return NextResponse.json(
        { error: "Title, content, price, and discount are required" },
        { status: 400 }
      );
    }

    let articleImageUrl = null;

    // Handle image upload if provided
    if (imageBase64) {
      try {
        const uploadResult = await uploadImage(imageBase64, {
          folder: 'agri-hope/articles',
          transformation: [
            { width: 800, height: 600, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
          ]
        });
        articleImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        articleImage: articleImageUrl,
        price: parseFloat(price),
        discount: parseFloat(discount),
        popularity,
      },
    });

    return NextResponse.json(article, { status: 201 });
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

    // Get the article to delete the image from Cloudinary
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { articleImage: true }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Delete from database
    await prisma.article.delete({
      where: { id }
    });

    // Delete image from Cloudinary if exists
    if (existingArticle.articleImage) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = existingArticle.articleImage.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const publicId = `agri-hope/articles/${fileName.split('.')[0]}`;
        await deleteImage(publicId);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
        // Continue even if image deletion fails
      }
    }

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
    const { id, title, content, imageBase64, price, discount, popularity } = body;
    
    if (!id || !title || !content || price == null || discount == null) {
      return NextResponse.json(
        { error: "ID, title, content, price, and discount are required" },
        { status: 400 }
      );
    }

    // Get existing article
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { articleImage: true, popularity: true }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    let articleImageUrl = existingArticle.articleImage;

    // Handle new image upload if provided
    if (imageBase64) {
      try {
        // Delete old image from Cloudinary if exists
        if (existingArticle.articleImage) {
          const urlParts = existingArticle.articleImage.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const publicId = `agri-hope/articles/${fileName.split('.')[0]}`;
          await deleteImage(publicId);
        }

        // Upload new image
        const uploadResult = await uploadImage(imageBase64, {
          folder: 'agri-hope/articles',
          transformation: [
            { width: 800, height: 600, crop: 'fill', quality: 'auto', fetch_format: 'auto' }
          ]
        });
        articleImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        articleImage: articleImageUrl,
        price: parseFloat(price),
        discount: parseFloat(discount),
        popularity: popularity ?? existingArticle.popularity,
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
