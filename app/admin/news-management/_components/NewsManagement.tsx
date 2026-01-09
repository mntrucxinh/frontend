'use client'

import NewsManagementTable from "./NewsManagementTable";
import NewsManagementTabs from "./NewsManagementTabs";

export default function NewsManagement() {
    return <div>
        <NewsManagementTabs />
        <NewsManagementTable />
    </div>
}