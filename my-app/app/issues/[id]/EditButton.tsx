import { Button } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const EditButton = ( { issueId }: { issueId: string }) => {
    return (
        <>
            <Button>
                <Pencil2Icon />
                <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
            </Button>
        </>
    );
};

export default EditButton;
