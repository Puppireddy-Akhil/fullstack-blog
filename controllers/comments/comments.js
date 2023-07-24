const createCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment created",
      });
    } catch (error) {
      res.json(error);
    }
  }
  
  const commentDetailsCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post comments",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const deleteCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment deleted",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const updateCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment updated",
      });
    } catch (error) {
      res.json(error);
    }
  }

module.exports={
    createCommentCtrl,
    commentDetailsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
}