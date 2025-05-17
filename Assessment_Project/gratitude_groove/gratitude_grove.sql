-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 17, 2025 at 01:35 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gratitude_grove`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_8a5da52ed126447d359e70c05721a8aa', 'i:9;', 1747297247),
('laravel_cache_8a5da52ed126447d359e70c05721a8aa:timer', 'i:1747297247;', 1747297247);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `audio_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `title`, `description`, `audio_url`, `created_at`, `updated_at`) VALUES
(2, 'Body Scan Meditation', 'Bring awareness to different parts of your body, noticing any sensations without judgment. This helps increase body awareness and relaxation.\nHello, how was your day.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ySxylPqGn3I?si=-vw0-cmplJJxHKaU\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', '2025-04-02 02:15:53', '2025-05-05 10:21:37'),
(3, 'Mindful Observation', 'Choose an object around you and observe it with all your senses, as if you are seeing it for the first time. This cultivates present moment awareness.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/1kOjnIDx00s?si=JbrDTA7SZII3y-Rz\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', '2025-04-02 02:15:53', '2025-05-14 22:25:18'),
(4, 'Loving-Kindness Meditation', 'Silently repeat phrases of goodwill and kindness towards yourself, loved ones, and even those you find challenging.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/X9g3qVUrMqM?si=ebp_rRBa2yztGNJQ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', '2025-04-02 02:15:53', '2025-05-14 22:26:17'),
(5, 'Gratitude Meditation', 'Take a few moments to reflect on things you are grateful for. Feel the sense of appreciation in your heart.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OCorElLKFQE?si=ofaAK2kOl5VrxC7L\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', '2025-04-02 02:15:53', '2025-05-14 22:26:57'),
(7, 'Morning Gratitude', 'ake a few moments each morning to think about three things you are grateful for. Write them down or simply reflect on them in your mind.', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8-WG6OBfNj4?si=mJ9UEKo8HWyclkE1\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', '2025-04-18 02:31:59', '2025-05-14 22:23:38');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gratitude_prompts`
--

CREATE TABLE `gratitude_prompts` (
  `id` bigint UNSIGNED NOT NULL,
  `prompt_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gratitude_prompts`
--

INSERT INTO `gratitude_prompts` (`id`, `prompt_text`, `created_at`, `updated_at`) VALUES
(1, 'What are three things you are grateful for today?', '2025-04-02 02:15:53', '2025-04-02 02:15:53'),
(2, 'Who is someone you appreciate and why?', '2025-04-02 02:15:53', '2025-04-02 02:15:53'),
(3, 'Describe a positive experience you had recently.', '2025-04-02 02:15:53', '2025-04-02 02:15:53'),
(4, 'What is something you are looking forward to?', '2025-04-02 02:15:53', '2025-04-02 02:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journal_entries`
--

CREATE TABLE `journal_entries` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `entry_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mood` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `journal_entries`
--

INSERT INTO `journal_entries` (`id`, `user_id`, `entry_text`, `mood`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 4, 'I think I might have upset someone yesterday. I was literally laughing like a clown for no reason and I might had made her intimidated with that laugh. Why am I like this? I updated this journal.', 'Sad', 'http://127.0.0.1:8000/storage/journal_images/tMlvq54pJJ4TP3VcSKBjmyAo9Gixs7fEW60DYHfZ.png', '2025-05-04 21:53:17', '2025-05-05 01:56:51');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(14, '2025_03_28_011256_create_journal_entries_table', 2),
(15, '2025_03_28_011306_create_mood_logs_table', 2),
(16, '2025_03_28_011318_create_exercises_table', 2),
(17, '2025_03_28_012850_create_personal_access_tokens_table', 3),
(18, '2025_03_28_021859_add_role_to_users_table', 3),
(19, '2025_03_28_113100_create_gratitude_prompts_table', 4),
(20, '2025_04_18_041552_alter_exercises_table_change_audio_url_type', 5),
(21, '2025_04_22_105248_add_profile_fields_to_users_table', 6),
(22, '2025_05_05_073501_add_profile_fields_to_users_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `mood_logs`
--

CREATE TABLE `mood_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `mood` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mood_logs`
--

INSERT INTO `mood_logs` (`id`, `user_id`, `mood`, `created_at`, `updated_at`) VALUES
(5, 5, 'Calm', '2025-05-05 09:48:19', '2025-05-05 09:48:19'),
(6, 4, 'Tired', '2025-05-05 10:20:22', '2025-05-05 10:20:22'),
(7, 4, 'Anxious', '2025-05-06 01:29:31', '2025-05-06 01:29:31'),
(8, 5, 'Excited', '2025-05-06 02:09:46', '2025-05-06 02:09:46'),
(9, 4, 'Stressed', '2025-05-12 09:01:33', '2025-05-12 09:01:33'),
(10, 4, 'Reflective', '2025-05-12 22:43:28', '2025-05-12 22:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(13, 'App\\Models\\User', 3, 'admin_auth_token', '1f1014243d89880e3d8ff19d554726c70749a07c9fcc98606255177f3665e9eb', '[\"*\"]', NULL, NULL, '2025-04-04 02:56:56', '2025-04-04 02:56:56'),
(16, 'App\\Models\\User', 3, 'admin_auth_token', '3cc7af24662a574fc1f0b6c1d5e4b30af3d39fe61b922272d249ceb441dd5fea', '[\"*\"]', '2025-04-04 06:50:56', NULL, '2025-04-04 06:00:49', '2025-04-04 06:50:56'),
(30, 'App\\Models\\User', 3, 'admin_auth_token', 'f68b7abb66c5874b63d44d99eea37b826f7ac55416c9b11913b6f9d6d291dee6', '[\"*\"]', '2025-04-20 01:08:03', NULL, '2025-04-19 01:48:49', '2025-04-20 01:08:03'),
(126, 'App\\Models\\User', 1, 'admin_auth_token', '89bac2d4c6c516de71110926a8639afe411dd7551475238678d61e90a9287d0e', '[\"*\"]', '2025-05-04 21:51:28', NULL, '2025-05-04 21:51:24', '2025-05-04 21:51:28'),
(127, 'App\\Models\\User', 1, 'admin_auth_token', 'af7de65be9a118dab65d9779c4487311134cf29cd15ab250027c5d0342608bd1', '[\"*\"]', '2025-05-04 22:24:52', NULL, '2025-05-04 22:24:48', '2025-05-04 22:24:52'),
(128, 'App\\Models\\User', 1, 'admin_auth_token', '70bbee40f0398e724e8356de56b325d6e68dd0608de7b65efebc4ba54253f8f9', '[\"*\"]', '2025-05-05 00:35:45', NULL, '2025-05-04 22:26:19', '2025-05-05 00:35:45'),
(130, 'App\\Models\\User', 1, 'admin_auth_token', 'afa06cc859066c42a4b99026ec7e8289f5a7ae7191880daeb1219ab5eb6980a7', '[\"*\"]', '2025-05-05 04:04:59', NULL, '2025-05-05 00:36:13', '2025-05-05 04:04:59'),
(136, 'App\\Models\\User', 1, 'admin_auth_token', '8bbd04493419e06a40223259312ad1a101c27c7a23a016508de3b799ec2bb505', '[\"*\"]', '2025-05-05 09:49:29', NULL, '2025-05-05 09:49:13', '2025-05-05 09:49:29'),
(137, 'App\\Models\\User', 3, 'admin_auth_token', '15dd0349fcaf17787a0d7fa13b09498e033a41ba7b0f76775766888894c05fc6', '[\"*\"]', '2025-05-06 01:57:50', NULL, '2025-05-05 09:49:52', '2025-05-06 01:57:50'),
(142, 'App\\Models\\User', 1, 'admin_auth_token', 'f59699c12bf0a3fee08e0ef5c035ce037c89eaa0500eb3872a7935ca6a3327fc', '[\"*\"]', '2025-05-06 02:08:09', NULL, '2025-05-06 02:07:20', '2025-05-06 02:08:09'),
(143, 'App\\Models\\User', 6, 'admin_auth_token', '4abce0a40b9968d91ba313e9405d7e24e486fa588cf1d3ff17860159a94213f4', '[\"*\"]', NULL, NULL, '2025-05-06 02:08:10', '2025-05-06 02:08:10'),
(144, 'App\\Models\\User', 6, 'admin_auth_token', '95b294363d06e3c017fbda8930fefcfa898e89e535de6f6291064288d73890a3', '[\"*\"]', '2025-05-06 02:08:33', NULL, '2025-05-06 02:08:30', '2025-05-06 02:08:33'),
(147, 'App\\Models\\User', 1, 'admin_auth_token', 'ee3ff8132ceeefbfd3f4fe8aef18dabd55c538601c762f7a3232c829ec40e9a6', '[\"*\"]', '2025-05-06 07:39:04', NULL, '2025-05-06 07:38:46', '2025-05-06 07:39:04'),
(148, 'App\\Models\\User', 6, 'admin_auth_token', 'da9f3151c50eeef5bb78c732b871a93b1c58c01676233d499946dee05bb1f8e7', '[\"*\"]', '2025-05-06 07:39:30', NULL, '2025-05-06 07:39:28', '2025-05-06 07:39:30'),
(149, 'App\\Models\\User', 6, 'admin_auth_token', 'a1f67cd611302a94cc8a21385f9cec9fd2a6bad3e23e42560101b9425fa03189', '[\"*\"]', '2025-05-12 09:01:04', NULL, '2025-05-12 09:00:55', '2025-05-12 09:01:04'),
(154, 'App\\Models\\User', 6, 'admin_auth_token', '81aea7da95bc35916907e85861f4d10fbe1af8c79c943a66b2273de06865263b', '[\"*\"]', '2025-05-14 22:29:45', NULL, '2025-05-14 22:20:37', '2025-05-14 22:29:45'),
(156, 'App\\Models\\User', 6, 'admin_auth_token', 'ae197794432fa6db93c3b18468ffcd7d3b70844506eba7e4e020930e242ef6f6', '[\"*\"]', '2025-05-15 00:25:35', NULL, '2025-05-15 00:09:44', '2025-05-15 00:25:35'),
(166, 'App\\Models\\User', 6, 'admin_auth_token', '8bc8dad84a2e3bd34765c67bcf9c4231398e5751908d14025ac55daf0c649116', '[\"*\"]', '2025-05-15 01:00:41', NULL, '2025-05-15 00:59:15', '2025-05-15 01:00:41'),
(169, 'App\\Models\\User', 6, 'admin_auth_token', 'aaa3ee39cad40674c6be34b7974c89f0a1762b800b8b7a3e78efa4367fd89040', '[\"*\"]', '2025-05-15 01:46:56', NULL, '2025-05-15 01:46:09', '2025-05-15 01:46:56');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0xP6ird4mmcPmSgGTFuApn2xvEzpBCIfsbz8m2Uo', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNjlMaGtqd2U1YnJNaFB5NmEycE82SmFObGNQSExnWU9TUWdKYmd6TCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743677000),
('8ILewPGYR4fQ6m3nSc62v0daCxrE7TSPv11uZcW1', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZXZpNkpKanNWRkxCZW9HaDc0bHFsdkFleWtOOXJzQ0ZVN1IwWGkyeSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743681318),
('AAscJAKbXLjvnuC3VMPIxQmVPSyRa44LE3IWsGUB', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibXdZY0k0RFFpR2FOU1k3ZUpXbWVDUVBBdWxKRVpvTFBaa2JaVUNWOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743161110),
('AsuxHblIbaa1tDEmTTQsEkjKXxQwQst0fzJKc5bg', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiOFF2SDNPNmRoeW9KM1k4NFRRYlFkOFpMZEVxYnpMcGNSRDVDbUtqcyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743680248),
('BVOhnGdSL9bLtJEoSi0ACuxdLJFLebnHnZ7yhrjV', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY2dqNzdjaXdUSlBEcHpiZGpvSVI2OEpNRE5QN2xFczFpWUU0V05ZTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743676620),
('c1vTt2zr3NyAsgRzOBWW7mmWh9DHwY1Q134At7js', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSzVLUUhNUzEzRWJDZThZNmRidlhsWDJtV254R2xmT3ZvUkY2Q3V0SSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743676652),
('eqeMyTwuk781f6zUrfvLHWPYyCFfTW7WbB1rWSFk', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVVlOZDIzYVdaRDFsSXZ0Rk9PREtJYlJyZ2Rsb2ZhTVh3eGdheW5ZbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743680973),
('IuYclgRzH52GlKY0LupwjWfzdKgAKzTBMaKvQKBv', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2RoZ3BxQWlYZ3ZaT3pLZGx4YTM5dUFJTWhSNnJTQTMwU0lJSXp1eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743679351),
('mWS1JlfCoBqk9IYgnDFRC37aRIVLNQazwC5PQp49', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWlIUVl1eGtudkExQ2ZCWW5iQk01UUwzYXMyWFJmMlA1MDFPVHJiSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743131700),
('ncKaDO7v76rHv3Phxv9UXz9TZpa8MyWIz2nioGVv', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTnlvOVM3aFZ3U2tpaVl3akNrRDZqNHlxakxHVjZrbWpkR0dDY3pxZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743068349),
('OBwt2jqthm5MrV94sh0A0iLqRd6EuVO2M7FlbuaB', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWTFMQ3JnWnlxTXdnOFgxYmROMXVienlkY3phdWhiMTNONWcySGRSbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743679766),
('qKFIuUJAO1hKTsqbXBqTHe7wVX6hh067k55SD7VZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVF5YXhPb2xVMTFYblJRWnJmUXZqOE90WmRjaXJzVW5GNmJPRmcyRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743669304),
('qLPI0jVc0AJqfT65MYztbqSTeE83TCC47BEOOYCU', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWE9haEo3Q1FSWTRMcVRUV0RGc1FqNFJwblFEMm5KSmhOU1d6ckl2eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvYWRtaW4vZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743606012),
('TtPfiClf5l61j61K7SbbkAnEuw5c7ALhYlEjaNrG', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiekQ4dFJpUnRBck1kZ0VBWXJnN214RUxJV0ZzQWVtWDNEamg4WVNLVCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743680811),
('uIu4zPmwxANsFEAVU4a4Sfr6NzEHlP9r7qi1hCQ9', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOUxTS29QRUhHclNBeWJib2ZvU2ZNcTU2Wk1hUjd2eElMeEdJY3hlQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvYWRtaW4vZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743606012),
('yCPEFDLF6QTvgFHCfTuDT9wCQI80zSRGmhciI8Na', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoid2did0pqMFJ1Z2k5ZUlja2JpUFI2dFBuMjlrbXAyWmNpcVdydDdLSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743679324),
('yMm3TosbfUPwSCgpw3ikMvHQuG81p5htuCsbegdL', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSVp0cldyandWMTR4akExSjUwMjNkbTVPMEdxSXhQN2UxMmYyTTRIQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743047058),
('yW6Kfv8vnBLqdSAeTpLQR2M6mqefXgRk7zSIiC7t', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUE5FSlBwYVhoR2hXZ1BVRTZuZzVIS0xycHFIaHUza0JaREJXbndUVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743605923),
('z2XsTZJbhzipwhRDYVhPEnKrS9pxdbkUDmgcpCPv', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibWFTVGNpTk5Fb2dUbUhGTzkxU2ViYlF4U1U1dE9aZTNhSXdSYWl2OSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1743676987);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `gratitude_goals` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `grateful_for` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `favorite_quote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `how_gratitude_feels` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `profile_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interests` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `gratitude_goals`, `grateful_for`, `favorite_quote`, `how_gratitude_feels`, `profile_image`, `bio`, `location`, `interests`) VALUES
(3, 'Bhone Shwe Shan', 'bhonethant@puri.com', NULL, '$2y$12$QzqLu5my2C56CcpSBfpX3eKWKqWvq7XbzFHj3I5ckFrySOzeX9MqC', 'admin', NULL, '2025-04-04 02:56:56', '2025-04-19 01:09:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'PURI', 'nobesike2003@gmail.com', NULL, '$2y$12$jEFqgudtxEIiCBODZigVF.u7SwHR6NYOyUH8N3u7OxiwQbNOanCd6', 'user', NULL, '2025-04-20 02:38:45', '2025-05-12 09:01:54', 'I want to be more mindful.', 'My family', 'Family come first', 'Calm', 'profile_images/XyeRigmdtRMHuVrGcOCjupfc3J3ScYYmF04DaPA8.png', 'I don\'t know what to say.', 'Pyapon, Myanmar', 'Reading'),
(5, 'Kyaw Myo Tun', 'kyawgyi2000@gmail.com', NULL, '$2y$12$TtSNuPKpvlawlGucEKlKMOs.Bspk42f6X1JMJfNlYu1qoCQvoJLnS', 'user', NULL, '2025-04-20 06:53:35', '2025-05-04 03:00:26', 'I want to be more mindful', 'My family', 'Family come first.', 'Calm', NULL, NULL, NULL, NULL),
(6, 'Tester', 'tester@gmail.com', NULL, '$2y$12$iIoWPRbwOMytxL1prcMWtePGUYRHxnhFk0NTeG.fnohtr8Y9n8U7i', 'admin', NULL, '2025-05-06 02:08:10', '2025-05-06 02:08:10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Tester', 'test@gmail.com', NULL, '$2y$12$3hQlqK75I3mPMk/JuLo0Q.vAobH3QpalA2gBl021O81YlSKJXWyKC', 'user', NULL, '2025-05-15 00:12:59', '2025-05-15 00:12:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gratitude_prompts`
--
ALTER TABLE `gratitude_prompts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `journal_entries_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mood_logs`
--
ALTER TABLE `mood_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mood_logs_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gratitude_prompts`
--
ALTER TABLE `gratitude_prompts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal_entries`
--
ALTER TABLE `journal_entries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `mood_logs`
--
ALTER TABLE `mood_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD CONSTRAINT `journal_entries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mood_logs`
--
ALTER TABLE `mood_logs`
  ADD CONSTRAINT `mood_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
