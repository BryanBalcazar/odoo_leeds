export interface Lead {
  id: number;
  name: string;
  email_from: string;
  stage_id: [number, string];
  expected_revenue: number;
}
