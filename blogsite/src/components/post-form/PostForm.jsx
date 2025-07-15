import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Custom components you're using
import { Button, Input, Select, RTE } from '../index'

// Appwrite service for handling uploads, post creation, etc.
import appwriteService from '../../appwrite/config'

// For navigation after post creation/update
import { useNavigate } from 'react-router-dom'

// Getting user data from Redux store
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    // Initializing the form with default values based on whether it's an edit or new post
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    // Function to handle form submission
    const submit = async (data) => {
        // If post exists, we're updating it
        if (post) {
            // Check if a new image is selected
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // Delete old image if a new one is uploaded
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            // Update the post in the DB
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            // Navigate to the updated post page
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // Else, we are creating a new post
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileID = file.$id;
                data.featuredImage = fileID;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    // Function to generate a slug from the title
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()                     // Remove extra white spaces
                .toLowerCase()              // Make lowercase
                .replace(/[^a-z0-9]+/g, '-')// Replace anything not a-z, 0-9 with hyphen
                .replace(/(^-|-$)+/g, '')   // Remove starting or ending hyphens
        }
        return '';
    }, []);

    // Watch for title changes and auto-generate slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                // Automatically set slug whenever title changes
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Side: Title, Slug, Content */}
            <div className="w-2/3 px-2">
                {/* Title Input */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* Slug Input (auto generated but editable) */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* Rich Text Editor for blog content */}
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Side: Image, Status, Submit */}
            <div className="w-1/3 px-2">
                {/* File input for image */}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* Preview the existing image if post exists */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                {/* Status dropdown */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                {/* Submit/Update Button */}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
