// components/staff/types.ts
export interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  from_working_hours: string;
  to_working_hours: string;
  salary_type: string;
  salary: number;
  work_start_data: string;
  image?: string | null;
}
