CREATE KEYSPACE IF NOT EXISTS airbnb WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE airbnb;
CREATE TABLE IF NOT EXISTS rentals (
    id bigint,
    price smallint,
    max_guests smallint,
    numReviews smallint,
    avgStars decimal,
    cleaning_fee smallint,
    service_fee smallint,
    occupancy_fee smallint,
    availability varchar,
    PRIMARY KEY (id)
);