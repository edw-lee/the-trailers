CREATE OR REPLACE VIEW random_featured_trailers AS
    SELECT *
    FROM featured_trailers
    ORDER BY RANDOM();