const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

// goes to the story adding page
router.get("/add", ensureAuth, (req, res) => {
   res.render("stories/add");
});

// post from the form to /stories
router.post("/", ensureAuth, async (req, res) => {
   try {
      req.body.user = req.user.id;
      console.log(req.body);
      await Story.create(req.body);
      res.redirect("/dashboard");
   } catch (err) {
      console.log(err);
      res.render("error/500");
   }
});

// showing all stories
router.get("/", ensureAuth, async (req, res) => {
   try {
      const stories = await Story.find({ status: "public" })
         .populate("user")
         .sort({ createdAt: "desc" })
         .lean();

      res.render("stories/index", { stories });
   } catch (err) {
      console.error(err);
      res.render("error/500");
   }
});

// shows Single Story
router.get("/:id", ensureAuth, async (req, res) => {
   try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()
        
        if(!story) {
            return res.render('error/404')
        }

        res.render('stories/show', {story})
   } catch (err) {
        console.error(err)
        res.render('error/500')
   }
});

// goes to story edit page
router.get("/edit/:id", ensureAuth, async (req, res) => {
   try {
      const story = await Story.findOne({
         _id: req.params.id,
      }).lean();

      if (!story) {
         return res.render("error/404");
      } else if (story.user != req.user.id) {
         return res.redirect("/stories");
      } else {
         return res.render("stories/edit", { story });
      }
   } catch (err) {
      console.error(err);
      return res.render("error/500");
   }
});

// Updates the story at form submission
router.put("/:id", ensureAuth, async (req, res) => {
   try {
      let story = await Story.findById(req.params.id).lean();

      if (!story) {
         res.render("error/404");
      } else {
         story = await Story.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
               new: true,
               runValidators: true,
            }
         );

         res.redirect("/dashboard");
      }
   } catch (err) {
      console.error(err);
      return res.render("error/500");
   }
   let story = await Story.findById(req.params.id).lean();

   if (!story) {
      res.render("error/404");
   } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
         new: true,
         runValidators: true,
      });

      res.redirect("/dashboard");
   }
});

// delete stories
router.delete("/:id", ensureAuth, async (req, res) => {
   try {
      await Story.findByIdAndDelete(req.params.id);
      res.redirect("/dashboard");
   } catch (err) {
      console.error(err);
      return res.render("error/500");
   }
});

// Showing user Stories
router.get("/user/:userId", ensureAuth, async (req, res) => {
   try {
      const stories = await Story.find({
         user: req.params.userId,
         status: 'public'
      }).populate('user').lean()

      if(!stories) {
         return res.render('error/404')
      }

      res.render('stories/index', {stories})
   } catch (err) {
      console.error(err)
      res.render('error/500')
   }
});

module.exports = router;
