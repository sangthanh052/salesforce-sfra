# Samsonite Brand Style Cartridge (app_custom_samsonite)

This is a repository for the Samosnite mono brand sites.

This cartridge developed based on Storefront Reference Architecture (SFRA) and working with SFRA version 3.3.0


# Getting Started

1 Clone this repository.

2 Run `npm install` to install all of the local dependencies (node version 8.x or current LTS release recommended)

3 Run `npm run compile:scss` from the command line that would compile all client-side CSS files.

4 Create `dw.json` file in the root of the project:
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "yourlogin",
    "password": "yourpwd",
    "code-version": "version_to_upload_to"
}
```

5 Run `npm run uploadCartridge` command that would upload `app_custom_samsonite` cartridge to the sandbox you specified in dw.json file.

6 Add the `app_custom_samsonite` cartridge to your cartridge path.

7 You should now be ready to navigate to and use your site.


# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:scss` - Compiles all .scss files into CSS.

## Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project. You should run this command before committing your code.

## Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid dw.json file at the root that is configured for the sandbox to upload.

## Uploading

`npm run uploadCartridge` - Will upload cartridge to the server. Requires a valid dw.json file at the root that is configured for the sandbox to upload.

`npm run upload <filepath>` - Will upload a given file to the server. Requires a valid dw.json file.
