import React from "react";
import { Button, TextField, TextArea } from "@radix-ui/themes";
const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="title"></TextField.Root>
            <TextArea placeholder="Description"/>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
