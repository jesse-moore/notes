# npm
## References
* https://docs.npmjs.com/

## Installation / Management
*Is installed with nodejs*
Description | Command
-- | --
Check npm version | `npm -v`
Install lastest version of npm | `npm install npm@latest -g`

## Create package.json
Description | Command
-- | --
Initiates questionnaire to create package.json file | `npm init`
Creates package.json file with default values | `npm init -y`

## Configure package.json
https://docs.npmjs.com/files/package.json


## Manange Packages
Description | Command
-- | --
Install package locally | `npm install <package_name>` 
Install package globally | `npm install -g <package_name>`
Uninstall a local package | `npm uninstall <package_name>`
Uninstall a local package and remove dependency from package.json | `npm uninstall --save <package_name>`
Uninstall a global package |`npm uninstall -g <package>`
Update production packages | `npm update`
Update global packages | `npm update -g`
Update dev packages | `npm update --dev`
Update specific package | `npm update <package_name>`
Lists local packages with updates | `npm outdated`
Lists global packages with updates | `npm outdated -g --depth=0`
Solve support issues with packages if uninstall/reinstall doesn't work | `npm rebuild <package_name>`
List global installed packages without their dependencies | `npm list --depth 0 -g`
List all global installed packages | `npm list -g`
Return the latest available version on the package | `npm view <package_name> version`