import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602608141340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
        {
          name: 'website',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'phone1',
          type: 'varchar',
        },
        {
          name: 'phone2',
          type: 'varchar',
        },
        {
          name: 'street',
          type: 'varchar',
        },
        {
          name: 'number',
          type: 'varchar',
        },
        {
          name: 'district',
          type: 'varchar',
        },
        {
          name: 'city',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'character',
          precision: 2,
        },
        {
          name: 'zip_code',
          type: 'varchar',
        },
        {
          name: 'bank',
          type: 'varchar',
        },
        {
          name: 'agency',
          type: 'varchar',
        },
        {
          name: 'account',
          type: 'varchar',
        },
        {
          name: 'entity_register',
          type: 'varchar',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
