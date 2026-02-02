-- Add new homepage stats to company_stats table if they don't exist
INSERT INTO company_stats (stat_key, value)
VALUES 
  ('clients_served', 500),
  ('success_rate', 98),
  ('team_experts', 50),
  ('years_excellence', 10)
ON CONFLICT (stat_key) DO NOTHING;
