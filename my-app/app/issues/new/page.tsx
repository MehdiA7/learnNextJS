"use client";
import React, { useState } from "react";
// Radix ui theme
import { Button, TextField, Callout, Text, Heading } from "@radix-ui/themes";

// Markdown editor
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// React use form for simple form request
import { useForm, Controller } from "react-hook-form";

// Axios for make some better request
import axios from "axios";

// Router to change page after the post request
import { useRouter } from "next/navigation";

// Form error checker
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";

// Schema for checker
import createIssueSchema from "@/app/validationSchemas";

// Components
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const [error, setError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<issueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmit(true);
            await axios.post("/api/issues", data);
            router.push("/issues"); // redirect to issues page
        } catch (error) {
            setIsSubmit(false);
            setError("We have problem...");
        }
    });

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <Heading className="mb-4">New Issue</Heading>
            <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
                <TextField.Root
                    placeholder="title"
                    {...register("title")}
                ></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmit}>
                    Submit New Issue{isSubmit && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
