/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */
import {MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../app/users/shared';

export class Users1552251704543 implements MigrationInterface {
  private values: User[] = [
    {
      createdAt: '2019-02-10',
      emailAddress: 'me@mogusbi.co.uk',
      forename: 'Mo',
      id: 'f07a1ccb-f3bf-4ac8-beab-c740668674c4',
      surname: 'Gusbi',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Eric.Allen@mailinator.com',
      forename: 'Eric',
      id: '98dc24a5-4f9a-4013-8124-3843ad1278d2',
      surname: 'Allen',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Erin.Wade@mailinator.com',
      forename: 'Erin',
      id: '2b56ba98-b120-4d7a-a56f-0225c07218f4',
      surname: 'Wade',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Dale.Love@mailinator.com',
      forename: 'Dale',
      id: '33ccca6b-1a2d-412e-811a-0937648a18d2',
      surname: 'Love',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Oliver.Massey@mailinator.com',
      forename: 'Oliver',
      id: '923ac85f-5bf1-4902-8946-eaebe76261cb',
      surname: 'Massey',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Jeremy.Rice@mailinator.com',
      forename: 'Jeremy',
      id: '034682ae-81e6-4c13-b376-503d5b11fd33',
      surname: 'Rice',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Jeremiah.Hubbard@mailinator.com',
      forename: 'Jeremiah',
      id: '6250affa-690b-498d-94ff-8067600a85d4',
      surname: 'Hubbard',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Jessie.Harrington@mailinator.com',
      forename: 'Jessie',
      id: 'fba98a9c-65c4-40d4-b9ad-0187886dabbd',
      surname: 'Harrington',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Andrea.Horton@mailinator.com',
      forename: 'Andrea',
      id: '1ea35773-2d0e-42ab-bd2a-c59fa47cca7e',
      surname: 'Horton',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Miranda.Thompson@mailinator.com',
      forename: 'Miranda',
      id: '4a517c57-731e-4fd4-b67a-407c7bcfd2bf',
      surname: 'Thompson',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Inez.Campbell@mailinator.com',
      forename: 'Inez',
      id: 'a5eaa098-d89f-4dde-8cc7-1c410086d922',
      surname: 'Campbell',
      updatedAt: '2019-02-10'
    },
    {
      createdAt: '2019-02-10',
      emailAddress: 'Emanuel.Wong@mailinator.com',
      forename: 'Emanuel',
      id: '8793290b-95aa-45a1-b022-e997d3144422',
      surname: 'Wong',
      updatedAt: '2019-02-10'
    }
  ];

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .whereInIds(this.values.map(({id}: User): string => id))
      .execute();
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(this.values)
      .execute();
  }
}
