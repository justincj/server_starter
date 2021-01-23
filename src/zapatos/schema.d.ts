/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos (v3.3.0), and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module "zapatos/schema" {
  import type * as db from "zapatos/db";

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary {
    version: 101;
  }

  type JSONSelectableFromSelectable<T> = {
    [K in keyof T]: Date extends T[K]
      ? Exclude<T[K], Date> | db.DateString
      : Date[] extends T[K]
      ? Exclude<T[K], Date[]> | db.DateString[]
      : T[K];
  };

  /* === schema: public === */

  /* --- enums --- */

  /* --- tables --- */

  export namespace post {
    export type Table = "post";
    export interface Selectable {
      id: number;
      created_at: Date;
      updated_at: Date;
      title: string;
    }
    export interface Whereable {
      id?:
        | number
        | db.Parameter<number>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            number | db.Parameter<number> | db.SQLFragment | db.ParentColumn
          >;
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.SQLFragment
            | db.ParentColumn
          >;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.SQLFragment
            | db.ParentColumn
          >;
      title?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            string | db.Parameter<string> | db.SQLFragment | db.ParentColumn
          >;
    }
    export interface Insertable {
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment;
      title: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.DefaultType
            | db.SQLFragment
          >;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.DefaultType
            | db.SQLFragment
          >;
      title?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export interface JSONSelectable
      extends JSONSelectableFromSelectable<Selectable> {}
    export type UniqueIndex = "post_pkey";
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<
      Selectable,
      T[number]
    >;
    export type SQLExpression =
      | db.GenericSQLExpression
      | db.ColumnNames<Updatable | (keyof Updatable)[]>
      | db.ColumnValues<Updatable>
      | Table
      | Whereable
      | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  export namespace schema_migrations {
    export type Table = "schema_migrations";
    export interface Selectable {
      version: string;
    }
    export interface Whereable {
      version?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            string | db.Parameter<string> | db.SQLFragment | db.ParentColumn
          >;
    }
    export interface Insertable {
      version: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      version?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export interface JSONSelectable
      extends JSONSelectableFromSelectable<Selectable> {}
    export type UniqueIndex = "schema_migrations_pkey";
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<
      Selectable,
      T[number]
    >;
    export type SQLExpression =
      | db.GenericSQLExpression
      | db.ColumnNames<Updatable | (keyof Updatable)[]>
      | db.ColumnValues<Updatable>
      | Table
      | Whereable
      | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  export namespace user {
    export type Table = "user";
    export interface Selectable {
      id: number;
      created_at: Date;
      updated_at: Date;
      username: string;
      email: string;
      password: string;
    }
    export interface Whereable {
      id?:
        | number
        | db.Parameter<number>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            number | db.Parameter<number> | db.SQLFragment | db.ParentColumn
          >;
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.SQLFragment
            | db.ParentColumn
          >;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.SQLFragment
            | db.ParentColumn
          >;
      username?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            string | db.Parameter<string> | db.SQLFragment | db.ParentColumn
          >;
      email?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            string | db.Parameter<string> | db.SQLFragment | db.ParentColumn
          >;
      password?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.ParentColumn
        | db.SQLFragment<
            any,
            string | db.Parameter<string> | db.SQLFragment | db.ParentColumn
          >;
    }
    export interface Insertable {
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment;
      username: string | db.Parameter<string> | db.SQLFragment;
      email: string | db.Parameter<string> | db.SQLFragment;
      password: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      created_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.DefaultType
            | db.SQLFragment
          >;
      updated_at?:
        | Date
        | db.Parameter<Date>
        | db.DateString
        | db.DefaultType
        | db.SQLFragment
        | db.SQLFragment<
            any,
            | Date
            | db.Parameter<Date>
            | db.DateString
            | db.DefaultType
            | db.SQLFragment
          >;
      username?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      email?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      password?:
        | string
        | db.Parameter<string>
        | db.SQLFragment
        | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export interface JSONSelectable
      extends JSONSelectableFromSelectable<Selectable> {}
    export type UniqueIndex =
      | "user_pkey"
      | "user_username_key"
      | "user_email_key"
      | "user_password_key";
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<
      Selectable,
      T[number]
    >;
    export type SQLExpression =
      | db.GenericSQLExpression
      | db.ColumnNames<Updatable | (keyof Updatable)[]>
      | db.ColumnValues<Updatable>
      | Table
      | Whereable
      | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* === cross-table types === */

  export type Table = post.Table | schema_migrations.Table | user.Table;
  export type Selectable =
    | post.Selectable
    | schema_migrations.Selectable
    | user.Selectable;
  export type Whereable =
    | post.Whereable
    | schema_migrations.Whereable
    | user.Whereable;
  export type Insertable =
    | post.Insertable
    | schema_migrations.Insertable
    | user.Insertable;
  export type Updatable =
    | post.Updatable
    | schema_migrations.Updatable
    | user.Updatable;
  export type UniqueIndex =
    | post.UniqueIndex
    | schema_migrations.UniqueIndex
    | user.UniqueIndex;
  export type Column = post.Column | schema_migrations.Column | user.Column;
  export type AllTables = [post.Table, schema_migrations.Table, user.Table];
  export type AllMaterializedViews = [];

  export type SelectableForTable<T extends Table> = {
    post: post.Selectable;
    schema_migrations: schema_migrations.Selectable;
    user: user.Selectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    post: post.Whereable;
    schema_migrations: schema_migrations.Whereable;
    user: user.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    post: post.Insertable;
    schema_migrations: schema_migrations.Insertable;
    user: user.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    post: post.Updatable;
    schema_migrations: schema_migrations.Updatable;
    user: user.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    post: post.UniqueIndex;
    schema_migrations: schema_migrations.UniqueIndex;
    user: user.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    post: post.Column;
    schema_migrations: schema_migrations.Column;
    user: user.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    post: post.SQL;
    schema_migrations: schema_migrations.SQL;
    user: user.SQL;
  }[T];
}