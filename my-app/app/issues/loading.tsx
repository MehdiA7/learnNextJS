import React from "react";
import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionButton from "./ActionButton";

const LoadingIssuePage = () => {
    const issues = [1, 2, 3, 4, 5];
    return (
        <div className="space-y-4">
            <h1 className="text-2xl">Issues Page</h1>
            <ActionButton>New Issue</ActionButton>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton />
                                <div className="block md:hidden">
                                    <Skeleton />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default LoadingIssuePage;
