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


export async function downloadKatalog(){
    console.log('calling ... from downloadKatalog');
    const result = await downloadData({
      path: "UNILED_katalog_2024.pdf",
    }).result;
}


export const result = await downloadData({
    path: "UNILED_katalog_2024.pdf",
}).result;