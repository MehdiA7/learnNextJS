"use client";
import React, { useState } from "react";
// Radix ui theme
import { Button, TextField, Callout } from "@radix-ui/themes";
// Markdown editor
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
// React use form for simple form request
import { useForm, Controller } from "react-hook-form";
// Axios for make some better request
import axios from "axios";
// Router to change page after the post request
import { useRouter } from "next/navigation";

type issueForm = {
    title: string;
    description: string;
};

const NewIssuePage = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<issueForm>();

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
                            "We have problem with your title or description..."
                        );
                    }
                })}
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
        </div>
    );
};

export default NewIssuePage;
