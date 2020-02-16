import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1581833360024 implements MigrationInterface {
    name = 'Initialize1581833360024'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `age` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `tags` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `user_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `posts_tags` (`post_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_a6b232c89aa1c442b7a6ef0211` (`post_id`), INDEX `IDX_0a4f5ee04a91077ddb93526a60` (`tag_id`), PRIMARY KEY (`post_id`, `tag_id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_c4f9a7bd77b489e711277ee5986` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `posts_tags` ADD CONSTRAINT `FK_a6b232c89aa1c442b7a6ef02110` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `posts_tags` ADD CONSTRAINT `FK_0a4f5ee04a91077ddb93526a605` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `posts_tags` DROP FOREIGN KEY `FK_0a4f5ee04a91077ddb93526a605`", undefined);
        await queryRunner.query("ALTER TABLE `posts_tags` DROP FOREIGN KEY `FK_a6b232c89aa1c442b7a6ef02110`", undefined);
        await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_c4f9a7bd77b489e711277ee5986`", undefined);
        await queryRunner.query("DROP INDEX `IDX_0a4f5ee04a91077ddb93526a60` ON `posts_tags`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a6b232c89aa1c442b7a6ef0211` ON `posts_tags`", undefined);
        await queryRunner.query("DROP TABLE `posts_tags`", undefined);
        await queryRunner.query("DROP TABLE `posts`", undefined);
        await queryRunner.query("DROP TABLE `tags`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
