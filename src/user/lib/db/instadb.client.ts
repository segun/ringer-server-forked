import { id, IInstantDatabase, init, InstaQLEntity, InstaQLParams, tx } from "@instantdb/admin";
import schema from "instant.schema";
import * as dotenv from 'dotenv';

dotenv.config();

export type SchemaType = typeof schema;

export type DB = IInstantDatabase<SchemaType>;

export const instaServer = init({
    appId: process.env.INSTANT_APP_ID,
    adminToken: process.env.INSTANT_DB_APP_SECRET,
})

export type User = InstaQLEntity<SchemaType, 'user'>;

export async function getUserById(id: string): Promise<User | null> {
    const userQueryResponse = await instaServer.query({
        user: {
            $: {
                where: {
                    id
                }
            }
        }
    } as InstaQLParams<SchemaType>);

    if (userQueryResponse && userQueryResponse.user && userQueryResponse.user.length > 0) {
        return userQueryResponse.user[0];
    }
    return null;
}

export async function getUserByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const userQueryResponse = await instaServer.query({
        user: {
            $: {
                where: {
                    emailOrPhone
                }
            }
        }
    } as InstaQLParams<SchemaType>);

    if (userQueryResponse && userQueryResponse.user && userQueryResponse.user.length > 0) {
        return userQueryResponse.user[0];
    }
    return null;
}

export async function userExists(emailOrPhone: string): Promise<boolean> {
    const user = await getUserByEmailOrPhone(emailOrPhone);
    return !!user;
}

// insert into user
export async function createUser(user: User) {
    user.id = id();
    
    await instaServer.transact([
        tx.user[user.id].update(user)
    ]);

    return getUserById(user.id);
}