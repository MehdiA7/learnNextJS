"use client";
import React, { useState } from "react";
// Radix ui theme
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Schema for checker
import createIssueSchema from "@/app/validationSchemas";

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { register, control, handleSubmit, formState: {errors} } = useForm<issueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className="max-w-xl space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues"); // redirect to issues page
                    } catch (error) {
                        setError(
                            "We have problem..."
                        );
                    }
                })}
            >
                <TextField.Root
                    placeholder="title"
                    {...register("title")}
                ></TextField.Root>
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
