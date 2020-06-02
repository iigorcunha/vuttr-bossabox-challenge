import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateToolTags1591122925064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tool_tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tool_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tag_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('tool_tags', [
      new TableForeignKey({
        name: 'ToolIdFK',
        columnNames: ['tool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tools',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),

      new TableForeignKey({
        name: 'TagIdFK',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tool_tags', 'ToolIdFK');

    await queryRunner.dropForeignKey('tool_tags', 'TagIdFK');

    await queryRunner.dropTable('tool_tags');
  }
}
