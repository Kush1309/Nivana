import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { video } from "../models/video.model.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query;

    const filter = {};

    if (query) {
        filter.title = {
            $regex: query,
            $options: "i"
        };
    }

    if (userId) {
        filter.owner = userId;
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const videos = await video.find(filter)
        .sort({
            [sortBy]: sortType === "asc" ? 1 : -1
        })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
        throw new ApiError(400, "Title, description and duration are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedVideo) {
        throw new ApiError(500, "Error uploading video");
    }
    if (!uploadedThumbnail) {
        throw new ApiError(500, "Error uploading thumbnail");
    }

    const createdVideo = await video.create({
        title,
        description,
        duration: Number(duration),
        videoFile: uploadedVideo.url,
        thumbnail: uploadedThumbnail.url,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            createdVideo,
            "Video published successfully"
        )
    );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const videoData = await video.findById(videoId);

    if (!videoData) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            videoData,
            "Video fetched successfully"
        )
    );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const videoData = await video.findById(videoId);

    if (!videoData) {
        throw new ApiError(404, "Video not found");
    }

    const { title, description, duration } = req.body;
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    const updatePayload = {};

    if (title) updatePayload.title = title;
    if (description) updatePayload.description = description;
    if (duration) updatePayload.duration = Number(duration);
    if (videoLocalPath) {
        const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
        if (!uploadedVideo) {
            throw new ApiError(500, "Error uploading video");
        }
        updatePayload.videoFile = uploadedVideo.url;
    }
    if (thumbnailLocalPath) {
        const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        if (!uploadedThumbnail) {
            throw new ApiError(500, "Error uploading thumbnail");
        }
        updatePayload.thumbnail = uploadedThumbnail.url;
    }

    if (Object.keys(updatePayload).length === 0) {
        throw new ApiError(400, "No update data provided");
    }

    const updatedVideo = await video.findByIdAndUpdate(
        videoId,
        {
            $set: updatePayload
        },
        {
            new: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video updated successfully"
        )
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const videoData = await video.findById(videoId);

    if (!videoData) {
        throw new ApiError(404, "Video not found");
    }

    await video.findByIdAndDelete(videoId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video deleted successfully"
        )
    );
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const videoData = await video.findById(videoId);

    if (!videoData) {
        throw new ApiError(404, "Video not found");
    }

    videoData.isPublished = !videoData.isPublished;
    await videoData.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            videoData,
            `Video publish status updated to ${videoData.isPublished}`
        )
    );
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
};