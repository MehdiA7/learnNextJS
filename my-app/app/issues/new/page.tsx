"use client";
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";

type issueForm = {
    title: string;
    description: string;
};

const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<issueForm>();

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <TextField.Root
                placeholder="title"
                {...register("title")}
            ></TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
