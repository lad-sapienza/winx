import { DataTb } from "@lad-sapienza/scms-core/components/DataTb";
import type { ColumnConfig } from "@lad-sapienza/scms-core/components/DataTb/types";
import { withBase } from "@lib/paths";

export interface DonnaRow {
  id: number;
  nome: string;
  famiglia_gens: string | null;
  provenienza: string | null;
  /** Pre-formatted "birth — death" string, computed at build time. */
  vissuta: string;
}

const columns: ColumnConfig[] = [
  {
    key: "nome",
    header: "Name",
    render: (value, row) => (
      <a href={withBase(`/record/person/${(row as DonnaRow).id}/`)}>{value ?? "—"}</a>
    ),
  },
  { key: "famiglia_gens", header: "Family" },
  { key: "provenienza", header: "Origin" },
  { key: "vissuta", header: "Lifespan", sortable: false },
];

export default function DonneTable({ data }: { data: DonnaRow[] }) {
  return (
    <DataTb
      source={{ type: "json", data }}
      columns={columns}
      searchable
      pagination={false}
      emptyMessage="No women recorded."
      loadingMessage="Loading…"
    />
  );
}
