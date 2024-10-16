import prisma from "../lib/prisma.js";


export const searchPosts = async (req, res) => {
  const { city, minPrice, maxPrice } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city ? { contains: city, mode: 'insensitive' } : undefined,
        price: {
          gte: minPrice ? parseFloat(minPrice) : undefined,
          lte: maxPrice ? parseFloat(maxPrice) : undefined,
        },
      },
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for the search criteria' });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ message: 'Error searching posts', error });
  }
};

export const filterPosts = async (req, res) => {
  const { type, property, minPrice, maxPrice } = req.query;

  try {
    const filters = {};
    
    if (type) {
      filters.type = type;
    }
    if (property) {
      filters.property = property;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filters.price.lte = parseFloat(maxPrice);
      }
    }

    const posts = await prisma.post.findMany({
      where: filters,
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found matching the filters" });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error filtering posts:", error);
    res.status(500).json({ message: "Error filtering posts", error });
  }
};
