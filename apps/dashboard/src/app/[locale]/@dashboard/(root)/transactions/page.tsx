import { ExportButton } from "@/components/export-button";
import { Filter } from "@/components/filter";
import { Table } from "@/components/tables/transactions";
import { sections } from "@/components/tables/transactions/filters";
import { Loading } from "@/components/tables/transactions/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transactions | Midday",
};

export default async function Transactions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === "string" ? +searchParams.page : 0;
  const filter =
    (searchParams?.filter && JSON.parse(searchParams.filter)) ?? {};

  return (
    <>
      <div className="flex justify-between py-6">
        <Filter sections={sections} />
        <ExportButton />
      </div>

      <Suspense fallback={<Loading />}>
        <Table filter={filter} page={page} />
      </Suspense>
    </>
  );
}
