const express = require("express");
const router = express.Router();

const blogModel = require("../models/blog");

router.post("/addBlogs", async (req, res) => {
    try {
        const blog = new blogModel(req.body);
        await blog.save();
        res.send("Blog added successfully");
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

router.get("/getBlogById/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await blogModel.findById(id);
        res.send(blog);
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

router.get("/getBlogs", async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.send(blogs);
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
});

router.post('/updateBlog', async (req, res) => {
    const empData = req.body;
    console.log(empData);
    try {
        await blogModel.findByIdAndUpdate(empData._id, empData);
        res.send("Blog updated successfully");
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
}
);

router.post("/deleteBlogById", async (req, res) => {
    const { id } = req.body;
    try {
        await blogModel.findByIdAndDelete(id);
        res.send("Blog deleted successfully");
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" });
    }
}
);

router.post("/updateLikes", async (req, res) => {
    const { articleId, userId } = req.body;
    try {
        let article = await blogModel.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        const likedIndex = article.likes.indexOf(userId);
        if (likedIndex === -1) {
            article.likes.push(userId);
            await article.save();
        } else {
            article.likes.splice(likedIndex, 1);
            await article.save();
        }    

        res.send("Likes updated successfully");
    } catch (error) {
        console.error("Error updating likes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/addComment", async (req, res) => {
    
    const { articleId, userID, comment } = req.body;
    try {
        let article = await blogModel.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        article.comments.push({ userID, comment });
        await article.save();
        res.send("Comment added successfully");
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
);



module.exports = router;
