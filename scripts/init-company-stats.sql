-- Update the 4 main company statistics to match the homepage values
UPDATE company_stats SET value = 500, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'clients_satisfied';
UPDATE company_stats SET value = 98, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'projects_delivered';
UPDATE company_stats SET value = 50, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'team_members';
UPDATE company_stats SET value = 10, updated_at = CURRENT_TIMESTAMP WHERE stat_key = 'years_experience';
