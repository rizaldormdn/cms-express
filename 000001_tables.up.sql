CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `hashed_password` varchar(64) NOT NULL,
  `is_administrator` boolean,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE (`email`),
  INDEX `idx_is_administrator` (`is_administrator`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` binary(16) NOT NULL,
  `original_url` varchar(512) NOT NULL,
  `thumbnail_url` varchar(512) NOT NULL,
  `alt` varchar(256) NOT NULL,
  `height` int unsigned NOT NULL,
  `width` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(512) NOT NULL,
  `title` varchar(256) NOT NULL,
  `content` text NOT NULL,
  `excerpt` varchar(160) NOT NULL,
  `image_id` int NOT NULL,
  `author_id` int NOT NULL,
  `tags` varchar(128),
  `is_published` boolean,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE (`slug`),
  FOREIGN KEY (`image_id`) REFERENCES `images`(`id`),
  FOREIGN KEY (`author_id`) REFERENCES `users`(`id`),
  INDEX `idx_is_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;