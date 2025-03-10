# Storefront Reference Architecture (SFRA)

This is a repository for the Storefront Reference Architecture reference application.

Storefront Reference Architecture has a base cartridge (`app_storefront_base`) provided by Commerce Cloud that is never directly customized or edited. Instead, customization cartridges are layered on top of the base cartridge. This change is intended to allow for easier adoption of new features and bug fixes.
Storefront Reference Architecture supplies an [plugin_applepay](https://github.com/SalesforceCommerceCloud/plugin-applepay) plugin cartridge to demonstrate how to layer customizations for the reference application.

Your feedback on the ease-of-use and limitations of this new architecture is invaluable during the developer preview. Particularly, feedback on any issues you encounter or workarounds you develop for efficiently customizing the base cartridge without editing it directly.


# The latest version

The latest version of SFRA is 3.3.0

# Getting Started

1 Clone this repository.

2 Run `npm install` to install all of the local dependencies (node version 8.x or current LTS release recommended)

3 Run `npm run compile:js` from the command line that would compile all client-side JS files. Run `npm run compile:scss` and `npm run compile:fonts` that would do the same for css and fonts.

4 Create `dw.json` file in the root of the project:
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "yourlogin",
    "password": "yourpwd",
    "code-version": "version_to_upload_to"
}
```

5 Run `npm run uploadCartridge` command that would upload `app_storefront_base` and `modules` cartridges to the sandbox you specified in dw.json file.

6 Use https://github.com/SalesforceCommerceCloud/storefrontdata to zip and import site date on your sandbox.

7 Add the `app_storefront_base` cartridge to your cartridge path in _Administration >  Sites >  Manage Sites > RefArch - Settings_ (Note: This should already be populated by the sample data in Step 6).

8 You should now be ready to navigate to and use your site.


# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:scss` - Compiles all .scss files into CSS.
* `npm run compile:js` - Compiles all .js files and aggregates them.
* `npm run compile:fonts` - Copies all needed font files. Usually, this only has to be run once.

## Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project. You should run this command before committing your code.

## Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid dw.json file at the root that is configured for the sandbox to upload.

## Uploading

`npm run uploadCartridge` - Will upload both `app_storefront_base` and `modules` to the server. Requires a valid dw.json file at the root that is configured for the sandbox to upload.

`npm run upload <filepath>` - Will upload a given file to the server. Requires a valid dw.json file.

#Testing
## Running unit tests

You can run `npm test` to execute all unit tests in the project. Run `npm run cover` to get coverage information. Coverage will be available in `coverage` folder under root directory.

* UNIT test code coverage:
1. Open a terminal and navigate to the root directory of the mfsg repository.
2. Enter the command: `npm run cover`.
3. Examine the report that is generated. For example: `Writing coverage reports at [/Users/yourusername/SCC/sfra/coverage]`
3. Navigate to this directory on your local machine, open up the index.html file. This file contains a detailed report.

## Running integration tests
Integration tests are located in the `sfra/test/integration` directory.

To run all integration tests you can use the following command:

```
npm run test:integration
```

**Note:** Please note that short form of this command will try to locate URL of your sandbox by reading `dw.json` file in the root directory of your project. If you don't have `dw.json` file, integration tests will fail.
sample dw.json file (this file needs to be in the root of your project)
{
    "hostname": "dev03-automation02-qa.demandware.net"
}

```
npm run test:integration test/integration/storeLocator
```

You can also supply URL of the sandbox on the command line:

```
npm run test:integration -- --baseUrl https://hostname/on/demandware.store/Sites-RefArch-Site/en_US
```

To run individual tests, such as the `test1.js` in the `storeLocator` subsuite:

```
npm run test:integration -- --baseUrl https://hostname/on/demandware.store/Sites-RefArch-Site/en_US test/integration/storeLocator/test1.js
```

To run tests in a subsuite, such as the storeLocator subsuite:

```
npm run test:integration -- --baseUrl https://hostname/on/demandware.store/Sites-RefArch-Site/en_US test/integration/storeLocator
```



# [Contributing to SFRA](./CONTRIBUTING.md)

