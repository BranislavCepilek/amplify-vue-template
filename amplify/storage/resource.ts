import { defineStorage } from "@aws-amplify/backend";
import { downloadData } from "aws-amplify/storage";

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


export const downloadResult = await downloadData({
    path: "uniled-katalog/UNILED_katalog_2024.pdf",
  }).result;

console.log('downloadResult is: ', downloadResult )