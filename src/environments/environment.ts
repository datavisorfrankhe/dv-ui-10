// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    socketServerEndPoint: 'http://localhost:3000/v3/socket',
    apiServerEndPoint: 'http://localhost:3000/v3',
    loginUrl: '/auth/login',
    mapBoxToken: 'pk.eyJ1IjoiZnJhbmtoZSIsImEiOiJjamhtOXRsMTAzYXRsM2RuM215OW80cXlsIn0.O0_Vlk4TJXn8GjpMJFNZ_w',
    defaultUserSummaryDays: 7,
    enableGoogleAnalytics: false,
    publickey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2i4R1b0W4XwE6m4sLywtgge2i4eU0YmREN0iUxy96FgqQd692ID67k/gQW98Sp10sN6Pv4eoGFCyUG/mxHAEiOLFVgAOAFuUVCEWb+zXTCoYDMKG5h69bPLV2MXn2xLL9DiSmwq8KXXf8PTuHQ9ae+y4FY6nutuw/VhMRASclOwIDAQAB',
    serverLogger: false,
    fileUploadUrl: 'http://localhost:3000/v3/http/server/uploadFiles',
    currentSystemVersion: 'CURRENT_SYSTEM_VERSION',
};
