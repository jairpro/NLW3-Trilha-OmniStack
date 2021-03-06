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
          type: 'varchar',
        },
        {
          name: 'longitude',
          type: 'varchar',
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
          isNullable: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'phone1',
          type: 'varchar',
        },
        {
          name: 'phone2',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'street',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'number',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'district',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'city',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'state',
          type: 'char',
          length: '2',
          isNullable: true,
        },
        {
          name: 'zip_code',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'bank',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'agency',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'account',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'entity_register',
          type: 'varchar',
          isNullable: true,
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
