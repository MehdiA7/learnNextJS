"use client";
import React, { useState } from "react";
// Radix ui theme
import { Button, TextField, Callout, Heading } from "@radix-ui/themes";

// Markdown editor
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// React use form for simple form request
import { useForm, Controller } from "react-hook-form";

// Router to change page after the post request
import { useRouter } from "next/navigation";
// its for make component csr in ssr component
// import dynamic from "next/dynamic";

// Form error checker
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema for checker
import createIssueSchema from "@/app/validationSchemas";

// Components
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issue } from "@prisma/client";

// see comment at 18
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'),
// { ssr: false }
// );

type issueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: issue }) => {
    const [error, setError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<issueFormData>({
        resolver: zodResolver(createIssueSchema),
    });
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (!issue) {
            try {
                setIsSubmit(true);
                await fetch("/api/issues", {
                    method: "POST",
                    body: JSON.stringify(data),
                });

                router.push("/issues"); // redirect to issues page
            } catch (error) {
                setIsSubmit(false);
                setError("We have problem...");
                console.log(error);
            }
        } else {
            try {
                setIsSubmit(true);
                await fetch("/api/issues/edit", {
                    method: "PATCH",
                    body: JSON.stringify([issue.id, data]),
                });
                router.push("/issues"); // redirect to issues page
            } catch (error) {
                setIsSubmit(false);
                setError("We have problem...");
                console.log(error);
            }
        }
    });

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <Heading className="mb-4">
                {issue ? "Edit issue" : "New Issue"}
            </Heading>
            <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
                <TextField.Root
                    defaultValue={issue?.title}
                    placeholder="title"
                    {...register("title")}
                ></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    defaultValue={issue?.description}
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE
                            placeholder="Description"
                            {...field}
                        />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmit}>
                    {issue ? "Edit the issue" : "Submit New Issue"}{isSubmit && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
