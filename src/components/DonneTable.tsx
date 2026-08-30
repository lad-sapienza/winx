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
    header: "Nome",
    render: (value, row) => (
      <a href={withBase(`/record/w_persona/${(row as DonnaRow).id}/`)}>{value ?? "—"}</a>
    ),
  },
  { key: "famiglia_gens", header: "Famiglia di appartenenza" },
  { key: "provenienza", header: "Provenienza" },
  { key: "vissuta", header: "Vissuta tra", sortable: false },
];

export default function DonneTable({ data }: { data: DonnaRow[] }) {
  return (
    <DataTb
      source={{ type: "json", data }}
      columns={columns}
      searchable
      pagination={false}
      emptyMessage="Nessuna donna registrata."
      loadingMessage="Caricamento…"
    />
  );
}
