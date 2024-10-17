import React, { Suspense } from "react";
import DataEskul from "@/app/Eskul/Siswa/DataEskul";
import SkeletonCard from "@/app/Eskul/Siswa/SkeletonCard";
import SkeletonTable from "@/app/Eskul/Admin/SkeletonTable";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/app/Eskul/Admin/Table/columns";
import { auth } from "@/auth";
import { GetEskul } from "@/lib/data";

type Props = {
  children: React.ReactNode;
};

export default async function page({ children }: Props) {
  const eskul = await GetEskul();
  const session = await auth();
  return (
    <div className="w-full px-[2rem]">
      <div className="bg-gray-50 p-[2rem] rounded-md shadow-md">
        <div className="text-center flex flex-col items-center mb-[2rem]">
          <h1 className="w-full text-2xl font-bold mb-[1rem]">
            Daftar Ekstrakurikuler
          </h1>
          <div className="bg-blue-500 w-[20rem] h-[.2rem]" />
        </div>
        {!session && (
          <Suspense fallback={<SkeletonCard />}>
            <DataEskul data={eskul} />
          </Suspense>
        )}
        {session && (
          <Suspense fallback={<SkeletonTable />}>
            <DataTable columns={columns} data={eskul} />
          </Suspense>
        )}
      </div>
      {children}
    </div>
  );
}
