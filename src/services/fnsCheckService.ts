import { api } from "@/shared/api/api";

interface FnsCheck {
  id: number;
  datetime: string;
  store_itn: string;
  total_sum: number;
  name: string;
}

export interface FnsChecksApi {
  totalRows: number;
  rows: number;
  checks: FnsCheck[]
}

const fetchFnsChecksList = async (page: number): Promise<FnsChecksApi> => {
  const response = await api.get<FnsChecksApi>(`/store/checks/${page}`);

  return response.data;
}

interface FnsCheckItem {
  id: number,
  name: string,
  price: number,
  quantity: number,
  sum: number,
  real_price: number | null,
  real_quantity: number | null,
  store_product: {
    name: string
  } | null;
}

export interface FnsCheckApi {
  id: number;
  datetime: string;
  total_sum: number;
  fiscal_drive_number: string;
  fiscal_document_number: number,
  store: {
    id: number,
    name: string,
    description: string | null
  };
  store_itn: string;
  retail_place_address: string | null;
  retail_place: string | null;
  operator: string;
  fnsCheckItems: FnsCheckItem[];
}

const fetchFnsCheck = async (page: number): Promise<FnsCheckApi> => {
  const response = await api.get<FnsCheckApi>(`/store/check/${page}`);

  return response.data;
}

export { fetchFnsChecksList, fetchFnsCheck };