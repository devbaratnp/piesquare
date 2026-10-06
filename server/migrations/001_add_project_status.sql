ALTER TABLE projects
  ADD COLUMN project_status ENUM('ONGOING', 'COMPLETED') NOT NULL DEFAULT 'ONGOING' AFTER completion_info;

UPDATE projects
SET project_status = CASE
  WHEN LOWER(COALESCE(completion_info, '')) LIKE '%present%' THEN 'ONGOING'
  ELSE 'COMPLETED'
END;
