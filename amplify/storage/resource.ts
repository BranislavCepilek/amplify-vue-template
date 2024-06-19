import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'amplifyUniledStorage',
    access: (allow) => ({
        'uniled-katalog/*': [
            allow.guest.to(['get']),
            allow.authenticated.to(['get', 'write', 'delete']),
            allow.entity('identity').to(['get', 'write', 'delete'])
        ]
    })
});