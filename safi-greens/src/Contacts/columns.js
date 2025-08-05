
import { formatType } from "../utils/formatType";
import { toTitleCase } from "../utils/toTitleCase";

export const columns = [
  {
    field: "serial",
    headerName: "No.",
    flex: 0.1,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
  },
  { 
    field: "name", 
    headerName: "Name", 
    flex: 1,
    renderCell: (params) => toTitleCase(params.value),
  },
  { 
    field: "phone_number", 
    headerName: "Phone Number", 
    flex: 1 
  },
  { 
    field: "location", 
    headerName: "Address", 
    flex: 1,
    renderCell: (params) => toTitleCase(params.value),
  },
  { 
    field: "shop_name", 
    headerName: "Shop Name", 
    flex: 1 
  },
  {
    field: "till_number",
    headerName: "Till Number",
    flex: 0.7,
    renderCell: (params) => {
      if (
        params &&
        params.row &&
        ("till_number" in params.row) &&
        params.row.till_number !== null &&
        params.row.till_number !== undefined &&
        params.row.till_number !== ""
      ) {
        return params.row.till_number;
      }
      return "—";
    },
  },
  {
    field: "user_type",
    headerName: "Type",
    flex: 0.7,
    renderCell: (params) => formatType(params.value),
    sortable: false,
    filterable: false,
  },
];