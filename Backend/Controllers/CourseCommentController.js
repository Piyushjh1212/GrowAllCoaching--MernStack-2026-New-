import CourseComment from "../Modals/CourseCommentModals.js";


export const CourseaddComment = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("USERID:", req.userId);

        const { comment, lectureId } = req.body;
        const userId = req.userId;

        const newComment = new CourseComment({
            comment,
            lectureId,
            userId
        });

        console.log("COMMENT OBJECT:", newComment);

        await newComment.save();

        res.status(201).json({
            success: true,
            comment: newComment
        });

    } catch (error) {
        console.log(error);
    }
};

export const GetCourseComment = async (req, res) => {

    try {

        const { lectureId } = req.params;

        if (!lectureId) {
            return res.status(400).json({
                success: false,
                message: "Lecture ID is required"
            });
        }

        const comments = await CourseComment
            .find({ lectureId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            comments: comments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};