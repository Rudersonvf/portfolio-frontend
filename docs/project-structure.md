# Project Structure

Most of the code lives in the `src` folder and looks like this:

```
src
|
+-- assets            # assets folder can contain all the static data such as images, fonts, etc.
|
+-- components        # shared components used across the entire application.
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app.
|
+-- context           # all of the global contexts.
|
+-- hooks             # shared hooks used across the entire application.
|
+-- locales           # contains localization files for managing multi-language support.
|
+-- pages             # all the pages used on the project.
|
+-- sass              # contains stylesheets and styles related to the application's design.
|
+-- services          # contains reusable services for API calls and business logic.
|
+-- utils             # shared utility functions.
```
